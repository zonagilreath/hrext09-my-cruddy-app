const initialData = {
	books : {
		'doom patrol' : {
			issues : [
				{
					issue: 19,
					series_title : 'Doom Patrol',
					writers : ['Grant Morrison'],
					pencillers : ['Richard Case'],
					inkers : ['Carlos Garzon'],
					colorists : ['Michele Wolfman'],
					letterers : ['John E Workman Jr'],
					editors : ['Robert Greenberger'],
					cover_artists : ['Richard Case', 'Carlos Garzon'],
					cover_date : '1989-02',
					year: 1989,
					cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/16/11340_20051122042316_large.jpg'
				},
				{
					issue: 20,
					series_title : 'Doom Patrol',
					writers : ['Grant Morrison'],
					pencillers : ['Richard Case'],
					inkers : ['Scott Hanna'],
					colorists : ['Michele Wolfman'],
					letterers : ['John E Workman Jr'],
					editors : ['Robert Greenberger'],
					cover_artists : ['Richard Case', 'Carlos Garzon'],
					cover_date : '1989-03',
					year: 1989,
					cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/35/21601_20051229114528_large.jpg'
				},
			]
		},

		'green lantern' : {
			issues : [
				{
					issue: 1,
					series_title : 'Green Lantern',
					writers : ['Geoff Johns'],
					pencillers : ['Carlos Pacheco', 'Ethan Van Sciver'],
					inkers : ['Jesus Merino', 'Ethan Van Sciver'],
					colorists : ['W Moose Baumann'],
					letterers : ['Rob Leigh'],
					editors : ['Dan DiDio', 'Harvey Richards', 'Peter J Tomasi'],
					cover_artists : ['Jesus Merino', 'Carlos Pacheco', 'Peter Steigerwald'],
					cover_date : '2005-07',
					year: 2005,
					cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/154/30_20061231074132_large.jpg'
				},
				{
					issue: 2,
					series_title : 'Green Lantern',
					writers : ['Geoff Johns'],
					pencillers : ['Carlos Pacheco'],
					inkers : ['Jesus Merino'],
					colorists : ['W Moose Baumann'],
					letterers : ['Rob Leigh'],
					editors : ['Dan DiDio', 'Harvey Richards', 'Peter J Tomasi'],
					cover_artists : ['Jesus Merino', 'Carlos Pacheco', 'Peter Steigerwald'],
					cover_date : '2005-08',
					year: 2005,
					cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/240/31_20080215115131_large.jpg'
				},
			]
		}
	},
	recents : [
		{
			issue: 19,
			series_title : 'Doom Patrol',
			writers : ['Grant Morrison'],
			pencillers : ['Richard Case'],
			inkers : ['Carlos Garzon'],
			colorists : ['Michele Wolfman'],
			letterers : ['John E Workman Jr'],
			editors : ['Robert Greenberger'],
			cover_artists : ['Richard Case', 'Carlos Garzon'],
			cover_date : '1989-02',
			year: 1989,
			cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/16/11340_20051122042316_large.jpg'
		},
		{
			issue: 20,
			series_title : 'Doom Patrol',
			writers : ['Grant Morrison'],
			pencillers : ['Richard Case'],
			inkers : ['Scott Hanna'],
			colorists : ['Michele Wolfman'],
			letterers : ['John E Workman Jr'],
			editors : ['Robert Greenberger'],
			cover_artists : ['Richard Case', 'Carlos Garzon'],
			cover_date : '1989-03',
			year: 1989,
			cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/35/21601_20051229114528_large.jpg'
		},
		{
			issue: 1,
			series_title : 'Green Lantern',
			writers : ['Geoff Johns'],
			pencillers : ['Carlos Pacheco', 'Ethan Van Sciver'],
			inkers : ['Jesus Merino', 'Ethan Van Sciver'],
			colorists : ['W Moose Baumann'],
			letterers : ['Rob Leigh'],
			editors : ['Dan DiDio', 'Harvey Richards', 'Peter J Tomasi'],
			cover_artists : ['Jesus Merino', 'Carlos Pacheco', 'Peter Steigerwald'],
			cover_date : '2005-07',
			year: 2005,
			cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/154/30_20061231074132_large.jpg'
		},
		{
			issue: 2,
			series_title : 'Green Lantern',
			writers : ['Geoff Johns'],
			pencillers : ['Carlos Pacheco'],
			inkers : ['Jesus Merino'],
			colorists : ['W Moose Baumann'],
			letterers : ['Rob Leigh'],
			editors : ['Dan DiDio', 'Harvey Richards', 'Peter J Tomasi'],
			cover_artists : ['Jesus Merino', 'Carlos Pacheco', 'Peter Steigerwald'],
			cover_date : '2005-08',
			year: 2005,
			cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/240/31_20080215115131_large.jpg'
		},
	]
}

if (window.localStorage.getItem('books') === null){
  let initDataString = JSON.stringify(initialData.books);
  window.localStorage.setItem('books', initDataString);
}

if (window.localStorage.getItem('recent_additions') === null){
  let initDataString = JSON.stringify(initialData.recents);
  window.localStorage.setItem('recent_additions', initDataString);
}