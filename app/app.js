document.addEventListener("DOMContentLoaded", function() {
	getSearchForm('basic');
	document.querySelector('#add_new_issue').addEventListener('click', getNewIssueForm);
	getRecentIssues();
});

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

function creatorClickHandler(event){
	event.preventDefault();
	document.getElementById('issues_container').innerHTML = '';
	resultList = genericQueryByCreator(event.target.textContent);
	resultList.forEach(addIssueToPage);
}

function addIssueToPage(issue){
	let issueCardDiv = document.createElement('article');
		issueCardDiv.classList.add('issue_card');
		issueCardDiv.innerHTML = createIssueCard(issue);
		document.querySelector('#issues_container').appendChild(issueCardDiv);
		makeCreatorsTravsersable(issueCardDiv);
}

function makeCreatorsTravsersable(issueElement){
	let creatorSpans = issueElement.getElementsByClassName('creator_name');
	for (let i = 0; i < creatorSpans.length; i++){
		creatorSpans.item(i).addEventListener('click', creatorClickHandler);
	}
}

function getNewIssueForm(){
	document.querySelector('#issues_container').innerHTML = createBookForm;

	let form = document.querySelector('#create_issue');
	console.log('form added!');
	form.addEventListener('submit', newIssueFormHandler);

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
	console.log('about to call create issue object');
	issue = createIssueObject(event);
	cleanCreatorLists(issue);
	console.log('about to call add to db');
	addIssueToDB(issue);
	// updateRecentList(issue);
	getSearchForm('basic');
	getRecentIssues();
}

// function createIssueObject(event){
// 	let issueData = {};
// 	(new FormData(event.target)).forEach(function(value, key){
// 		issueData[key] = value;
// 	})
// 	issueData['issue'] = parseInt(issueData['issue']);
// 	issueData['year'] = parseInt(issueData['cover_date'].split('-')[0]);
// 	return issueData;
// }

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
