const initialData = {
	books : {
		'Doom Patrol' : {
			issues : {
				19 : {
					writers : ['Grant Morrison'],
					pencillers : ['Richard Case'],
					inkers : ['Carlos Garzon'],
					colorists : ['Michele Wolfman'],
					letterers : ['John E. Workman, Jr.'],
					editors : ['Robert Greenberger'],
					cover_artists : ['Richard Case', 'Carlos Garzon'],
					cover_date : ['February 1989'],
					cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/16/11340_20051122042316_large.jpg'
				},
				20 : {
					writers : ['Grant Morrison'],
					pencillers : ['Richard Case'],
					inkers : ['Scott Hanna'],
					colorists : ['Michele Wolfman'],
					letterers : ['John E. Workman, Jr.'],
					editors : ['Robert Greenberger'],
					cover_artists : ['Richard Case', 'Carlos Garzon'],
					cover_date : ['March 1989'],
					cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/35/21601_20051229114528_large.jpg'
				},
			}
		},

		'Green Lantern' : {
			issues : {
				1 : {
					writers : ['Geoff Johns'],
					pencillers : ['Carlos Pacheco', 'Ethan Van Sciver'],
					inkers : ['Jesús Merino', 'Ethan Van Sciver'],
					colorists : ['W. Moose Baumann'],
					letterers : ['Rob Leigh'],
					editors : ['Dan DiDio', 'Harvey Richards', 'Peter J. Tomasi'],
					cover_artists : ['Jesús Merino', 'Carlos Pacheco', 'Peter Steigerwald'],
					cover_date : ['July 2005'],
					cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/154/30_20061231074132_large.jpg'
				},
				2 : {
					writers : ['Geoff Johns'],
					pencillers : ['Carlos Pacheco'],
					inkers : ['Jesús Merino'],
					colorists : ['W. Moose Baumann'],
					letterers : ['Rob Leigh'],
					editors : ['Dan DiDio', 'Harvey Richards', 'Peter J. Tomasi'],
					cover_artists : ['Jesús Merino', 'Carlos Pacheco', 'Peter Steigerwald'],
					cover_date : ['July 2005'],
					cover_url : 'http://comicbookdb.com/graphics/comic_graphics/1/240/31_20080215115131_large.jpg'
				},
			}
		},
	}
}

if (window.localStorage.getItem('books') === null){
  let initDataString = JSON.stringify(initialData.books);
  window.localStorage.setItem('books', initDataString);
}