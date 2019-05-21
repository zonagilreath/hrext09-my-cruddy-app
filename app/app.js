document.addEventListener("DOMContentLoaded", function() {
	getSearchForm('basic');
});

function getRecentIssues(){
	
}

function searchFormHandler(event, searchFunction){
	event.preventDefault();
	let formData = new FormData(event.target);
	let resultList = searchFunction(formData);
	resultList.forEach(addIssueToPage);
}

function addIssueToPage(issue){
	let issueCardDiv = document.createElement("article");
		issueCardDiv.classList.add("issue_card");
		issueCardDiv.innerHTML = createIssueCard(issue);
		document.querySelector('#issues_container').appendChild(issueCardDiv);
}

function getSearchForm(basicOrAdvanced, titleSearchString){
	let specifics = {
		basic: [basicSearchForm, basicSearch],
		advanced: [advancedSearchForm, advancedSearch],
	}

	document.querySelector('#form_container').innerHTML = specifics[basicOrAdvanced][0];

	let form = document.querySelector('form');
	form.addEventListener('submit', function(event){
		searchFormHandler(event, specifics[basicOrAdvanced][1]);
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
	});

	document.querySelector('#add_new_issue').addEventListener('click', function(){
		getNewIssueForm();
	});
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

function getNewIssueForm(){
	document.querySelector('#form_container').innerHTML = createBookForm;

	let form = document.querySelector('form');
	form.addEventListener('submit', function(event){
		newIssueFormHandler(event);
	});

	document.querySelector('#back_to_search').addEventListener('click', function(){
		getSearchForm('basic');
	});
}

function newIssueFormHandler(event){
	event.preventDefault();
	let formData = {};
	issue = createIssueObject(event);
	cleanCreatorLists(issue);
	console.log(issue);
	addIssueToDB(issue);
}

function createIssueObject(event){
	let formData = {};
	(new FormData(event.target)).forEach(function(value, key){
		formData[key] = value;
	})
	formData['issue'] = parseInt(formData['issue']);
	formData['year'] = parseInt(formData['cover_date'].split('-')[0]);
	return formData;
}

function cleanCreatorLists(formData){
	let creators = ['pencillers', 'inkers', 'colorists', 'letterers', 'cover_artists', 'writers', 'editors'];
	creators.forEach(function(creator){
		let creatorList = formData[creator].split(',');
		creatorList = creatorList.map(function(creatorString){
			return creatorString.trim();
		});
		formData[creator] = creatorList;
	});
}

function addIssueToDB(issue){
	let title = issue['series_title'];
	let books = JSON.parse(window.localStorage.getItem('books'));
	if (books[title.toLowerCase()]){
		books[title.toLowerCase()].issues.push(issue);
	}else {
		books[title.toLowerCase()] = {
			issues : [issue],
		}
	}
	window.localStorage.setItem('books', JSON.stringify(books));
}