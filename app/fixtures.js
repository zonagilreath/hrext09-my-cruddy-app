const basicSearchForm = `
<form id="basic_search">
  <input type="text" name="book_title" placeholder="Search by series"></form>
  <button id="change_form" type="button">Advanced Search</button>
  <button type="submit">Search</button>
</form>
`;

const advancedSearchForm = `
<form id="advanced_search">
  <input type="text" name="book_title" placeholder="Series title">
  <input type="number" step="1" name="issue_number" placeholder="Issue #">
  <input type="text" name="artist" placeholder="Artist">
  <input type="text" name="writer" placeholder="Writer">
  <input type="number" step="1" min="1933" max="2030" name="issue_number" placeholder="Issue #">
  <button id="change_form" type="button">Basic Search</button>
  <button type="submit">Search</button>
</form>
 `;