// Fonction toogle responsive
function toogle() {
  const navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";  //ici l'espace est important sinon une des classes est perdue
  } else {
    navBar.className = "topnav";
  }
}
toogle();

// constantes déclarées depuis le DOM
const modalBackground = document.querySelector(".background");
const modalButtonRegister = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".form-data");
// Récupération du formulaire
const form = document.getElementById("form");

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

// Je crée un élement "p" qui est un message d'alerte qui prévient l'utilisateur si le fromulaire n'est pas totalement rempli
let message = document.createElement("p");
// Je rajout une couleur, l'alignement et la police de texte 
message.style.color = "#FF4E60";
message.style.fontSize = "12px";
message.style.textAlign = "center";
// J'attribue une classe à l'élément p 
message.setAttribute("class", "alerte");
// Je fais en sorte que p soit un enfant de l'élément form
form.appendChild(message);
// J'ajoute le texte du message
message.innerText = "Veuillez remplir tous les champs du formulaire";
// J'applique le style sur none pour qu'il ne soit pas visible 
message.style.display = "none";


/* Je crée une constante qui rappelle tous les champs du formulaire 
 * avec un tableau d'objets pour stocker les informations de champ de formulaire et 
 * une boucle pour configurer les écouteurs d'événement pour chaque champ. 
 * //Cela facilite l'ajout ou la suppression de champs de formulaire, car il suffit de modifier le tableau d'objets//  */
const formFields = [
  { inputId: 'firstName', variableName: 'firstName', validateFunction: firstnameIsValid },
  { inputId: 'lastName', variableName: 'lastName', validateFunction: lastnameIsValid },
  { inputId: 'email', variableName: 'email', validateFunction: emailIsValid },
  { inputId: 'birthdate', variableName: 'birthDate', validateFunction: birthDateIsValid },
  { inputId: 'quantity', variableName: 'quantity', validateFunction: quantityIsValid },
];
//Pour chaque champ j'écoute l'évènement
formFields.forEach(field => {
  const inputDom = document.getElementById(field.inputId);
  window[field.variableName] = inputDom.value;
  inputDom.addEventListener('input', (e) => {
    window[field.variableName] = e.target.value;
    field.validateFunction();
    // si le champ est rempli je fais disparaitre le message d'alerte
    message.style.display = "none";
  });
});
let selectLocation = '';
const selectLocationInputDom = Array.from(document.querySelectorAll('input[name="location"]'));
selectLocationInputDom.forEach((location) =>
  location.addEventListener('change', (e) => {
    selectLocation = e.target.value;
    console.log(selectLocation);
    locationIsValid();
    message.style.display = "none";
  })
);

let isConditionsChecked = false;
const checkboxTermsAndConditionsInputDom = document.getElementById("checkbox1");
checkboxTermsAndConditionsInputDom.addEventListener('input', (e) => {
  isConditionsChecked = e.target.checked;
  termsAndConditionsAreChecked();
  message.style.display = "none";
});
//==============================================================================================//
// =============================VALIDATION FORMULAIRE========================================== //

//Validation Formulaire si il est complété et vérifié sans erreurs

function formIsValid() {
  // Ajout d'un écouteur d'évènement "submit" sur le formulaire
  form.addEventListener("submit", (e) => {
    // Annulation de l'envoi du formulaire
    e.preventDefault();
    
    //message.style.display = "block";
    // Vérification de la validité de tous les champs du formulaire
    const areAllInputsValid = firstName &&
      lastName &&
      birthDate &&
      email &&
      quantity &&
      selectLocation &&
      isConditionsChecked;
    // Définit une fonction pour afficher tous les messages d'erreur du formulaire
    const displayFormErrors = () => {
      firstnameIsValid();
      lastnameIsValid();
      emailIsValid();
      birthDateIsValid();
      quantityIsValid();
      locationIsValid(selectLocationInputDom);
      termsAndConditionsAreChecked();
    };

    // Si tous les champs du formulaire sont valides, affiche une boîte de dialogue de remerciement
    if (areAllInputsValid) {
      console.log("Le formulaire est valide pour l'envoi");
      // Ne pas afficher le message d'alerte
      message.style.display = "none";
       // Afficher le contenu de la modale de remerciement
      displayThanksModal();
      return true;
    }
    // Sinon, affiche les messages d'erreur du formulaire
    else {
      // Afficher le message d'alerte
      message.style.display = "block";
      // Afficher les erreurs sous les champs qui ne sont pas remplis
      displayFormErrors();
      return false;
    }
  });
}
formIsValid();

//============================ Validate Inputs ============================== //


/* Helper Functions for validate by REGEX or Values 
* Je crée les fonctions et on les appelles plus haut dans le ListenerInput() et dans la validation du formulaire
* Pour chaque champ je verifie que les valeurs soient correctes sinon je crée une erreur qui apparaît sous le champ avec
* data-error et j'active la bordure rouge avec data-error-visible
*/

function firstnameIsValid() {
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
function lastnameIsValid() {
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
function emailIsValid() {
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
function birthDateIsValid() {
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
function quantityIsValid() {
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
function locationIsValid() {
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
function termsAndConditionsAreChecked() {
  const checkbox = document.getElementById("checkbox1");
  const errorCheckedConditions = checkbox.parentNode;
  let errorMessage = "";

  if (!checkbox.checked) {
    errorMessage = "Vous devez vérifier que vous acceptez les termes et conditions.";
  }
  errorCheckedConditions.setAttribute("data-error", checkbox.checked ? "" : errorMessage);
  errorCheckedConditions.setAttribute("data-error-visible", errorMessage ? "true" : "false");//case est cochée ou non 
};

//==================================== BLOCK thanksModal ============================+//
modalAlreadyOpened = false;
// Fonction pour ouvrir la modal de remerciement 
function displayThanksModal() {
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
  // Si le formulaire est valide, faire disparaitre le formulaire avec display = none
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

