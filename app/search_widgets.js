const searchClient = algoliasearch('YX07IGBU62', 'eed09c7bf52a4b9392a8c613ca54c25d');

const search = instantsearch({
  indexName: 'comics_db',
  searchClient,
  searchFunction: function(helper) {
    var searchResults = document.getElementById('search_results');
    if (helper.state.query === '') {
      searchResults.style.display = 'none';
      return;
    }
    helper.search();
    searchResults.style.display = 'block';
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbar',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#search_results',
    templates: {
    	item(hit) {
        console.log('hit');
    		return createIssueCard(hit);
    		// return hit.cover_date;
    	}
    }
  })
);

search.start();
