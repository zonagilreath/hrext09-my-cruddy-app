const searchClient = algoliasearch('YX07IGBU62', 'eed09c7bf52a4b9392a8c613ca54c25d');

const search = instantsearch({
  indexName: 'comics_db',
  searchClient,
  searchFunction: function(helper) {
    var searchResults = document.getElementById('search_results');
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
  })
);

// Create the render function
const renderHits = (renderOptions, isFirstRender) => {
  const { hits, widgetParams } = renderOptions;

  widgetParams.container.innerHTML = `
      ${hits
        .map(createIssueCard)
        .join('')}
  `;
};

// Create the custom widget
const customHits = instantsearch.connectors.connectHits(renderHits);

search.addWidget(
  customHits({
    container: document.querySelector('#search_results'),
  })
);

// search.addWidget(
//   instantsearch.widgets.hits({
//     container: '#search_results',
//     templates: {
//     	item(hit) {
//     		return createIssueCard(hit);
//     	}
//       // allItems: function(hits){
//       //   let searchHits = document.createElement('div');
//       //   searchHits.setAttribute("id", "search_hits");
//       //   hits.forEach((issue)=>{
//       //     addIssueToContainer(issue, '#search_hits');
//       //   });
//       //   console.log(JSON.stringify(searchHits));
//       //   return searchHits;
//       // }
//     //   allItems: `
//     //           <div>
//     //             {{#hits}}
//     //               <p>{{ series_title }}</p>
//     //             {{/hits}}
//     //           </div>`
//     // }
//     }
//   })
// );

search.start();
