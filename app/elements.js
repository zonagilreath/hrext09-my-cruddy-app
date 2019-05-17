function createIssueCard(issue){
	let cover_date = moment(issue.cover_date, 'YYYY-MM').format('MMMM, YYYY');
	let htmlTemplate = `
<div class="issue_card">
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
</div>
`;
} 