// Fonction toogle responsive
function toogle() {
  const navBar = document.getElementById("myTopnav");
  navBar.classList.toggle("responsive");
}
toogle();

////////////////////////////////////////////////////////////////////////////////////////////////////*/
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

// affiche la modale du formulaire ou de remerciement
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

// booleen de la modale de remerciement:  false = n'a jamais été ouverte, true = ouvre la modal
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

  // fais apparaitre la modale de remerciement avec display = block
  thanksModal.style.display = "block";
  buttonCloseModalFom.style.display = "none";
  buttonCloseThanksModal.style.display = "block";
  // Si le formulaire est valide, faire disparaitre le formulaire avec display = none
  form.style.display = "none";
}
// déclaration du bouton pour fermer la modal au click sur le X
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

/* Fermer la modal DE REMERCIEMENT après le click sur le boutton Fermer
 * en appelant la fonction closeThanksModal
 * et passer le paramètre à true
 */
thanksModalCloseBtn.addEventListener("click", (e) => {
  closeThanksModal(true);
});

/*////////////////////////////////////////////////////////////////////////////////////////////*/
/*//-------------ALERTE SI FORMULAIRE NON COMPLET OU CONTENANT DES ERREURS----------------// */

// Je crée un élement "p" qui est un message d'alerte qui prévient l'utilisateur si le formulaire n'est pas totalement rempli
let message = document.createElement("p");
// Je rajoute une couleur et l'alignement
message.style.color = "#FF4E60";
message.style.textAlign = "center";
// J'attribue une classe à l'élément p
message.setAttribute("class", "alerte");
// Je fais en sorte que p soit un enfant de l'élément form
form.appendChild(message);
// J'ajoute le texte du message
message.innerText = "Veuillez remplir tous les champs du formulaire";
// J'applique le style sur none pour qu'il ne soit pas visible
message.style.display = "none";

/////////////////////////////////////////////////////////////////////////////////////////*/
/*//-----------------------------------FORMULAIRE---------------------------------------//


/* Je crée une constante qui rappelle tous les champs du formulaire
 * avec un tableau d'objets pour stocker les informations de champ de formulaire et
 * une boucle pour configurer les écouteurs d'événement pour chaque champ.
 * Cela facilite l'ajout ou la suppression de champs de formulaire, car il suffit de modifier le tableau d'objets
 */
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

/* je boucle sur tous les champs du formulaire avec la méthode forEach() et
 * je récupère tous les inputs grâce à leur id
 */
formFields.forEach((field) => {
  const inputDom = document.getElementById(field.inputId);
  window[field.variableName] = inputDom.value;
  inputDom.addEventListener("input", (e) => {
    //Si le champ qu'on écoute est une checkbox
    if (field.inputId === "checkbox1") {
      window[field.variableName] = e.target.checked;
    } //sinon on écoute les champs qui ont une value
    else {
      window[field.variableName] = e.target.value;
    }
    // ici on appelle la fonction qui valide le champ
    field.validateFunction(field.inputId);
    message.style.display = "none";
  });
});
/* De la même manière on écoute les boutons radio
 * ici on crée une instance d'Array pour récupérer tous les inputs qui ont pour name = location
 */
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
/*////////////////////////////////////////////////////////////////////////////////////////////////*/
// ============================= SOUMISSION ET VALIDATION FORMULAIRE========================================== /*/

//Soumission du Formulaire si il est complété et vérifié sans erreurs

function submitForm() {
  // Ajout d'un écouteur d'évènement "submit" sur le formulaire
  form.addEventListener("submit", (e) => {
    // Empêche l'envoi du formulaire
    e.preventDefault();

    /* Vérification de la validité de tous les champs du formulaire et
     * renvoi true si ils sont tous vérifiés et valides,
     * Si c'est le cas on pourra soumettre le formulaire valide
     */
    let formIsValid = [
      firstName,
      lastName,
      birthDate,
      email,
      quantity,
      selectLocation,
      isConditionsChecked,
    ].every((input) => input);

    // Si tous les champs du formulaire sont valides, affiche la modale de remerciement
    if (formIsValid) {
      // Ne pas afficher le message d'alerte
      message.style.display = "none";
      // Afficher le contenu de la modale de remerciement
      showThanksModal();
      
    }
    // Sinon, affiche les messages d'erreur du formulaire
    else {
      // Afficher le message d'alerte
      message.style.display = "block";
      // Afficher les erreurs sous les champs qui ne sont pas remplis
      for (const formField of formFields) {
        isInputValid(formField.inputId);
      }
      isSelectLocationValid(selectLocationInputDom);
      
    }
  });
}
submitForm();

/*///////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/============================ VALIDATION DES CHAMPS DU FORMULAIRE ============================== /*/

//Fonction générique qui vérifie la validité de tous les champs et renvoie des erreurs si IsInputValid est false
function validateField(field) {
  let errorMessage = "";
  let isInputValid = false;

  //Vérifie les champs prénom et nom
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
    //Vérifie le champ email
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
    /* Vérifie si la date de naissance est renseignée
     * Number.isNan vérifie si la valeur entrée est de type number et renverra true sinon renverra false
     * Si la chaîne représente une date valide, la méthode parse()renvoie une valeur numérique qui représente le nombre
     * de millisecondes délivrées depuis le 1er janvier 1970.
     */
    if (Number.isNaN(Date.parse(field.value))) {
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
  }
  //Vérifie si un nombre est renseigné
  else if (field.type === "number") {
    // Vérifie si la quantité de tournois est un entier et supérieur ou égal à 1
    const isPositiveIntegerRegex = /^[1-9]\d*$/;
    if (!isPositiveIntegerRegex.test(field.value)) {
      errorMessage =
        "Veuillez entrer un entier supérieur ou égal à 1 pour la quantité de tournois.";
    }
    //Vérifie si la quantité de tournois est vide
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
    //Vérifie si les conditions sont acceptées
    if (!field.checked) {
      isInputValid = false;
      errorMessage =
        "Vous devez vérifier que vous acceptez les termes et conditions.";
    }
    else {
      isInputValid = true;
      errorMessage = "";
    }

  }
  return { isInputValid, errorMessage: errorMessage };
}

// Je crée une fonction pour gérer les erreurs et les afficher si les champs ne sont pas valides
function updateError(field, isInputValid, errorMessage) {
  const errorElement = field.parentNode;
  errorElement.setAttribute("data-error", errorMessage);
  errorElement.setAttribute(
    "data-error-visible",
    errorMessage ? "true" : "false"
  );
  isInputValid = true;
}
// Je crée une fonction qui vérifie que les champs sont valides et sinon j'appelle la fonction updateError()
function isInputValid(inputId) {
  const inputField = document.getElementById(inputId);
  const inputValidity = validateField(inputField);
  updateError(
    inputField,
    inputValidity.isInputValid,
    inputValidity.errorMessage
  );
}
//Je crée une fonction exceptionnelle pour gérer le champ des bouttons radio
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
