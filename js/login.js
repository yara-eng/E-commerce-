let username=document.querySelector("#username");
let password=document.querySelector("#password");
let loginBtn=document.querySelector("#sign_in");

let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener('click',login);
 function login(e){
    e.preventDefault();
    if(username.value ==="" || password.value===""){
        alert("please fill data");
    }else {
        if(
            getUser && 
            username.value.trim()=== getUser&& 
            getPassword && 
            password.value===getPassword
        ){
            setTimeout(()=>{
                window.location="index.html";
            },1500);
        }else{
            console.log("username or password is wrong")
        }
    }
 }
 