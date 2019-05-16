document.addEventListener("DOMContentLoaded", function() {
	getSearchForm('basic');
});


function formHandler(event, searchFunction){
	event.preventDefault();
	let formData = new FormData(event.target);
	searchFunction(formData);
}

function getSearchForm(basicOrAdvanced, titleSearchString){
	// console.log('getSearch called with: ', basicOrAdvanced, titleSearchString);
	let specifics = {
		basic: [basicSearchForm, basicSearch],
		advanced: [advancedSearchForm, advancedSearch],
	}

	document.querySelector('#form_container').innerHTML = specifics[basicOrAdvanced][0];

	let form = document.querySelector('form');
	if (titleSearchString) {
		form.elements['book_title'].value = titleSearchString;
	}

	form.addEventListener('submit', function(event){
		formHandler(event, specifics[basicOrAdvanced][1]);
	});

	let otherForm = (basicOrAdvanced === 'basic')? 'advanced' : 'basic';
	let changeFormButton = document.querySelector('#change_form');
	changeFormButton.setAttribute('jsOtherForm', otherForm);
	changeFormButton.addEventListener('click', function(event){
		let titleSearchString = document.querySelector('form').elements['book_title'].value;
		let basicOrAdvenced = event.target.getAttribute('jsOtherForm');
		getSearchForm(basicOrAdvenced, titleSearchString);
	})
}

// function getBasicSearchForm(titleSearchString){
// 	let formContainer = document.querySelector('.form_container');
// 	formContainer.innerHTML = basicSearchForm;
// 	let form = document.querySelector('form');
// 	if (titleSearchString) {
// 		form.elements['book_title'].value = titleSearchString;
// 	}
// 	form.addEventListener('submit', function(event){
// 		formHandler(event, basicSearch);
// 	});
// }

// function getAdvancedSearchForm(titleSearchString){
// 	let formContainer = document.querySelector('.form_container');
// 	formContainer.innerHTML = advancedSearchForm;
// 	let form = document.querySelector('form');
// 	if (titleSearchString) {
// 		form.elements['book_title'].value = titleSearchString;
// 	}
// 	form.addEventListener('submit', function(event){
// 		formHandler(event, advancedSearch);
// 	});
// }

function basicSearch(formData){
	let titleSearch = formData.get('book_title');
  let books = JSON.parse(window.localStorage.getItem('books'));
  for (let key in books) {
  	if (key.includes(titleSearch.toLowerCase())){
  		console.log(key);
  		console.log(books[key]);
  	}
  }
}

function advancedSearch(formData){

}
// function getFormData(){
// 	let formData = new FormData(document.querySelector('form'));
//   let dataObj = {};
// 	formData.forEach((value, key) => {dataObj[key] = value});
//   console.log(dataObj);
// }