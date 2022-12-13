
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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
editNav()

 //Récupération des données  ID dans le dom 
const prenom = document.getElementById("first");
const nom = document.getElementById("last");
// const adresse = document.getElementById("address");
// const ville = document.getElementById("city");
// const email = document.getElementById("email");

//Stocker les données que l'utilisateur va taper dans l'INPUT
let textPrenom;
let textNom;
let textAdresse;
let textVille;
let textEmail;

//créer des ecoutes au click des INPUT avec addEventListenner

//-------------ecoute du champ Prenom
prenom.addEventListener("input", function (e) {
    prenom.value = e.target.value
    console.log(prenom.value);
    textPrenom;
    const errorPrenom = document.getElementById('firstErrorMsg');
    document.getElementById("firstErrorMsg").style.color = "#fe142f";
    document.getElementById("firstErrorMsg").style.fontSize = "14px";
    console.log(errorPrenom);
   
  
    //cibler le texte et renvoyer les données 
    //si le champ est vide renvoi null ou erreur car la 'value de l'input' est vide 
    if (e.target.value.length == 0) {
        console.log("vide");
        //Erreur si le champ est vide
        errorPrenom.innerHTML = "Veuillez entrer un prénom";
        //null pour récupérer la valeur valide du prénom par la suite
        textPrenom = null;
        console.log(textPrenom);


    }//vérifier que le prénom est bien compris entre 2 et 30 caractères si ce n'est pas le cas => affiche l'erreur
    else if (e.target.value.length < 2 || e.target.value.length > 30) {
        
        errorPrenom.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        //renvoyer une valeur null pour ne pas valider le champ
        textPrenom = null;
        console.log("erreur dans le champ prénom = trop court ou trop long");
    }
    //si le champ n'est pas vide on vérifie qu'il est valide avec les Regex MAJ, 
    //min et compris entre 2 et 30 caractères, sont acceptés les -, et ' ; 
    //les autres caractères sont exclus : chiffres symboles etc
    if (e.target.value.match(/^[a-z A-Z 'éèëç-]{2,30}$/)) {
        //string vide car pas d'erreurs pour cette condition
        errorPrenom.innerHTML = "";
        //cibler la valeur du champ
        textPrenom = e.target.value;
        console.log("ç'est bon pour le prenom");
        console.log(textPrenom);
    }
    //vérifier les caractères spéciaux non compris dans la regex et envoyer 
    //une erreur si ils sont bien dans l'intervalle 0,30 caractères et donc "match et != de e.target.value"
    if (  //IMPORTANT !e
        !e.target.value.match(/^[a-z A-Z 'éèëç-]{0,30}$/) &&
        e.target.value.length > 0 &&
        e.target.value.length < 30)
    //On envoie l'erreur au cas où des chiffres ou autres caractères spéciaux sont envoyés dans le champ
    {
       
        errorPrenom.innerHTML = "Le Prénom ne doit pas contenir de chiffres ou de caractères spéciaux "
        textPrenom = null
        console.log("erreur dans le champ prénom = chiffres ou caract spec présents");
    }


});


//-------------ecoute du champ Nom
nom.addEventListener("input", function (e) {
  nom.value = e.target.value
  console.log(nom.value);
  textNom;
  const errorNom = document.getElementById('lastErrorMsg');
  document.getElementById("lastErrorMsg").style.color = "#fe142f";
  document.getElementById("lastErrorMsg").style.fontSize = "14px";
  console.log(errorNom);
 

  //cibler le texte et renvoyer les données 
  //si le champ est vide renvoi null ou erreur car la 'value de l'input' est vide 
  if (e.target.value.length == 0) {
      console.log("vide");
      //Erreur si le champ est vide
      errorNom.innerHTML = "Veuillez entrer un nom";
      //null pour récupérer la valeur valide du prénom par la suite
      textNom = null;
      console.log(textNom);


  }//vérifier que le prénom est bien compris entre 2 et 30 caractères si ce n'est pas le cas => affiche l'erreur
  else if (e.target.value.length < 2 || e.target.value.length > 30) {
      
      errorNom.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
      //renvoyer une valeur null pour ne pas valider le champ
      textNom = null;
      console.log("erreur dans le champ nom = trop court ou trop long");
  }
  //si le champ n'est pas vide on vérifie qu'il est valide avec les Regex MAJ, 
  //min et compris entre 2 et 30 caractères, sont acceptés les -, et ' ; 
  //les autres caractères sont exclus : chiffres symboles etc
  if (e.target.value.match(/^[a-z A-Z 'éèëç-]{2,30}$/)) {
      //string vide car pas d'erreurs pour cette condition
      errorNom.innerHTML = "";
      //cibler la valeur du champ
      textNom = e.target.value;
      console.log("ç'est bon pour le nom");
      console.log(textNom);
  }
  //vérifier les caractères spéciaux non compris dans la regex et envoyer 
  //une erreur si ils sont bien dans l'intervalle 0,30 caractères et donc "match et != de e.target.value"
  if (  //IMPORTANT !e
      !e.target.value.match(/^[a-z A-Z 'éèëç-]{0,30}$/) &&
      e.target.value.length > 0 &&
      e.target.value.length < 30)
  //On envoie l'erreur au cas où des chiffres ou autres caractères spéciaux sont envoyés dans le champ
  {
     
      errorNom.innerHTML = "Le Nom ne doit pas contenir de chiffres ou de caractères spéciaux "
      textNom = null
      console.log("erreur dans le champ nom = chiffres ou caract spec présents");
  }


});


