document.addEventListener("DOMContentLoaded", function() {
	document.querySelector('form').addEventListener('submit', function(event){
		event.preventDefault();
		console.log(event.target);
	  let formData = new FormData(event.target);
	  let titleSearch = formData.get('book_title');
	  let books = JSON.parse(window.localStorage.getItem('books'));
	  for (let key in books) {
	  	if (key.includes(titleSearch.toLowerCase())){
	  		console.log(key);
	  		console.log(books[key]);
	  	}
	  }
	});
});

function getFormData(){
	let formData = new FormData(document.querySelector('form'));
  let dataObj = {};
	formData.forEach((value, key) => {dataObj[key] = value});
  console.log(dataObj);
}