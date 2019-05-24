const firebaseConfig = {
  apiKey: "AIzaSyC3rDbR9gC8s98eRGc00C2TgzAq_vc88QY",
  authDomain: "comics-db-d08ae.firebaseapp.com",
  databaseURL: "https://comics-db-d08ae.firebaseio.com",
  projectId: "comics-db-d08ae",
  storageBucket: "comics-db-d08ae.appspot.com",
  messagingSenderId: "395394810834",
  appId: "1:395394810834:web:baecdf830b454b42"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const fbase_time = firebase.firestore.Timestamp;
const issuesColl = db.collection('issues');


function createIssueObject(event){
	let issueData = {};
	(new FormData(event.target)).forEach(function(value, key){
		issueData[key] = value;
	})
	issueData['number'] = parseInt(issueData['number']);
	// issueData['cover_date'] = issueData['cover_date'];
	issueData['added'] = fbase_time.now();
	console.log(issueData);
	return issueData;
}

function addIssueToDB(issue){
	console.log(issue);
	issuesColl.add(issue)
	.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function getRecentIssues(){
	issuesColl.get().then((snap)=>{
		document.getElementById('recent_issues').innerHTML = '';
		snap.forEach((doc)=>{
			addIssueToContainer(doc.data(), '#recent_issues');
		});
	});
}

function addIssueToContainer(issue, containerId){
	let issueCardDiv = document.createElement('div');
	issueCardDiv.classList.add('issue_card');
	issueCardDiv.innerHTML = createIssueCard(issue);
	document.querySelector(containerId).appendChild(issueCardDiv);
	makeCreatorsTravsersable(issueCardDiv);
}