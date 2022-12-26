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
        firstnameIsValid();
    });

    // Écoute de l'input du nom de l'utilisateur
    lastNameInputDom.addEventListener("input", (e) => {
        lastName = lastNameInputDom.value;
        lastnameIsValid();
    });

    // Écoute de l'input de l'email de l'utilisateur
    emailInputDom.addEventListener("input", (e) => {
        email = emailInputDom.value;
        emailIsValid();
    });

    // Écoute de l'input de la date de naissance de l'utilisateur
    birthDateInputDom.addEventListener("input", (e) => {
        birthDate = birthDateInputDom.value;
        birthDateIsValid();
    });

    // Écoute de l'input de la quantité de tournois souhaitée par l'utilisateur
    tournamentQuantityInputDom.addEventListener("input", (e) => {
        quantity = tournamentQuantityInputDom.value;
        quantityIsValid();
    });

    // Écoute des changements de l'input de la localisation souhaitée par l'utilisateur
    selectLocationInputDom.forEach((location) =>
        location.addEventListener('change', (e) => {
            selectLocation = e.target.value;
            locationIsValid();
        })
    );

    // Écoute de l'input de la case à cocher des conditions générales de l'utilisateur
    checkboxTermsAndConditionsInputDom.addEventListener('input', (e) => {
        isConditionsChecked = checkboxTermsAndConditionsInputDom.checked;
        termsAndConditionsAreChecked();
    });
}
listenToInputEvents();


// Validation des champs du formulaire 

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