document.addEventListener("DOMContentLoaded", function() {
	document.querySelector('#add_new_issue').addEventListener('click', getNewIssueForm);
	getRecentIssues();
});

function creatorClickHandler(event){
	event.preventDefault();
	
}

function makeCreatorsTravsersable(issueElement){
	let creatorSpans = issueElement.getElementsByClassName('creator_name');
	for (let i = 0; i < creatorSpans.length; i++){
		creatorSpans.item(i).addEventListener('click', creatorClickHandler);
	}
}

function getNewIssueForm(){
	document.querySelector('#searchbar').style.display = 'none';
	document.querySelector('#recently_added').style.display = 'none';

	let form = document.querySelector('#create_issue');
	form.style.display = 'block';
	console.log('form added!');
	form.addEventListener('submit', newIssueFormHandler);

	let button = 	document.querySelector('#add_new_issue');
	button.textContent = "Back to search";

	button.addEventListener('click', function(){
		// search.start();
		document.querySelector('#create_issue').style.display = 'none';
		document.querySelector('#searchbar').style.display = 'block';
		document.querySelector('#recently_added').style.display = 'block';
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
