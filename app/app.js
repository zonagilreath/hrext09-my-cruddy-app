document.addEventListener("DOMContentLoaded", function() {
	document.querySelector('#add_new_issue').addEventListener('click', getNewIssueForm);
	getRecentIssues();
});

function creatorClickHandler(event){
	event.preventDefault();
	document.getElementById('issues_container').innerHTML = '';
	resultList = genericQueryByCreator(event.target.textContent);
	resultList.forEach(addIssueToPage);
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
