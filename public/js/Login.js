// const { default: Swal } = require("sweetalert2");

// const { default: Swal } = require("sweetalert2");

const firebaseConfig = {
    apiKey: "AIzaSyBLFX-qU3Ms06YRMGKchlJcPWUO9lxQ51I",
    authDomain: "garud-rms.firebaseapp.com",
    projectId: "garud-rms",
    storageBucket: "garud-rms.appspot.com",
    messagingSenderId: "783602670179",
    appId: "1:783602670179:web:7fd6fe113603bed95df656",
    measurementId: "G-LP8QLW62NL"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



    //signup function

    var SignUp = document.getElementById("Signup")
    var Loader = document.getElementById("loading")
  
    Signup.addEventListener("click", function(event){
      event.preventDefault();
      var email=document.getElementById("email").value
      var password=document.getElementById("password").value
      Loader.style.display="block"
    //   console.log(email)
    //   console.log(password)
    //   console.log("SignUp Button clicked")
       
       //firebase signup
       firebase.auth().createUserWithEmailAndPassword(email, password)
       .then(function(){
        
        document.getElementById("loading").style.display = "none";
         console.log("signup successfully")
        //  prompt("You sucessfully signed up");
        Swal.fire("You sucessfully signed up")
       })
  
       .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
    })
  
    //login function
  
    var LogIn = document.getElementById("Login")
  
    LogIn.addEventListener("click", function(event){
      event.preventDefault()
      var email=document.getElementById("email").value
      var password=document.getElementById("password").value
      Loader.style.display="block"
  
      //firebase login 
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(){
        console.log("LOgin sucessfully")
         window.location.assign("./index1.html")
      })
      .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorMessage){
      document.getElementById("error").innerHTML="invalid password or email"
    }
  
    // ...
  }); 
  
    })

function ForgotPass(){
  const email = document.getElementById("email").value
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert("reset link sent to your email")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorMessage){
      document.getElementById("error").innerHTML="invalid password or email"
    }
  
    // ..
  });
}