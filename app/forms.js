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
  <input type="text" name="book_title" placeholder="Series title">
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