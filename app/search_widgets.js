const searchClient = algoliasearch('YX07IGBU62', 'eed09c7bf52a4b9392a8c613ca54c25d');

const search = instantsearch({
  indexName: 'comics_db',
  searchClient,
  searchFunction: function(helper) {
    var searchResults = document.getElementById('search');
    var rescentIssues = document.getElementById('recently_added');
    if (helper.state.query === '') {
      searchResults.style.display = 'none';
      rescentIssues.style.display = 'block';
      return;
    }
    helper.search();
    searchResults.style.display = 'block';
    rescentIssues.style.display = 'none';
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbar',
    queryHook(query, search) {
      search(query);
    },
  })
);

// Create the render function
const renderHits = (renderOptions, isFirstRender) => {
  const { hits, widgetParams } = renderOptions;
  widgetParams.container.innerHTML = `
    <div class="issue_card">
      ${hits
        .map(createIssueCard)
        .join('</div><div class="issue_card">')}
    </div>
  `;
  makeCreatorsTravsersable();
};

// Create the custom widget
const customHits = instantsearch.connectors.connectHits(renderHits);

search.addWidget(
  customHits({
    container: document.querySelector('#search_results'),
  })
);

search.start();
