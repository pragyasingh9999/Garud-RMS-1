const firebaseConfig = {
    apiKey: "AIzaSyBLFX-qU3Ms06YRMGKchlJcPWUO9lxQ51I",
    authDomain: "garud-rms.firebaseapp.com",
    databaseURL: "https://garud-rms-default-rtdb.firebaseio.com/",
    projectId: "garud-rms",
    storageBucket: "garud-rms.appspot.com",
    messagingSenderId: "783602670179",
    appId: "1:783602670179:web:7fd6fe113603bed95df656",
    measurementId: "G-LP8QLW62NL"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

window.onkeypress = function(event){
    var SUBCODE = document.getElementById('subcode').value || 0
    var SUBNAME = document.getElementById('subname').value || 0
    var SUBTYPE = document.getElementById('subtype').value || 0
    var SUBINTERNAL = parseInt(document.getElementById('subinternal').value || 0);
    var SUBEXTERNAL = parseInt(document.getElementById('subexternal').value || 0);
}

function numbersOnly(input){
    var regex = /[^0-9]/g;
    input.value = input.value.replace(regex,"");
}

var SaveButton = document.getElementById("saveButton")
SaveButton.addEventListener("click",function(){
    var StudentName = document.getElementById("inputName").value
    document.getElementById("loading").style.display = "block";
    var SUBCODE = document.getElementById('subcode').value || 0
    var SUBNAME = document.getElementById('subname').value || 0
    var SUBTYPE = document.getElementById('subtype').value || 0
    var SUBINTERNAL = parseInt(document.getElementById('subinternal').value || 0);
    var SUBEXTERNAL = parseInt(document.getElementById('subexternal').value || 0);
    var SUBBACK = document.getElementById('subback').value|| 0
    var SUBGRADE = document.getElementById('subgrade').value|| 0
    var SUBCODE1 = document.getElementById('subcode1').value || 0
    var SUBNAME1 = document.getElementById('subname1').value || 0
    var SUBTYPE1 = document.getElementById('subtype1').value || 0
    var SUBINTERNAL1 = parseInt(document.getElementById('subinternal1').value || 0);
    var SUBEXTERNAL1 = parseInt(document.getElementById('subexternal1').value || 0);
    var SUBBACK1 = document.getElementById('subback1').value|| 0
    var SUBGRADE1 = document.getElementById('subgrade1').value|| 0
    var SUBCODE2 = document.getElementById('subcode2').value || 0
    var SUBNAME2 = document.getElementById('subname2').value || 0
    var SUBTYPE2 = document.getElementById('subtype2').value || 0
    var SUBINTERNAL2 = parseInt(document.getElementById('subinternal2').value || 0);
    var SUBEXTERNAL2 = parseInt(document.getElementById('subexternal2').value || 0);
    var SUBBACK2 = document.getElementById('subback2').value|| 0
    var SUBGRADE2 = document.getElementById('subgrade2').value|| 0
    var user = firebase.auth().currentUser.uid
    if(!StudentName.trim()){
        Swal.fire("Student Name is Required");
        document.getElementById("loading").style.display = "none";
    }
    else{


    const database = firebase.database();
    database.ref('user/'+user+'/'+StudentName).set({
        SUBCODE,
        SUBNAME,
        SUBTYPE,
        SUBINTERNAL,
        SUBEXTERNAL,
        SUBBACK,
        SUBGRADE,
        SUBCODE1,
        SUBNAME1,
        SUBTYPE1,
        SUBINTERNAL1,
        SUBEXTERNAL1,
        SUBBACK1,
        SUBGRADE1,
        SUBCODE2,
        SUBNAME2,
        SUBTYPE2,
        SUBINTERNAL2,
        SUBEXTERNAL2,
        SUBBACK2,
        SUBGRADE2,
    }).then(function(){
        document.getElementById("loading").style.display = "none";
        Swal.fire("saved sucessfully")
        console.log("save sucessfully");
    })
}
})

// for retrieving saved data from firebase

var EditButton = document.getElementById("editButton")
EditButton.addEventListener("click",function(){
    var StudentName = document.getElementById("inputName").value
    document.getElementById("loading").style.display = "block";
    const database = firebase.database();
    var user = firebase.auth().currentUser.uid

    const key = 'user/'+user+'/'+StudentName
    database.ref(key).once('value',(snapshot) => {
        const data = snapshot.val()
        if(!data){
            Swal.fire({
                type:'error',
                title:'Error:',
                text:`Whoops!!! Student name cannot be found `
            })
            document.getElementById("loading").style.display = "none";
        }
        console.log(data)
        document.getElementById('subcode').innerHTML = data.SUBCODE
        document.getElementById('subname').innerHTML = data.SUBNAME
        document.getElementById('subtype').innerHTML = data.SUBTYPE
        document.getElementById('subinternal').innerHTML = data.SUBINTERNAL
        document.getElementById('subexternal').innerHTML = data.SUBEXTERNAL
        document.getElementById('subcode1').innerHTML = data.SUBCODE1
        document.getElementById('subname1').innerHTML = data.SUBNAME1
        document.getElementById('subtype1').innerHTML = data.SUBTYPE1
        document.getElementById('subinternal1').innerHTML = data.SUBINTERNAL1
        document.getElementById('subexternal1').innerHTML = data.SUBEXTERNAL1
        document.getElementById('subcode2').innerHTML = data.SUBCODE2
        document.getElementById('subname2').innerHTML = data.SUBNAME2
        document.getElementById('subtype2').innerHTML = data.SUBTYPE2
        document.getElementById('subinternal2').innerHTML = data.SUBINTERNAL2
        document.getElementById('subexternal2').innerHTML = data.SUBEXTERNAL2
    }).then(function(){
      document.getElementById("loading").style.display = "none";
        Swal.fire("data sucessfully retrieved")
        console.log("data sucessfully retrieved")
        
    })
})


//delete functionality

const DeleteButton = document.getElementById("deleteButton")
DeleteButton.addEventListener("click",function(){
    
     const Name = document.getElementById("deleteNameBox").value; 
     var user = firebase.auth().currentUser.uid
    const database = firebase.database();
    const deleted = database.ref("user/"+user+"/"+Name)
    if(!Name.trim()){
        Swal.fire(
            "Student name is required"
          )
    }else{
   

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleted.remove()
            console.log("Student data deleted");
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
})


// ALL students delete function 
const DeleteAll = document.getElementById("deleteAll")
DeleteAll.addEventListener("click",function(){
     var user = firebase.auth().currentUser.uid
    const database = firebase.database();
    const deleted = database.ref("user/"+user)
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleted.remove()
    console.log("All Student data deleted");
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
})
