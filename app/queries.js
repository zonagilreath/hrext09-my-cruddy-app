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