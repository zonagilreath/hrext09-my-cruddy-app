const searchClient = algoliasearch('YX07IGBU62', 'eed09c7bf52a4b9392a8c613ca54c25d');

const search = instantsearch({
  indexName: 'comics_db',
  searchClient,
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#form_container',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#issues_container',
    templates: {
    	item(hit) {
    		return createIssueCard(hit);
    		// return hit.cover_date;
    	}
    }
  })
);

search.start();
