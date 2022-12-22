
// Fonction toogle responsive
function toogleNavbar() {
  const navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";
  } else {
    navBar.className = "topnav";
  }
}
toogleNavbar();

// constantes déclarées depuis le DOM
const modalBackground = document.querySelector(".background");
const modalButtonRegister = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".form-data");

// a chaque clic du boutton s'inscrire on écoute l'évènement qui afiche la modal
modalButtonRegister.forEach((buttonRegister) => buttonRegister.addEventListener("click", showModal));

// affiche la modal du formulaire ou de remerciement
function showModal() {
  modalBackground.style.display = "block";
}

// Fermer la modal grâce au boutton 'X'
const buttonCloseModal = document.querySelector(".close");
buttonCloseModal.addEventListener("click", closeModalFormAndThanksModal);

function closeModalFormAndThanksModal() {
  modalBackground.style.display = "none";
}
closeModalFormAndThanksModal();

//Je déclare et initialise les variables en haut du code pour les rendre accessibles dans tout le code
let firstName = '';
let lastName = '';
let email = '';
let birthDate = '';
let quantity = '';
let selectLocation = '';
let isConditionsChecked = false;

// Écoute des événements de saisie sur les champs de formulaire
function listenToInputEvents() {
  // Récupération des éléments du DOM
  const firstNameInputDom = document.getElementById("firstName");
  const lastNameInputDom = document.getElementById("lastName");
  const emailInputDom = document.getElementById("email");
  const birthDateInputDom = document.getElementById("birthdate");
  const tournamentQuantityInputDom = document.getElementById("quantity");
  const selectLocationInputDom = document.querySelectorAll('input[name="location"]');
  const checkboxTermsAndConditionsInputDom = document.getElementById("checkbox1");
/*
  const data = [
    {inputId: 'firstName', variableName: firstName},
    {inputId: 'lastName', variableName: lastName}
  ]

  data.forEach(element => {
    element.variableName = document.getElementById(element.inputId).value
    validateInput(element.inputId)
  })
*/
  // Écoute de l'input du prénom de l'utilisateur
  firstNameInputDom.addEventListener("input", (e) => {
    firstName = firstNameInputDom.value;
    validateFirstName();
  });

  // Écoute de l'input du nom de l'utilisateur
  lastNameInputDom.addEventListener("input", (e) => {
    lastName = lastNameInputDom.value;
    validateLastName();
  });

  // Écoute de l'input de l'email de l'utilisateur
  emailInputDom.addEventListener("input", (e) => {
    email = emailInputDom.value;
    validateEmail();
  });

  // Écoute de l'input de la date de naissance de l'utilisateur
  birthDateInputDom.addEventListener("input", (e) => {
    birthDate = birthDateInputDom.value;
    validateBirthDate();
  });

  // Écoute de l'input de la quantité de tournois souhaitée par l'utilisateur
  tournamentQuantityInputDom.addEventListener("input", (e) => {
    quantity = tournamentQuantityInputDom.value;
    validateTournamentQuantity();
  });

  // Écoute des changements de l'input de la localisation souhaitée par l'utilisateur
  selectLocationInputDom.forEach((location) =>
    location.addEventListener('change', (e) => {
      selectLocation = e.target.value;
      validateLocation();
    })
  );

  // Écoute de l'input de la case à cocher des conditions générales de l'utilisateur
  checkboxTermsAndConditionsInputDom.addEventListener('input', (e) => {
    isConditionsChecked = checkboxTermsAndConditionsInputDom.checked;
    //console.log(isConditionsChecked);
    validateCheckboxTermsandConditions();
  });
}
listenToInputEvents();

//==============================================================================================//
// =============================VALIDATION FORMULAIRE========================================== //

//Validation Formulaire si il est complété et vérifié sans erreurs
function validate() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Vérifie si tous les champs du formulaire sont valides
    const areAllInputsValid = firstName &&
      lastName &&
      birthDate &&
      email &&
      quantity &&
      selectLocation &&
      isConditionsChecked;

    // Définit une fonction pour afficher tous les messages d'erreur du formulaire
    const displayFormErrors = () => {
      validateFirstName();
      validateLastName();
      validateEmail();
      validateBirthDate();
      validateTournamentQuantity();
      validateLocation();
      validateCheckboxTermsandConditions();
      alertFormNotCompleted();
    };

    // Si tous les champs du formulaire sont valides, affiche une boîte de dialogue de remerciement
    if (areAllInputsValid) {
      console.log("Le formulaire est valide pour l'envoi");
      openThanksModal();
      return true;
    }
    // Sinon, affiche les messages d'erreur du formulaire
    else {
      displayFormErrors();
      return false;
    }
  });
}
validate();



//============================ Validate Inputs ============================== //


/* Helper Functions for validate by REGEX or Values 
* Je crée les fonctions et on les appelles plus haut dans le ListenerInput() et dans la validation du formulaire
* Pour chaque champ je verifie que les valeurs soient correctes sinon je crée une erreur qui apparaît sous le champ avec
* data-error et j'active la bordure rouge avec data-error-visible
*/

function validateFirstName() {
  const errorFormDataFirstName = document.getElementById("firstName").parentNode;
  // déclaration de la variable message d'erreur pour qu'elle soit accessible dans la fonction
  let errorMessage = "";

  if (firstName === "") {
    errorMessage = "Veuillez entrer un prénom.";
  } else if (firstName.length < 2 || firstName.length > 30) {
    errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
  } else if (!firstName.match(/^[a-zA-Z  'éèëç-]{2,30}$/)) {
    errorMessage = "Le Prénom ne doit pas contenir de chiffres ou de caractères spéciaux";
  }

  errorFormDataFirstName.setAttribute("data-error", errorMessage);
  /* J'ai utilisé l'opérateur ternaire ?: pour définir l'attribut data-error-visible en fonction de la valeur de errorMessage. 
     Si errorMessage est une chaîne vide, l'attribut sera défini sur "faux", sinon il sera défini sur "vrai".*/
  errorFormDataFirstName.setAttribute("data-error-visible", errorMessage ? "true" : "false");
}

// Valisation du champ Nom de famille selon les conditions
function validateLastName() {
  const errorFormDataLastName = document.getElementById("lastName").parentNode;
  let errorMessage = "";

  if (lastName === "") {
    errorMessage = "Veuillez entrer un nom de famille.";
  } else if (lastName.length < 2 || lastName.length > 30) {
    errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du nom de famille.";
  } else if (!lastName.match(/^[a-z A-Z  'éèëç-]{2,30}$/)) {
    errorMessage = "Le nom de famille ne doit pas contenir de chiffres ou de caractères spéciaux";
  }

  errorFormDataLastName.setAttribute("data-error", errorMessage);
  errorFormDataLastName.setAttribute("data-error-visible", errorMessage ? "true" : "false");
}
// Validation du champ Email selon les conditions
function validateEmail() {
  const errorFormDataEmail = document.getElementById("email").parentNode;
  let errorMessage = "";

  if (email === "") {
    errorMessage = "Veuillez entrer une adresse email.";
  } // mise en place d'un Regex pour l'email pour vérifier si le mail est valide
  else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    errorMessage = "Veuillez entrer une adresse email valide. ex:john@gmail.com";
  }

  errorFormDataEmail.setAttribute("data-error", errorMessage);
  errorFormDataEmail.setAttribute("data-error-visible", errorMessage ? "true" : "false");
}

// Validation du champ Date de naissance
function validateBirthDate() {
  const errorFormDataBirthDate = document.getElementById("birthdate").parentNode;
  let errorMessage = "";

  const today = new Date();
  const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  const birthDay = document.getElementById("birthdate");
  const userBirthDate = new Date(birthDay.value);

  if (userBirthDate >= minDate) {
    //console.log("ici");
    errorMessage = "Vous devez avoir 18 ans ou plus pour jouer.";
  } else if (userBirthDate < maxDate) {
    //console.log("ici là");
    //
    errorMessage = "Vous devez avoir moins de 99ans pour jouer.";
  }

  if (birthDay.value === "") {
    errorMessage = "Veuillez entrer votre date de naissance.";
    //console.log("ici là là");

  }/* Si la chaîne ne représente pas une date valide, la méthode parse()renvoie NaN(Not a Number). 
    * La fonction isValidDate()renvoie true si la valeur renvoyée par parse()est NaN, sinon elle renvoie false.*/
  else if (!isValidDate(birthDay.value)) {
    errorMessage = "Veuillez entrer une date de naissance valide (jj/mm/aaaa).";
  }
  errorFormDataBirthDate.setAttribute("data-error", errorMessage);
  errorFormDataBirthDate.setAttribute("data-error-visible", errorMessage ? "true" : "false");
}
/*J'ai créé une fonction isValidDate()qui prend une 
* chaîne de date en entrée et utilise la méthode parse()de la classe Date pour vérifier si la chaîne 
* représente une date valide.
* Si la chaîne représente une date valide, la méthode parse()renvoie une valeur numérique qui représente le nombre 
* de millisecondes délivrées depuis le 1er janvier 1970.
*/
function isValidDate(dateString) {
  // La méthode parse de la classe Date renvoie NaN pour les dates qui ne sont pas valides
  return !isNaN(Date.parse(dateString));
}

// Validation du nombre de participation à des tournois
function validateTournamentQuantity() {
  const errorFormDataTournamentQuantity = document.getElementById("quantity").parentNode;
  let errorMessage = "";

  // Convertir tournamentQuantity en entier avant de vérifier si c'est un entier
  const tournamentQuantityInt = parseInt(quantity, 10);
  console.log(tournamentQuantityInt);
  if (Number.isNaN(tournamentQuantityInt)) {
    //console.log("champ non vide et c'est un nombre");
    // La quantité de tournois est un nombre, vérifiez si c'est un entier
    if (!Number.isInteger(tournamentQuantityInt)) {
      console.log("ce n'est pas un nb entier");
      // la quantité de tournois n'est pas un entier
    }
    else {
      errorMessage = "Veuillez entrer un nombre entier"
    }
  }

  // Vérifie si la quantité de tournois est un entier
  if (!Number.isInteger(tournamentQuantityInt) || !Number.isFinite(tournamentQuantityInt)) { //booleen
    //console.log("le nombre contient des virgules, si c'est le cas il est converti en entier avec parseInt");
    // la quantité de tournois n'est pas un entier ou c'est un nombre infini à virgule
    errorMessage = "Veuillez entrer un nombre entier pour la quantité de tournois.";

  }
  else {
    //console.log("le nombre est un entier");
  }

  // Vérifie si la quantité de tournois est vide
  if (quantity === "") {
    errorMessage = "Veuillez entrer la quantité de tournois auquel vous avez participé.";
  }

  // Vérifie si la quantité de tournois est inférieure à 1
  if (tournamentQuantityInt < 1) {
    errorMessage = "La quantité de tournois doit être au moins 1.";
  }

  // Mettre à jour les attributs de l'élément avec l'erreur
  errorFormDataTournamentQuantity.setAttribute("data-error", errorMessage);
  errorFormDataTournamentQuantity.setAttribute("data-error-visible", errorMessage ? "true" : "false");
}

//Validation du choix de la ville de jeu
function validateLocation() {
  const errorFormDataLocation = document.querySelector("input[name=location]").parentNode;
  //console.log(selectLocation);
  if (selectLocation === "") {
    errorFormDataLocation.setAttribute("data-error", "Vous devez choisir une option.");
    errorFormDataLocation.setAttribute("data-error-visible", "true");
  } else {
    //méthode removeAttribute pour supprimer les attributs data-error et data-error-visible 
    //lorsque l'utilisateur a choisi une ville. 
    errorFormDataLocation.removeAttribute("data-error");
    errorFormDataLocation.removeAttribute("data-error-visible");
  };
};

//Vérifie si le champ Termes et Conditions est bien coché
function validateCheckboxTermsandConditions() {
  const checkbox = document.getElementById("checkbox1");
  const errorCheckedConditions = checkbox.parentNode;
  let errorMessage = "";

  if (!checkbox.checked) {
    errorMessage = "Vous devez vérifier que vous acceptez les termes et conditions.";
  }
  errorCheckedConditions.setAttribute("data-error", checkbox.checked ? "" : errorMessage);
  errorCheckedConditions.setAttribute("data-error-visible", errorMessage ? "true" : "false");//case est cochée ou non ?
  console.log(checkbox.checked);

};


// Alerte envoyée à l'utilisateur pour Vérifier que tous les champs soient remplis et valides avant envoi du formulaire
//
let isAlert = false;
function alertFormNotCompleted() {
  if (isAlert) {
    return;
  }
  isAlert = true;
  // Je crée un nouvelle div dans le DOM
  let alertErrorForm = document.createElement("div");
  // Je Définis la couleur, la taille de la police et l'alignement du texte de la div
  alertErrorForm.style.color = "#FF4E60";
  alertErrorForm.style.fontSize = "12px";
  alertErrorForm.style.textAlign = "center";
  // Je définis le texte à l'intérieur de la div
  alertErrorForm.innerText = "Veuillez remplir tous les champs";
  // J'ajoute la div dans le formulaire
  form.appendChild(alertErrorForm);
  // Je définis l'attribut id de la div
  alertErrorForm.setAttribute("id", "alerte");

  // Je définis une fonction pour basculer le style d'affichage de la div
  function removeAlerts() {
    // Je fais référence à la div en utilisant son identifiant
    let msgAlert = document.getElementById("alerte");
    // Je verifie la valeur du style d'affichage de la div avec display = block
    if (msgAlert.style.display === "block") {
      // Je définis le style sur "none" pour la faire disparaitre
      msgAlert.style.display = "none";
      isAlert = true;
    } else {
      // Sinon je l'affiche avec "block" 
      msgAlert.style.display = "block";
    }
    
  }
  
  // J'appelle la fonction de suppression
  removeAlerts();
  // Je rappelle la fonction removeAlerts avec un délai de 2sec
  setTimeout(removeAlerts, 2000);

};


//==================================== BLOCK thanksModal ============================+//
//verifie si la modal a déjà été ouverte
let modalAlreadyOpened = false;
// Fonction pour ouvrir la modal de remerciement 
function openThanksModal() {
  //condition d'ouverture ou non de la modal en fonction de son état
  if (modalAlreadyOpened) {
    return;
  }
  modalAlreadyOpened = true;
  // récupération et création d'élément dans le DOM
  const modalBody = document.querySelector(".modal-body");
  const thanksModal = document.createElement("div");
  const thanksModalText = document.createElement("p");
  const thanksModalCloseBtn = document.createElement("button");

  // Définition des attributs class et text à l'intérieur de la modal 
  thanksModalText.innerText = "Merci pour votre inscription.";
  thanksModalCloseBtn.innerText = "Fermer";
  thanksModal.setAttribute("class", "thanks-modal-block");
  thanksModalCloseBtn.setAttribute("class", "button btn-close")
  thanksModal.appendChild(thanksModalText);
  thanksModalText.setAttribute("class", "thanks-modal-text")
  thanksModal.appendChild(thanksModalCloseBtn);
  modalBody.appendChild(thanksModal);

  // fais apparaitre la modal de remerciement avec display = block
  thanksModal.style.display = "block";
  // fais disparaitre la<w<q modal du formulaire avec display = none
  form.style.display = "none";

  // Fermer la modal après le click sur le boutton Fermer
  thanksModalCloseBtn.addEventListener("click", (e) => {
    closeModalFormAndThanksModal();
    form.style.display = "block";
    thanksModal.style.display = "none";
    form.reset();
    modalAlreadyOpened = false;
  });
};

