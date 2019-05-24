document.addEventListener("DOMContentLoaded", function() {
	document.querySelector('#add_new_issue').addEventListener('click', getNewIssueForm);
	getRecentIssues();
});

function creatorClickHandler(event){
	let hits = search.helper.setQuery(event.target.textContent).search();
}

function makeCreatorsTravsersable(){
	let creatorSpans = document.getElementsByClassName('creator_name');
	for (let i = 0; i < creatorSpans.length; i++){
		creatorSpans.item(i).addEventListener('click', creatorClickHandler);
	}
}

function resetToSearchView(){
	let button = 	document.querySelector('#add_new_issue');
	button.textContent = "Add new issue";
	button.addEventListener('click', getNewIssueForm);
	for (form of document.getElementsByTagName('form')){
		form.reset();
	}
	document.querySelector('#create_issue').style.display = 'none';
	document.querySelector('#searchbar').style.display = 'block';
	document.querySelector('#recently_added').style.display = 'block';
}

function getNewIssueForm(){

	let form = document.querySelector('#create_issue');
	form.style.display = 'block';
	form.addEventListener('submit', newIssueFormHandler);

	let button = 	document.querySelector('#add_new_issue');
	button.textContent = "Back to search";

	button.addEventListener('click', function(){
		resetToSearchView();
		getRecentIssues();
	});

	document.querySelector('#searchbar').style.display = 'none';
	document.querySelector('#search_results').style.display = 'none';
	document.querySelector('#recently_added').style.display = 'none';
	document.querySelector('#add_new_issue').removeEventListener('click', getNewIssueForm);
}

function newIssueFormHandler(event){
	event.preventDefault();
	let formData = {};
	issue = createIssueObject(event);
	cleanCreatorLists(issue);
	addIssueToDB(issue);
	resetToSearchView()
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

function createIssueCard(issue){
  let coverDateMoment = moment(issue.cover_date, 'YYYY-MM');
  // let coverDateMoment = moment(issue.cover_date.toDate(), 'YYYY-MM');
  let coverDate = coverDateMoment.format('MMMM, YYYY');
  let htmlTemplate = `
    <h3>${issue.series_title} #${issue.number} (${coverDateMoment.year()})</h3>
    <div class="issue_card_body">
      <img src="${issue.cover_url}">
      <div class="issue_data">
        <p class="data_label"><strong>Writer(s):</strong>
          ${wrapCreatorStrings(issue.writers).join(', ')}
        </p>
        <p class="data_label"><strong>Penciller(s):</strong>
          ${wrapCreatorStrings(issue.pencillers).join(', ')}
        </p>
        <p class="data_label"><strong>Inker(s):</strong>
          ${wrapCreatorStrings(issue.inkers).join(', ')}
        </p>
        <p class="data_label"><strong>Colorist(s):</strong>
          ${wrapCreatorStrings(issue.colorists).join(', ')}
        </p>
        <p class="data_label"><strong>Letterer(s):</strong>
          ${wrapCreatorStrings(issue.letterers).join(', ')}
        </p>
        <p class="data_label"><strong>Cover Artist(s):</strong>
          ${wrapCreatorStrings(issue.cover_artists).join(', ')}
        </p>
        <p class="data_label"><strong>Editor(s):</strong>
          ${wrapCreatorStrings(issue.editors).join(', ')}
        </p>
        <p class="data_label"><strong>Cover date:</strong>
          <span class="cover_date">${coverDate}</span>
        </p>
      </div>
    </div>
  `;
  return htmlTemplate;
} 

function wrapCreatorStrings(creatorList){
  let wrappedCreators = [];
  creatorList.forEach(function(creator){
    let creatorSpan = `<span class="creator_name">${creator}</span>`;
    wrappedCreators.push(creatorSpan);
  });
  return wrappedCreators;
}
