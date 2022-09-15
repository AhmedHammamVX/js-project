function changeVisible(icon)
{
    if(icon.id=="passI")
    passVisible("pass",icon);
    else
    passVisible("repass",icon);
}
 
function passVisible(inputId,icon)
{
    var inputType= document.getElementById(inputId).getAttribute("type");
    if(inputType=="text")
    {
        document.getElementById(inputId).setAttribute("type","password");
        icon.setAttribute("class","fa-solid fa-eye-slash");
    }else
    {
        document.getElementById(inputId).setAttribute("type","text");
        icon.setAttribute("class","fa-solid fa-eye");
    }
}

function checkRepeadPass()
{
    var pass=document.getElementById("pass");
    var repass=document.getElementById("repass");
    if(pass.value !=repass.value)
        repass.setCustomValidity("Password do not match !");
    else
    repass.setCustomValidity("");
}

function signupBtn()
{ 
var fname=document.getElementById("fname").value;
var lname=document.getElementById("lname").value;
var email =document.getElementById("email").value;
var phoneNum=document.getElementById("phoneNum").value;
var pass=document.getElementById("pass").value;
var repass=document.getElementById("repass").value;
var address1=document.getElementById("address1").value;
var address2=document.getElementById("address2").value;
var country=document.getElementById("country").value;
var city=document.getElementById("city").value;
var state=document.getElementById("state").value;
var zip_code=document.getElementById("zip_code").value;
var userInfo={"firstName":fname,"lastName":lname, "email":email, "phoneNumber":phoneNum, "password":pass, "repassword":repass, "address1":address1, "address2":address2, "country":country, "city":city ,"state":state, "zip code":zip_code};
var users= JSON.parse(localStorage.getItem("usersData"));
if(users ==null){
    var users=[];
    users.push(userInfo);
    localStorage.setItem("usersData",JSON.stringify(users));
    localStorage.setItem("currentUser",JSON.stringify(userInfo));
}else{
    for(var i=0; i<users.length; i++){
        if(users[i].email == email){
            alert("email already exist !");
            return false;
        }
    }
        users.push(userInfo);
        localStorage.setItem("usersData",JSON.stringify(users));
        localStorage.setItem("currentUser",JSON.stringify(userInfo));
}
}

function signinBtn()
{
    var Email =document.getElementById("Email").value;
    var Password=document.getElementById("Password").value;
    var users= JSON.parse(localStorage.getItem("usersData"));
    if(users ==null){
        alert("Email does not exit !");
        return false;
    }else{
        for(var i=0; i<users.length; i++){
            if(users[i].email == Email && users[i].password == Password){
                localStorage.setItem("currentUser",JSON.stringify(users[i]));
                return true;
            }if(users[i].email == Email && users[i].password != Password){
                alert("Wrong password !");
                return false;
            }
        }
        alert("Email does not exit !");
        return false;
    }

}

