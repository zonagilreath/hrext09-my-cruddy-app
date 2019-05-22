const basicSearchForm = `
<form id="basic_search">
  <input type="text" name="book_title" placeholder="Search by series">
  <button type="submit" name="submit">Search</button>
  <button id="change_form" type="button">Advanced Search</button>
</form>
`;

const advancedSearchForm = `
<form id="advanced_search">
  <input type="text" name="book_title" placeholder="Series title">
  <input type="number" step="1" name="issue_number" placeholder="Issue #">
  <input type="text" name="artist" placeholder="Artist">
  <input type="text" name="writer" placeholder="Writer">
  <input type="number" step="1" min="1933" max="2030" name="year" placeholder="Year">
  <button type="submit" name="submit">Search</button>
  <button id="change_form" type="button">Basic Search</button>
</form>
 `;

const createBookForm = `
<form id="create_issue">
  <input type="text" name="series_title" placeholder="Series title">
  <input type="number" step="1" name="number" placeholder="Issue #">
  <input type="month" name="cover_date" label="Cover Date" value="1938-06">
  <input type="text" name="writers" placeholder="Writers (separated by commas)">
  <input type="text" name="pencillers" placeholder="Pencillers (separated by commas)">
  <input type="text" name="inkers" placeholder="Inkers (separated by commas)">
  <input type="text" name="colorists" placeholder="Colorists (separated by commas)">
  <input type="text" name="letterers" placeholder="Letterers (separated by commas)">
  <input type="text" name="editors" placeholder="Editors (separated by commas)">
  <input type="text" name="cover_artists" placeholder="Cover Artists (separated by commas)">
  <input type="url" name="cover_url" label="Cover URL" placeholder="http://example.com/cover.jpg">
  <button type="submit" name="submit">Submit</button>
</form>
<button type="button" id="cancel_add">Cancel</button>
`;

function createIssueCard(issue){
  // let coverDateMoment = moment(issue.cover_date, 'YYYY-MM');
  let coverDateMoment = moment(issue.cover_date.toDate(), 'YYYY-MM');
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