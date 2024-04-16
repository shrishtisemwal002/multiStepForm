var personalDetailForm = document.getElementById("personalDetailForm");
var experienceDetailForm = document.getElementById("experienceDetailForm");
var educationDetailForm = document.getElementById("educationDetailForm");

var personalDetailHeading = document.getElementById("personalDetailHeading");
var experienceDetailHeading = document.getElementById("experienceDetailHeading");
var educationDetailHeading = document.getElementById("educationDetailHeading");

var firstNextBtn = document.getElementById("firstNextBtn");

var backBtn = document.getElementById("experienceBackBtn");
var nextBtn = document.getElementById("experienceNextBtn");

var educationBackBtn = document.getElementById("educationBackBtn");
var educationNextBtn = document.getElementById("educationNextBtn");

function disableBtn(nextBtn,errors){
    return nextBtn.disabled=Array.from(errors).some((error)=>error.innerText)
}

var step = document.querySelectorAll(".formStep");
step.forEach((formStep)=>{
    const nextBtn=formStep.querySelector(".button");
    const inputs=formStep.querySelectorAll("input");
    const errors=formStep.querySelectorAll('p');

    inputs.forEach((input)=>{
        input.addEventListener('keyup',(e)=>{
            disableBtn(nextBtn,errors)
        })
    })
})

function isEmpty(input,error) {
    if(input.value == ""){
        error.innerText = "This field is required";
    }
    else{
        error.innerText="";
    }
}

let formData={}

firstNextBtn.onclick = function(event) {
    const formFields=Array.from(personalDetailForm.querySelectorAll('input'));
    const parent=document.getElementById("personalDetailForm");
    const errors=parent.querySelectorAll('p');

   formFields.forEach((field)=>{
        isEmpty(field,field.nextElementSibling)
        if(field.hasAttribute('name')) {
            formData[field.name] = field.value;
        }
    })
    if(disableBtn(event.target,errors)){
        return;
    }

    localStorage.setItem("stepFormData",JSON.stringify(formData))
    navigateForward(personalDetailForm, experienceDetailForm, personalDetailHeading, experienceDetailHeading);
    event.preventDefault();
}

backBtn.onclick = function(event) {
    event.preventDefault();
    navigateBackward(experienceDetailForm, personalDetailForm, experienceDetailHeading, personalDetailHeading); 
}

nextBtn.onclick = function(event) {
    const formFields=Array.from(experienceDetailForm.querySelectorAll('input'));

    const parent=document.getElementById("experienceDetailForm");
    const errors=parent.querySelectorAll('p');

   formFields.forEach((field)=>{
        isEmpty(field,field.nextElementSibling)
        if(field.hasAttribute('name')) {
            formData[field.name] = field.value;
        } 
    });
    if(disableBtn(event.target,errors)){
        console.log("error");
        return;
    } 

    localStorage.setItem("stepFormData",JSON.stringify(formData))
   
    navigateForward(experienceDetailForm, educationDetailForm, experienceDetailHeading, educationDetailHeading);
    event.preventDefault();
    
}

educationBackBtn.onclick = function(event) {
    navigateBackward(educationDetailForm, experienceDetailForm, educationDetailHeading, experienceDetailHeading);
    
    event.preventDefault();
}

educationNextBtn.onclick = function(event) {
    const formFields=Array.from(educationDetailForm.querySelectorAll('input'));

    const parent=document.getElementById("educationDetailForm");
    const errors=parent.querySelectorAll('p');

   formFields.forEach((field)=>{
        isEmpty(field,field.nextElementSibling)

        if(field.hasAttribute('name')) {
            formData[field.name] = field.value;
        }
    })
    if(disableBtn(event.target,errors)){
        return;
    }  

    localStorage.setItem("stepFormData",JSON.stringify(formData));

    personalDetailForm.submit();
    experienceDetailForm.submit();
    educationDetailForm.submit();

    personalDetailForm.reset();
    experienceDetailForm.reset();
    educationDetailForm.reset();

    window.location.href="resume.html";

    event.preventDefault();
}

// Function to move to the next form
function navigateForward(currentForm, nextForm, currentHeading, nextHeading) {

    currentForm.style.left = "-700px";
    nextForm.style.left = "197px";

    currentHeading.style.background = "blue";
    currentHeading.style.color = "white";

    nextHeading.style.background = "white";
    nextHeading.style.color = "blue";

}

function navigateBackward(currentForm, prevForm, currentHeading, prevHeading) {
    currentForm.style.left = "1100px";
    prevForm.style.left = "197px";

    currentHeading.style.background = "blue";
    currentHeading.style.color = "white";

    prevHeading.style.background = "white";
    prevHeading.style.color = "blue";
}

// validations 

function validatePersonalForm(event) {

    var firstName = event.target.value+event.key;
    var lastName = event.target.value+event.key;
    var jobTitle = event.target.value+event.key;
    var email = event.target.value+event.key;
    var phoneNumber = event.target.value + event.key;
    var address = event.target.value + event.key;

    var isValid = false;
    if ((event.target.id === "firstName" && !isString(firstName))) {

        event.preventDefault();
        document.getElementById("firstName").style.border = "1px solid red";
        document.getElementById("firstName").style.outline = "1px solid red";
        document.getElementById("invalidFirstName").innerHTML = "Invalid First Name";
        isValid = false;
    } else {

        document.getElementById("firstName").style.border = "1px solid black";
        document.getElementById("firstName").style.outline = "none";
        document.getElementById("invalidFirstName").innerHTML = "";
        isValid = true;
    }

    if (event.target.id === "lastName" && !isString(lastName)) {
        event.preventDefault();

        document.getElementById("lastName").style.border = "1px solid red";
        document.getElementById("lastName").style.outline = "1px solid red";
        document.getElementById("invalidLastName").innerHTML = "Invalid Last Name";
        isValid = false;
    } else {
        document.getElementById("lastName").style.border = "1px solid black";
        document.getElementById("lastName").style.outline = "";
        document.getElementById("invalidLastName").innerHTML = "";
        isValid = true;
    }

    if (event.target.id === "jobTitle" && !isString(jobTitle)) {
        event.preventDefault();

        document.getElementById("jobTitle").style.border = "1px solid red";
        document.getElementById("jobTitle").style.outline = "1px solid red";
        document.getElementById("invalidJobTitle").innerHTML = "Job title cannot contains digits";
        isValid = false;
    } else {
        document.getElementById("jobTitle").style.border = "1px solid black";
        document.getElementById("jobTitle").style.outline = "";
        document.getElementById("invalidJobTitle").innerHTML = "";
        isValid = true;
    }

    if(event.target.id === "phoneNumber" && (phoneNumber.length > 10 || isNaN(phoneNumber)) && event.key !='Backspace'){
        event.preventDefault();

        document.getElementById("phoneNumber").style.border = "1px solid red";
        document.getElementById("phoneNumber").style.outline = "1px solid red";
        
        document.getElementById("invalidPhoneNumber").innerText = "Phone number cannot contain letters";
        isValid = false;
    }
    else {
        document.getElementById("phoneNumber").style.border = "1px solid black";
        document.getElementById("phoneNumber").style.outline = "";
        
        document.getElementById("invalidPhoneNumber").innerText = "";  
    }

    if (event.target.id === "email" && !validEmail(email)) {

        document.getElementById("email").style.border = "1px solid red";
        document.getElementById("email").style.outline = "1px solid red";
        document.getElementById("invalidEmail").innerText = "Invalid Email";
        isValid = false;
    } else {
        document.getElementById("email").style.border = "1px solid black";
        document.getElementById("email").style.outline = "";
        document.getElementById("invalidEmail").innerText = "";
        isValid = true;
    }
    console.log(address)
    if(event.target.id === "address" && address.trim() == "") {
        console.log(address);
        document.getElementById("address").style.border = "1px solid red";
        document.getElementById("address").style.outline = "1px solid red";

        document.getElementById("invalidAddress").innerText = "This field is required";
        isValid = false;
    }
    else {
        document.getElementById("address").style.border = "1px solid black";
        document.getElementById("address").style.outline = "";
        document.getElementById("invalidAddress").innerText = "";
        isValid = true;
    }
    return isValid;
}

function validateExperienceForm(event) {
    var companyName = event.target.value+event.key;
    var title = event.target.value+event.key;
    var city = event.target.value+event.key;
    var country = event.target.value+event.key;

    var isValid = false;
    console.log(companyName);
    if (event.target.id=="companyName" && !isValidName(companyName)) {
        // console.log(companyName);

        document.getElementById("companyName").style.border = "1px solid red";
        document.getElementById("companyName").style.outline = "1px solid red";
        document.getElementById("invalidCompanyName").innerHTML = "Error";
        isValid = false;
    } else {
        document.getElementById("companyName").style.border = "1px solid black";
        document.getElementById("companyName").style.outline = "";
        document.getElementById("invalidCompanyName").innerHTML = "";

    }

    if (event.target.id === "title" && !isString(title)) {
        event.preventDefault();

        document.getElementById("title").style.border = "1px solid red";
        document.getElementById("title").style.outline = "1px solid red";
        document.getElementById("invalidTitle").innerHTML = "Job title cannot contains digits";
        isValid = false;
    } else {
        document.getElementById("title").style.border = "1px solid black";
        document.getElementById("title").style.outline = "";
        document.getElementById("invalidTitle").innerHTML = "";
        isValid = true;
    }

    if (event.target.id === "city" && !isString(city)) {
        event.preventDefault();

        document.getElementById("city").style.border = "1px solid red";
        document.getElementById("city").style.outline = "1px solid red";
        document.getElementById("invalidCity").innerHTML = "City name cannot contains digits";
        isValid = false;
    } else {
        document.getElementById("city").style.border = "1px solid black";
        document.getElementById("city").style.outline = "";
        document.getElementById("invalidCity").innerHTML = "";
    }

    if (event.target.id === "country" && !isString(country)) {
        event.preventDefault();

        document.getElementById("country").style.border = "1px solid red";
        document.getElementById("country").style.outline = "1px solid red";
        document.getElementById("invalidCountry").innerHTML = "Country name cannot contains digits";
        isValid = false;
    } else {
        document.getElementById("country").style.border = "1px solid black";
        document.getElementById("country").style.outline = "";
        document.getElementById("invalidCountry").innerHTML = "";
    }
    return isValid;
}

function validateEducationForm(event) {
    const highestDegree = event.target.value+event.key;
    const universityName = event.target.value+event.key;
    const intermediateSchoolName = event.target.value+event.key;
    const intermediateSchoolCity = event.target.value+event.key;
    const matriculateSchoolName = event.target.value+event.key;
    const matriculateSchoolCity = event.target.value+event.key;

    let isValid =true;

    if(event.target.id == "highestDegree" && !isValidName(highestDegree)){
        event.preventDefault();

        document.getElementById("highestDegree").style.border = "1px solid red";
        document.getElementById("highestDegree").style.outline = "1px solid red";
        document.getElementById("invalidDegreeName").innerText = "Name cannot contain digits";
        isValid = false;
    } else {
        document.getElementById("highestDegree").style.border = "1px solid black";
        document.getElementById("highestDegree").style.outline = "";
        document.getElementById("invalidDegreeName").innerText = "";
    }

    if(event.target.id == "universityName" && !isValidName(universityName)){
        event.preventDefault();

        document.getElementById("universityName").style.border = "1px solid red";
        document.getElementById("universityName").style.outline = "1px solid red";
        document.getElementById("invalidUniversityName").innerText = "Name cannot contain digits";
        isValid = false;
    } else {
        document.getElementById("universityName").style.border = "1px solid black";
        document.getElementById("universityName").style.outline = "";
        document.getElementById("invalidUniversityName").innerText = "";
    }

    if(event.target.id == "intermediateSchoolName" && !isValidName(intermediateSchoolName)){
        event.preventDefault();

        document.getElementById("intermediateSchoolName").style.border = "1px solid red";
        document.getElementById("intermediateSchoolName").style.outline = "1px solid red";
        document.getElementById("invalidIntermediateSchoolName").innerText = "Name cannot contain digits";
        isValid = false;
    } else {
        document.getElementById("intermediateSchoolName").style.border = "1px solid black";
        document.getElementById("intermediateSchoolName").style.outline = "";
        document.getElementById("invalidIntermediateSchoolName").innerText = "";
    }

    if(event.target.id == "intermediateSchoolCity" && !isString(intermediateSchoolCity)){
        event.preventDefault();

        document.getElementById("intermediateSchoolCity").style.border = "1px solid red";
        document.getElementById("intermediateSchoolCity").style.outline = "1px solid red";
        document.getElementById("invalidIntermediateSchoolCity").innerText = "City cannot contain digits";
        isValid = false;
    } else {
        document.getElementById("intermediateSchoolCity").style.border = "1px solid black";
        document.getElementById("intermediateSchoolCity").style.outline = "";
        document.getElementById("invalidIntermediateSchoolCity").innerText = "";
    }


    if(event.target.id == "matriculateSchoolName" && !isValidName(matriculateSchoolName)){
        event.preventDefault();

        document.getElementById("matriculateSchoolName").style.border = "1px solid red";
        document.getElementById("matriculateSchoolName").style.outline = "1px solid red";
        document.getElementById("invalidMatriculateSchoolName").innerText = "Name cannot contain digits";
        isValid = false;
    } else {
        document.getElementById("matriculateSchoolName").style.border = "1px solid black";
        document.getElementById("matriculateSchoolName").style.outline = "";
        document.getElementById("invalidMatriculateSchoolName").innerText = "";
    }

    if(event.target.id == "matriculateSchoolCity" && !isString(matriculateSchoolCity)){
        event.preventDefault();

        document.getElementById("matriculateSchoolCity").style.border = "1px solid red";
        document.getElementById("matriculateSchoolCity").style.outline = "1px solid red";
        document.getElementById("invalidMatriculateSchoolCity").innerText = "City cannot contain digits";
        isValid = false;
    } else {
        document.getElementById("matriculateSchoolCity").style.border = "1px solid black";
        document.getElementById("matriculateSchoolCity").style.outline = "";
        document.getElementById("invalidMatriculateSchoolCity").innerText = "";
    }

    return isValid;
}


function isString(str) {
    var flag = true;
    str = str.toLowerCase()
    for (var i = 0; i < str.length; i++) {
        if( !(str[i]>='a' && str[i]<='z') && str[i]!='Backspace'){
            flag = false;
            break;
        }
    }
    return flag;
}


function validPhoneNumber(value) {
    var flag = true;
    for (var i = 0; i < value.length; i++) {
        if( !(value[i]>=0 && value[i]<=9) && value[i]!='Backspace'){
            flag = false;
            break;
        }   
    }
    return flag;
}


function validEmail(email) {
    let atIndex = email.indexOf("@");
    if(email.length == 0) {
        return false;
    }
    if(atIndex == -1 || atIndex == 0 || atIndex == email.length-1) {
        return false;
    }
    if(email.includes("@",atIndex+1)) {
        return false;
    }

    if(email.indexOf(".") == -1 || email.indexOf(".") == email.length-1) {
        return false;
    }

    if(email.includes("..")){
        return false;
    }

    if((email.indexOf(".") +1) == atIndex) {
        return false;
    }

    return true;
}

function isValidName(str) {
    var regex = /^[a-zA-Z\s.]+$/;
    return regex.test(str);
}