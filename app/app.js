document.addEventListener("DOMContentLoaded", function() {
	getSearchForm('basic');
});


function formHandler(event, searchFunction){
	event.preventDefault();
	let formData = new FormData(event.target);
	let resultList = searchFunction(formData);
	console.log(resultList);
}

function getSearchForm(basicOrAdvanced, titleSearchString){
	let specifics = {
		basic: [basicSearchForm, basicSearch],
		advanced: [advancedSearchForm, advancedSearch],
	}

	document.querySelector('#form_container').innerHTML = specifics[basicOrAdvanced][0];

	let form = document.querySelector('form');
	form.addEventListener('submit', function(event){
		formHandler(event, specifics[basicOrAdvanced][1]);
	});

	if (titleSearchString) {
		form.elements['book_title'].value = titleSearchString;
	}

	let otherForm = (basicOrAdvanced === 'basic')? 'advanced' : 'basic';
	let changeFormButton = document.querySelector('#change_form');
	changeFormButton.setAttribute('jsOtherForm', otherForm);
	changeFormButton.addEventListener('click', function(event){
		let titleSearchString = document.querySelector('form').elements['book_title'].value;
		let basicOrAdvenced = event.target.getAttribute('jsOtherForm');
		getSearchForm(basicOrAdvenced, titleSearchString);
	})
}

function basicSearch(formData){
  let books = JSON.parse(window.localStorage.getItem('books'));
  let searchResults = [];
	for (let title in books){
		if (title.includes(formData.get('book_title').toLowerCase())){
			searchResults = searchResults.concat(books[title].issues)
		}
	}
	return searchResults;
}

function advancedSearch(formData){
	let searchResults = [];
	let books = JSON.parse(window.localStorage.getItem('books'));
	if (formData.get('book_title')){
		for (let title in books){
			if (title.includes(formData.get('book_title').toLowerCase())){
				searchResults = searchResults.concat(books[title].issues)
			}
		}
	}else {
		searchResults = _.flatten(_.pluck(books, 'issues'), true);
	}
	if (formData.get('issue_number')){
		searchResults = _.where(searchResults, {issue: parseInt(formData.get('issue_number'))});
	}
	if (formData.get('year')){
		searchResults = _.where(searchResults, {year: parseInt(formData.get('year'))});
	}
	if (formData.get('artist')){
		searchResults = _.filter(searchResults, function(issue){
			return hasArtist(issue, formData.get('artist'));
		});
	}
	if (formData.get('writer')){
		searchResults = _.filter(searchResults, function(issue){
			return  _.some(issue.writers, function(writer){
				return writer.toLowerCase().includes(formData.get('writer'));
			});
		});
	}
	return searchResults;
}

function hasArtist(issue, creatorQuery) {
	let artistTypes = ['pencillers', 'inkers', 'colorists', 'letterers', 'cover_artists'];
	let hits = [];
	artistTypes.forEach(function(type){
		hits.push(_.some(issue[type], function(artist){
			return artist.toLowerCase().includes(creatorQuery.toLowerCase());
		}));
	});
	return _.some(hits);
}


// function getFormData(){
// 	let formData = new FormData(document.querySelector('form'));
//   let dataObj = {};
// 	formData.forEach((value, key) => {dataObj[key] = value});
//   console.log(dataObj);
// }