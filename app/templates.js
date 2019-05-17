const basicSearchForm = `
<form id="basic_search">
  <input type="text" name="book_title" placeholder="Search by series">
  <button id="change_form" type="button">Advanced Search</button>
  <button type="submit" name="submit">Search</button>
</form>
<button type="button" id="add_new_issue">Add New Issue</button>
`;

const advancedSearchForm = `
<form id="advanced_search">
  <input type="text" name="book_title" placeholder="Series title">
  <input type="number" step="1" name="issue_number" placeholder="Issue #">
  <input type="text" name="artist" placeholder="Artist">
  <input type="text" name="writer" placeholder="Writer">
  <input type="number" step="1" min="1933" max="2030" name="year" placeholder="Year">
  <button id="change_form" type="button">Basic Search</button>
  <button type="submit" name="submit">Search</button>
</form>
<button type="button" id="add_new_issue">Add New Issue</button>
 `;

const createBookForm = `
<form id="create_issue">
  <input type="text" name="series_title" placeholder="Series title">
  <input type="number" step="1" name="issue" placeholder="Issue #">
  <input type="month" name="cover_date" label="Cover Date" value="1938-06">
  <input type="text" name="writers" placeholder="Writers (separated by commas)">
  <input type="text" name="pencillers" placeholder="Pencillers (separated by commas)">
  <input type="text" name="inkers" placeholder="Inkers (separated by commas)">
  <input type="text" name="colorists" placeholder="Colorists (separated by commas)">
  <input type="text" name="letterers" placeholder="Letterers (separated by commas)">
  <input type="text" name="editors" placeholder="Editors (separated by commas)">
  <input type="text" name="cover_artists" placeholder="Editors (separated by commas)">
  <input type="url" name="cover_url" label="Cover URL" placeholder="http://example.com/cover.jpg">
  <button type="submit" name="submit">Submit</button>
</form>
<button type="button" id="back_to_search">Back to search</button>
`;

function createIssueCard(issue){
  let cover_date = moment(issue.cover_date, 'YYYY-MM').format('MMMM, YYYY');
  let htmlTemplate = `
    <h3>${issue.series_title} #${issue.issue} (${issue.year})</h3>
    <img src="${issue.cover_url}">
    <p class="creator_label">Writer(s):</p>
    <p class="creator_names">${issue.writers.join(', ')}</p>
    <p class="creator_label">Penciller(s):</p>
    <p class="creator_names">${issue.pencillers.join(', ')}</p>
    <p class="creator_label">Inker(s):</p>
    <p class="creator_names">${issue.inkers.join(', ')}</p>
    <p class="creator_label">Colorist(s):</p>
    <p class="creator_names">${issue.colorists.join(', ')}</p>
    <p class="creator_label">Letterer(s):</p>
    <p class="creator_names">${issue.letterers.join(', ')}</p>
    <p class="creator_label">Cover Artist(s):</p>
    <p class="creator_names">${issue.cover_artists.join(', ')}</p>
    <p class="creator_label">Editor(s):</p>
    <p class="creator_names">${issue.editors.join(', ')}</p>
    <p class="cover_date_label">Cover date:
      <span class="cover_date">${cover_date}</span>
    </p>
  `;
  return htmlTemplate;
} 