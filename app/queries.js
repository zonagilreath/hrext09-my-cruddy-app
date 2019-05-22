// function getRecentIssues(){
// 	document.getElementById('issues_container').innerHTML = '';
// 	let books = JSON.parse(window.localStorage.getItem('recent_additions'));
// 	books.forEach(addIssueToPage);
// }

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
			return hasCreator(issue, formData.get('artist'), 'artist');
		});
	}
	if (formData.get('writer')){
		searchResults = _.filter(searchResults, function(issue){
			return hasCreator(issue, formData.get('writer'), 'author');
		});
	}
	return searchResults;
}

function genericQueryByCreator(creator){
	let issues = _.flatten(_.pluck(JSON.parse(window.localStorage.getItem('books')), 'issues'), true);
	return _.filter(issues, function(issue){
		return hasCreator(issue, creator, 'all');
	});
}

function hasCreator(issue, creatorQuery, creatorCategory){
	const creatorTypes = {
		author: ['writers', 'editors'],
		artist: ['pencillers', 'inkers', 'colorists', 'letterers', 'cover_artists'],
		all: ['writers', 'editors', 'pencillers', 'inkers', 'colorists', 'letterers', 'cover_artists']
	}
	let hits = [];
	creatorTypes[creatorCategory].forEach(function(type){
		hits.push(_.some(issue[type], function(creator){
			return creator.toLowerCase().includes(creatorQuery.toLowerCase());
		}));
	});
	return _.some(hits);
}

// function addIssueToDB(issue){
// 	let title = issue['series_title'];
// 	let books = JSON.parse(window.localStorage.getItem('books'));
// 	if (books[title.toLowerCase()]){
// 		books[title.toLowerCase()].issues.push(issue);
// 	}else {
// 		books[title.toLowerCase()] = {
// 			issues : [issue],
// 		}
// 	}
// 	window.localStorage.setItem('books', JSON.stringify(books));
// }

// function updateRecentList(issue){
// 	let recentIssues = JSON.parse(window.localStorage.getItem('recent_additions'));
// 	if (recentIssues.length >= 5){
// 		recentIssues = [issue, ...recentIssues.slice(0, 4)];
// 	}else {
// 		recentIssues.unshift(issue);
// 	}
// 	window.localStorage.setItem('recent_additions', JSON.stringify(recentIssues));
// }