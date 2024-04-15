var personalDetailForm = document.getElementById("personalDetailForm");
var experienceDetailForm = document.getElementById("experienceDetailForm");
var educationDetailForm = document.getElementById("educationDetailForm");
var skillDetailForm = document.getElementById("skillDetailForm");

var personalDetailHeading = document.getElementById("personalDetailHeading");
var experienceDetailHeading = document.getElementById("experienceDetailHeading");
var educationDetailHeading = document.getElementById("educationDetailHeading");
var skillDetailHeading = document.getElementById("skillDetailHeading");

var firstNextBtn = document.getElementById("firstNextBtn");

var backBtn = document.getElementById("experienceBackBtn");
var nextBtn = document.getElementById("experienceNextBtn");

var educationBackBtn = document.getElementById("educationBackBtn");
var educationNextBtn = document.getElementById("educationNextBtn");

var skillBackBtn = document.getElementById("skillBackBtn");
var skillSaveBtn = document.getElementById("skillSaveBtn");

let formData={}

firstNextBtn.onclick = function(event) {
    const formFields=Array.from(personalDetailForm.querySelectorAll('input'));

    formFields.forEach((field)=>{
        formData[field.name]=field.value;    
    })


    localStorage.setItem("stepFormData",JSON.stringify(formData))
    event.preventDefault();
    navigateForward(personalDetailForm, experienceDetailForm, personalDetailHeading, experienceDetailHeading);
    
}

backBtn.onclick = function(event) {
    event.preventDefault();
    navigateBackward(experienceDetailForm, personalDetailForm, experienceDetailHeading, personalDetailHeading);
    
}

nextBtn.onclick = function(event) {
    const formFields=Array.from(experienceDetailForm.querySelectorAll('input'));

    formFields.forEach((field)=>{
        formData[field.name]=field.value;
    })

    localStorage.setItem("stepFormData",JSON.stringify(formData))
    event.preventDefault();
    navigateForward(experienceDetailForm, educationDetailForm, experienceDetailHeading, educationDetailHeading);
    
}

educationBackBtn.onclick = function(event) {
    navigateBackward(educationDetailForm, experienceDetailForm, educationDetailHeading, experienceDetailHeading);
    
    event.preventDefault();
}

educationNextBtn.onclick = function(event) {
    const formFields=Array.from(educationDetailForm.querySelectorAll('input'));

    formFields.forEach((field)=>{
        formData[field.name]=field.value;
    })

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

    var isValid = true;
    if ((event.target.id === "firstName" && !isString(firstName))) {
        event.preventDefault();

        document.getElementById("firstName").style.border = "2px solid red";
        document.getElementById("invalidFirstName").innerHTML = "Invalid First Name";
        isValid = false;
    } else {
        document.getElementById("firstName").style.border = "1px solid black";
        document.getElementById("invalidFirstName").innerHTML = "";
    }

    if (event.target.id === "lastName" && !isString(lastName)) {
        event.preventDefault();

        document.getElementById("lastName").style.border = "2px solid red";
        document.getElementById("invalidLastName").innerHTML = "Invalid Last Name";
        isValid = false;
    } else {
        document.getElementById("lastName").style.border = "1px solid black";
        document.getElementById("invalidLastName").innerHTML = "";
    }

    if (event.target.id === "jobTitle" && !isString(jobTitle)) {
        event.preventDefault();

        document.getElementById("jobTitle").style.border = "2px solid red";
        document.getElementById("invalidJobTitle").innerHTML = "Job title cannot contains digits";
        isValid = false;
    } else {
        document.getElementById("jobTitle").style.border = "1px solid black";
        document.getElementById("invalidJobTitle").innerHTML = "";
    }


    if (event.target.id === "email" && !validEmail(email)) {

        document.getElementById("email").style.border = "2px solid red";
        document.getElementById("invalidEmail").innerHTML = "Invalid Email";
        isValid = false;
    } else {
        document.getElementById("email").style.border = "1px solid black";
        document.getElementById("invalidEmail").innerHTML = "";
    }


    if (!isValid) {
        firstNextBtn.disabled = true;
        firstNextBtn.style.cursor = "not-allowed";
        document.getElementsByClassName("button").style.backgroundColor = "grey";

    } else {
        firstNextBtn.disabled = false;
        firstNextBtn.style.cursor = "pointer";
        firstNextBtn.style.backgroundColor = "";
    }

}

function validateExperienceForm(event) {
    var companyName = event.target.value+event.key;
    var title = event.target.value+event.key;
    var city = event.target.value+event.key;
    var country = event.target.value+event.key;

    var isValid = true;

    if (event.target.id === "companyName" && (companyName == "")) {
        event.preventDefault();

        document.getElementById("companyName").style.border = "2px solid red";
        document.getElementById("invalidCompanyName").innerHTML = "This field is required";
        isValid = false;
    } else {
        document.getElementById("companyName").style.border = "1px solid black";
        document.getElementById("invalidCompanyName").innerHTML = "";
    }

    if (event.target.id === "title" && !isString(title)) {
        event.preventDefault();

        document.getElementById("title").style.border = "2px solid red";
        document.getElementById("invalidTitle").innerHTML = "Title cannot contains digits";
        isValid = false;
    } else {
        document.getElementById("title").style.border = "1px solid black";
        document.getElementById("invalidTitle").innerHTML = "";
    }

    if (event.target.id === "city" && !isString(city)) {
        event.preventDefault();

        document.getElementById("city").style.border = "2px solid red";
        document.getElementById("invalidCity").innerHTML = "City name cannot contains digits";
        isValid = false;
    } else {
        document.getElementById("city").style.border = "1px solid black";
        document.getElementById("invalidCity").innerHTML = "";
    }

    if (event.target.id === "country" && !isString(country)) {
        event.preventDefault();

        document.getElementById("country").style.border = "2px solid red";
        document.getElementById("invalidCountry").innerHTML = "Country name cannot contains digits";
        isValid = false;
    } else {
        document.getElementById("country").style.border = "1px solid black";
        document.getElementById("invalidCountry").innerHTML = "";
    }


    if (!isValid) {
        nextBtn.disabled = true;
        nextBtn.style.cursor = "not-allowed";
        nextBtn.style.backgroundColor = "grey";

    } else {
        nextBtn.disabled = false;
        nextBtn.style.cursor = "pointer";
        nextBtn.style.backgroundColor = "";
    }
}

function isString(str) {
    var flag = true;
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) ) {
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