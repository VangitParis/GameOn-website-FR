function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const thanksModalContainer = document.querySelector(".thanks-modal-block");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  
}


editNav()


// close modal container
const btn = document.querySelector(".close")
btn.addEventListener('click', closeModalForm)
// close modal with the 'x' btn
function closeModalForm(){
  modalbg.style.display = 'none'
}
closeModalForm();




 //Stock Inputs Datas by Client
 let isFirstNameValue;
 let isLastNameValue;
 let isEmailValue;
 let isBirthdateValue;
 let isConditionsChecked = false;
 let isChoiceOptionLocation;

 //Listen Input whith property addEventListenner//
 function ListennerInputs(){
  //const from Dom Elements Id
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const choiceOptionLocation = document.getElementById("optionLocation");
  const checkboxTermsAndConditions = document.getElementById("checkbox1");
  console.log(choiceOptionLocation );
  //listen Input FirstName
    firstName.addEventListener("input", (e) => {
      //console.log(first.value);
      isFirstNameValue = first.value
       errorFirst();
    })
    lastName.addEventListener("input", function (e) {
      //console.log(last.value);
      isLastNameValue = last.value;
      errorLast();

    });
    
    email.addEventListener("input", (e) => {
      isEmailValue = email.value;
      errorEmail();

    });
    
    birthdate.addEventListener("input", (e) => {
      isBirthdateValue = birthdate.value;
      errorBirthdate();
    
  });

  
    choiceOptionLocation.addEventListener('input', (e) => {
      isChoiceOptionLocation = e.target.value;
      console.log(e.target.value);
      errorChoiceOptionLocation();

  })

    checkboxTermsAndConditions.addEventListener('input', (e) => {
      isConditionsChecked = e.target.checked;
      errorCheckboxTermsAndConditions();

  })
  }

  ListennerInputs();

  // Dom Errors Elements
  const errorFirstNameDom= document.getElementById('firstNameErrorMsg');
  const errorLastNameDom = document.getElementById('lastNameErrorMsg');
  const errorBirthdateDom = document.getElementById("birthdateErrorMsg");
  const errorEmailDom = document.getElementById("emailErrorMsg");
  const errorChoiceOptionLocationDom = document.getElementById("optionLocationErrorMsg");
  const errorCheckboxTermsAndConditionsDom = document.getElementById("errorCheckboxTermsAndConditionsMsg"); 

// Functions for validate by REGEX or Values
function errorFirst(){
  errorFirstNameDom.innerHTML = (isFirstNameValue ? null : "Veuillez entrez un prénom") ||
  ((isFirstNameValue.length < 2 || isFirstNameValue.length > 30) ? 
  'Veuillez entrer 2 caractères ou plus pour le champ du prénom.' : null) ||
  ((isFirstNameValue.match(/^[a-z A-Z 'éèëç-]{2,30}$/)) ? '' : "") ||
  ((  //IMPORTANT !e
    !isFirstNameValue.match(/^[a-z A-Z 'éèëç-]{0,30}$/) &&
    isFirstNameValue.length > 0 &&
    isFirstNameValue.length < 30) ? 'Le Prénom ne doit pas contenir de chiffres ou de caractères spéciaux' : null);

 }
 function errorLast(){
  errorLastNameDom.innerHTML = (isLastNameValue ? null : "Veuillez entrez un nom") ||
    ((isLastNameValue.length < 2 || isLastNameValue.length > 30) ? 
    'Veuillez entrer 2 caractères ou plus pour le champ du nom.' : "") ||
    ((isLastNameValue.match(/^[a-z A-Z 'éèëç-]{2,30}$/)) ? '' : "") ||
    ((  //IMPORTANT !e
      !isLastNameValue.match(/^[a-z A-Z 'éèëç-]{0,30}$/) &&
      isLastNameValue.length > 0 &&
      isLastNameValue.length < 30) ? 'Le Nom ne doit pas contenir de chiffres ou de caractères spéciaux' : null);
 }
 function errorEmail(){
  errorEmailDom.innerHTML = (isEmailValue ? '' : "Veuillez saisir une adresse email") ||
  (isEmailValue.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ? '' : '') ||
  ((!isEmailValue.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !isEmailValue.length == 0) ? "L'adresse E-mail saisie semble incorrecte. Ex: marie@orange.fr" : null);
console.log("l'adresse email n'est pas correcte");
console.log(isEmailValue);
 }

 function errorBirthdate(){
  errorBirthdateDom.innerHTML = (isBirthdateValue ? null : 'Vous devez entrer votre date de naissance.');
    console.log(errorBirthdateDom.innerHTML);
 }

 function errorChoiceOptionLocation(){
  errorChoiceOptionLocationDom.innerHTML = (isChoiceOptionLocation ? null : 
    "Vous devez choisir une option.");

 }

 function errorCheckboxTermsAndConditions(){
  errorCheckboxTermsAndConditionsDom.innerHTML = isConditionsChecked ? '' :
   "Vous devez vérifier que vous acceptez les termes et conditions."
    console.log(errorCheckboxTermsAndConditionsDom.innerHTML);


 }
 //Alert if the form is not completed
 function alertErrorFromForm(){
      let alertErrorForm = document.createElement('div');
      alertErrorForm.style.color = '#FF4E60';
      alertErrorForm.style.textAlign = 'center';
      alertErrorForm.innerText = `Veuillez remplir tous les champs`;
      form.appendChild(alertErrorForm);
      alertErrorForm.setAttribute('id','alert');
      
    
    //fonction effacer les div suivantes avec display
    function removeAlerts() {
      msgAlert = document.getElementById('alert');
      //console.log(alertErrorForm);
      if (alertErrorForm.style.display == 'block') {
        //console.log(alertErrorForm.style.display);
           alertErrorForm.style.display = 'none';
          // console.log(alertErrorForm.style.display);

      } else alertErrorForm.style.display = 'block';
    }
   removeAlerts();
    //delai pour que le message disparaisse
    setTimeout(( removeAlerts ), 2000 )
 }

  //==============================================================================================//

  // VALIDATION FORMULAIRE

//=== block thanksModal ===//
function thanksLaunchModal (){
  const thanksModal = document.createElement('div');
  const thanksModalText = document.createElement('p');
  const thanksModalCloseBtn = document.createElement('button');
  thanksModalText.innerText = "Merci ! Votre réservation a été reçue.";
  thanksModalCloseBtn.innerText = "Fermer";
  thanksModal.setAttribute('class','thanks-modal-block')
  thanksModal.appendChild(thanksModalText);
  thanksModal.appendChild(thanksModalCloseBtn);
  modalbg.appendChild(thanksModal);

  thanksModalContainer.style.display = "block";
  form.style.display = "none";
}
  //Validation Form if not null
  function validate() {
  const form = document.getElementById('form');
  //console.log(form);

  //=== Listen to submit Button ===//
  form.addEventListener("submit", (e) => {
    e.preventDefault(); //stop propagation form
    let value = isFirstNameValue && isLastNameValue && isBirthdateValue && isEmailValue && isChoiceOptionLocation && isConditionsChecked;
    const errorsFormValues = () => { 
    errorFirst();
    errorLast();
    errorEmail();
    errorBirthdate();
    errorChoiceOptionLocation();
    errorCheckboxTermsAndConditions();
    }
    //console.log(value);
    if( (value != null || ''))
       {
      console.log("Le formulaire est valide pour l'envoi ");
      thanksLaunchModal();
      return true
    }
    //=== Return Errors if Inputs = null ===//
    else {
      //alert("veuillez remplir tous les champs");
      errorsFormValues();
      return false
    }
  })
}
validate();




