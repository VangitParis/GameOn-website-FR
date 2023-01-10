// Fonction toogle responsive
function toogle() {
  const navBar = document.getElementById("myTopnav");
  navBar.classList.toggle("responsive");
}
toogle();

/*/-----------------------------/OUVERTURE OU FERMETURE DES MODALES/------------------------------/*/
// constantes déclarées depuis le DOM
const modalBackground = document.querySelector(".background");
const modalButtonRegister = document.querySelectorAll(".button-signup");
const formData = document.querySelectorAll(".form-data");
// Récupération du formulaire
const form = document.getElementById("form");

// a chaque clic du boutton s'inscrire on écoute l'évènement qui affiche la modale
modalButtonRegister.forEach((buttonRegister) =>
  buttonRegister.addEventListener("click", showModal)
);

// affiche la modal du formulaire ou de remerciement
function showModal() {
  modalBackground.style.display = "block";
  buttonCloseThanksModal.style.display = "none";
  buttonCloseModalFom.style.display = "block";
}

// Fermer la modale grâce au boutton 'X'
const buttonCloseModalFom = document.querySelector(".close");
buttonCloseModalFom.addEventListener("click", closeFormModal);
// Fonction pour fermer la modale du formulaire sans réinitialiser les champs déjà saisis
function closeFormModal() {
  // fais disparaitre la modale au clic du boutton X (.close)
  modalBackground.style.display = "none";
}
closeFormModal();

//==================================== BLOCK thanksModal ============================+//

// booleen de la modal de remerciement:  false = n'a jamais été ouverte, true = ouvre la modal
modalAlreadyOpened = false;
// récupération et création d'élément dans le DOM
const modalBody = document.querySelector(".modal-body");
const thanksModal = document.createElement("div");
const thanksModalText = document.createElement("p");
const thanksModalCloseBtn = document.createElement("button");

// Fonction pour ouvrir la modal de remerciement
function showThanksModal() {
  //condition d'ouverture ou non de la modal en fonction de son état
  if (modalAlreadyOpened) {
    return;
  }
  modalAlreadyOpened = true;
  // Définition des attributs class et text à l'intérieur de la modal
  thanksModalText.innerHTML = "Merci pour <br> votre inscription.";
  thanksModalCloseBtn.innerText = "Fermer";
  thanksModal.setAttribute("class", "thanks-modal-block");
  thanksModalCloseBtn.setAttribute("class", "btn-close-thanks-modal");
  thanksModal.appendChild(thanksModalText);
  thanksModalText.setAttribute("class", "thanks-modal-text");
  thanksModal.appendChild(thanksModalCloseBtn);
  modalBody.appendChild(thanksModal);

  // fais apparaitre la modal de remerciement avec display = block
  thanksModal.style.display = "block";
  buttonCloseModalFom.style.display = "none";
  buttonCloseThanksModal.style.display = "block";
  // Si le formulaire est valide, faire disparaitre le formulaire avec display = none
  form.style.display = "none";
}
//déclaration du bouton pour fermer la modal au click sur le X
const buttonCloseThanksModal = document.querySelector(".close-thanks-modal");
buttonCloseThanksModal.addEventListener("click", () => closeThanksModal(true));
// Fonction pour fermer la modale de remerciement au boutton X
function closeThanksModal(shouldResetFormValue = false) {
  if (shouldResetFormValue) {
    firstName = "";
    lastName = "";
    email = "";
    birthDate = "";
    quantity = "";
    selectLocation = "";
    isConditionsChecked = true;
    form.reset();
  }
  modalBackground.style.display = "none";
  form.style.display = "block";
  thanksModal.style.display = "none";
  modalAlreadyOpened = false;
}
closeThanksModal();
// Fermer la modal DE REMERCIEMENT après le click sur le boutton Fermer
thanksModalCloseBtn.addEventListener("click", (e) => {
  closeThanksModal(true);
});

/*////////////-------------ALERTE SI FORMULAIRE NON COMPLET OU CONTENANT DES ERREURS--------------///////// */

// Je crée un élement "p" qui est un message d'alerte qui prévient l'utilisateur si le formulaire n'est pas totalement rempli
let message = document.createElement("p");
// Je rajout une couleur, l'alignement et la police de texte
message.style.color = "#FF4E60";
// message.style.fontSize = "12px";
message.style.textAlign = "center";
// J'attribue une classe à l'élément p
message.setAttribute("class", "alerte");
// Je fais en sorte que p soit un enfant de l'élément form
form.appendChild(message);
// J'ajoute le texte du message
message.innerText = "Veuillez remplir tous les champs du formulaire";
// J'applique le style sur none pour qu'il ne soit pas visible
message.style.display = "none";

/*//-----------------------------------FORMULAIRE---------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////*/

/* Je crée une constante qui rappelle tous les champs du formulaire
 * avec un tableau d'objets pour stocker les informations de champ de formulaire et
 * une boucle pour configurer les écouteurs d'événement pour chaque champ.
 * //Cela facilite l'ajout ou la suppression de champs de formulaire, car il suffit de modifier le tableau d'objets//  */
// const inputIds = ['firstName', 'lastName', 'email', 'birthdate', 'quantity']
const formFields = [
  {
    inputId: "firstName",
    variableName: "firstName",
    validateFunction: isInputValid,
  },
  {
    inputId: "lastName",
    variableName: "lastName",
    validateFunction: isInputValid,
  },
  {
    inputId: "email",
    variableName: "email",
    validateFunction: isInputValid,
  },
  {
    inputId: "birthdate",
    variableName: "birthDate",
    validateFunction: isInputValid,
  },
  {
    inputId: "quantity",
    variableName: "quantity",
    validateFunction: isInputValid,
  },
  {
    inputId: "checkbox1",
    variableName: "isConditionsChecked",
    validateFunction: isInputValid,
  },

];
//Pour chaque champ j'écoute l'évènement
let isConditionsChecked = true;
formFields.forEach((field) => {
  const inputDom = document.getElementById(field.inputId);
  window[field.variableName] = inputDom.value;
  inputDom.addEventListener("input", (e) => {
    if (field.inputId === "checkbox1") {
      window[field.variableName] = e.target.checked;
    } else {
      window[field.variableName] = e.target.value;
    }

    field.validateFunction(field.inputId);
    message.style.display = "none";
  });
});
let selectLocation = "";
const selectLocationInputDom = Array.from(
  document.querySelectorAll('input[name="location"]')
);
selectLocationInputDom.forEach((location) =>
  location.addEventListener("change", (e) => {
    selectLocation = e.target.value;
    console.log(selectLocation);
    isSelectLocationValid();
    message.style.display = "none";
  })
);
/*/==============================================================================================//
// =============================VALIDATION FORMULAIRE========================================== /*/

//Validation Formulaire si il est complété et vérifié sans erreurs

function submitForm() {
  // Ajout d'un écouteur d'évènement "submit" sur le formulaire
  form.addEventListener("submit", (e) => {
    // Empêche l'envoi du formulaire
    e.preventDefault();

    // Vérification de la validité de tous les champs du formulaire
    let areAllInputsValid = [
      firstName,
      lastName,
      birthDate,
      email,
      quantity,
      selectLocation,
      isConditionsChecked,
    ].every((input) => input);

    // Si tous les champs du formulaire sont valides, affiche une boîte de dialogue de remerciement
    if (areAllInputsValid) {
      // Ne pas afficher le message d'alerte
      message.style.display = "none";
      // Afficher le contenu de la modale de remerciement
      showThanksModal();
      return true;
    }
    // Sinon, affiche les messages d'erreur du formulaire
    else {
      // Afficher le message d'alerte
      message.style.display = "block";
      // Afficher les erreurs sous les champs qui ne sont pas remplis
      for (const formField of formFields) {
        isInputValid(formField.inputId);
      }
      //formFields.forEach(formField => isInputValid(formField.inputId))
      isSelectLocationValid(selectLocationInputDom);

      return false;
    }
  });
}
submitForm();
/*/============================ Validate Inputs Fields ============================== /*/

function validateField(field) {
  let errorMessage = "";
  let isInputValid = false;

  console.info(field)
  if (field.value === "") {
    isInputValid = false;
    errorMessage = "Veuillez remplir ce champ.";
  } else if (field.name === "firstName" || field.name === "lastName") {
    if (field.value.length < 2 || field.value.length > 30) {
      isInputValid = false;
      errorMessage = "Veuillez entrer 2 caractères ou plus pour ce champ.";
    } else if (!field.value.match(/^[a-zA-Z  'éèëç-]{2,30}$/)) {
      isInputValid = false;
      errorMessage =
        "Le champ ne doit pas contenir de chiffres ou de caractères spéciaux";
    }
  } else if (field.type === "email") {
    if (
      !field.value.match(/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    ) {
      isInputValid = false;
      errorMessage = "Veuillez entrer un email valide.";
    } else {
      isInputValid = true;
      errorMessage = "";
    }
  } else if (field.type === "date") {
    if (isNaN(Date.parse(field.value))) {
      isInputValid = false;
      errorMessage = "Vous devez entrer votre date de naissance.";
    } else {
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );

      const maxDate = new Date(
        today.getFullYear() - 100,
        today.getMonth(),
        today.getDate()
      );

      const birthDay = new Date(field.value);

      if (birthDay >= minDate) {
        errorMessage = "Vous devez avoir 18 ans ou plus pour jouer.";
      } else if (birthDay < maxDate) {
        errorMessage = "Veuillez entrer une date valide ou supérieur à '1922'.";
      } else {
        isInputValid = true;
        errorMessage = "";
      }
    }
  } else if (field.type === "number") {
    // Convertir tournamentQuantity en entier avant de vérifier si c'est un entier
    const tournamentQuantityInt = parseInt(field.value, 10);
    // Vérifie si la quantité de tournois est un entier et supérieur ou égal à 1
    const isPositiveIntegerRegex = /^[1-9]\d*$/;
    if (!isPositiveIntegerRegex.test(field.value)) {
      errorMessage =
        "Veuillez entrer un entier supérieur ou égal à 1 pour la quantité de tournois.";
    }
    // Vérifie si la quantité de tournois est vide
    else if (field.value === "") {
      errorMessage =
        "Veuillez entrer la quantité de tournois auquel vous avez participé.";
    } else {
      isInputValid = true;
      errorMessage = "";
    }
  } else if (field.name === "location") {
    //Verifie si un champ location est séléctionné
    if (selectLocation === "") {
      errorMessage = "Vous devez choisir une option";
    } else {
      isInputValid = true;
      errorMessage = "";
    }
  } else if (field.type === "checkbox") {
    if (!field.checked) {
      errorMessage =
        "Vous devez vérifier que vous acceptez les termes et conditions.";
    }
  }
  return { isInputValid, errorMessage: errorMessage };
}

function updateError(field, isInputValid, errorMessage) {
  const errorElement = field.parentNode;
  errorElement.setAttribute("data-error", errorMessage);
  errorElement.setAttribute(
    "data-error-visible",
    errorMessage ? "true" : "false"
  );
  isInputValid = true;
}

function isInputValid(inputId) {
  const inputField = document.getElementById(inputId);
  const inputValidity = validateField(inputField);
  updateError(
    inputField,
    inputValidity.isInputValid,
    inputValidity.errorMessage
  );
}

//Validation du choix de la ville de jeu
function isSelectLocationValid() {
  const locationField = document.querySelector("input[name=location]");
  const locationValidity = validateField(locationField);
  updateError(
    locationField,
    locationValidity.isInputValid,
    locationValidity.errorMessage
  );
}
