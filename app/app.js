document.addEventListener("DOMContentLoaded", function() {
	getSearchForm('basic');
	document.querySelector('#add_new_issue').addEventListener('click', getNewIssueForm);
	getRecentIssues();
});

function getRecentIssues(){
	document.getElementById('issues_container').innerHTML = '';
	let books = JSON.parse(window.localStorage.getItem('recent_additions'));
	books.forEach(addIssueToPage);
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
}

function searchFormHandler(event, searchFunction){
	event.preventDefault();
	document.getElementById('issues_container').innerHTML = '';
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
	document.querySelector('#issues_container').innerHTML = createBookForm;

	let form = document.querySelector('form');
	form.addEventListener('submit', function(event){
		newIssueFormHandler(event);
	});

	document.querySelector('#cancel_add').addEventListener('click', function(){
		getSearchForm('basic');
		document.querySelector('#add_new_issue').addEventListener('click', getNewIssueForm);
		getRecentIssues();
	});
	
	document.querySelector('#add_new_issue').removeEventListener('click', getNewIssueForm);
}

function newIssueFormHandler(event){
	event.preventDefault();
	let formData = {};
	issue = createIssueObject(event);
	cleanCreatorLists(issue);
	addIssueToDB(issue);
	updateRecentList(issue);
	getSearchForm('basic');
	getRecentIssues();
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

function updateRecentList(issue){
	let recentIssues = JSON.parse(window.localStorage.getItem('recent_additions'));
	if (recentIssues.length >= 5){
		recentIssues = [issue, ...recentIssues.slice(0, 4)];
	}else {
		recentIssues.unshift(issue);
	}
	window.localStorage.setItem('recent_additions', JSON.stringify(recentIssues));
}