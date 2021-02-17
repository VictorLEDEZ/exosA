// Vous devez réaliser un formulaire avec les champs : “nom”, “prénom”, “email”, “password”. Vous devez contrôler chaque champs à l’aide de la classe Regex (native à js). La validation du formulaire devra s’effectuer avec un bouton. Vous devez afficher les erreurs pour chaque champs. Pour construire une Regex utilisez : https://regexr.com/. L’intégralité du formulaire doit être en HTML. Vous devez indiquez les erreurs et la validation pour chaque champs.

const form = document.getElementById('form');
const userName = document.getElementById('userName');
const userSurname = document.getElementById('userSurname');
const userMail = document.getElementById('userMail');
const userPassword = document.getElementById('userPassword');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  /////////////////////////////////////////////////////////////////////////////
  // NOM //////////////////////////////////////////////////////////////////////
  const nameRegExp = new RegExp('^([A-Za-z0-9]){4,20}$', 'gm');

  const userNameValue = userName.value.trim();

  if (nameRegExp.test(userNameValue)) {
    setStatus(userName);
  } else {
    setStatus(userName, 'Veuillez renseigner un nom valide!');
  }

  /////////////////////////////////////////////////////////////////////////////
  // PRENOM ///////////////////////////////////////////////////////////////////
  const surnameRegExp = new RegExp('^([A-Za-z0-9]){4,20}$', 'gm');

  const userSurnameValue = userSurname.value.trim();

  if (surnameRegExp.test(userSurnameValue)) {
    setStatus(userSurname);
  } else {
    setStatus(userSurname, 'Veuillez renseigner un prenom valide!');
  }

  /////////////////////////////////////////////////////////////////////////////
  // EMAIL ////////////////////////////////////////////////////////////////////
  const mailRegExp = new RegExp(
    '^([A-Z|a-z|0-9](.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((.){0,1}[A-Z|a-z|0-9]){2}.[a-z]{2,3}$',
    'gm'
  );

  const userMailValue = userMail.value.trim();

  if (mailRegExp.test(userMailValue)) {
    setStatus(userMail);
  } else {
    setStatus(userMail, 'Veuillez renseigner un mail valide!');
  }

  /////////////////////////////////////////////////////////////////////////////
  // PASSWORD /////////////////////////////////////////////////////////////////
  // - at least 8 characters
  // - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
  // - Can contain special characters
  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  const passwordRegExp = new RegExp(
    '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$',
    'gm'
  );

  const userPasswordValue = userPassword.value.trim();

  if (passwordRegExp.test(userPasswordValue)) {
    setStatus(userPassword);
  } else {
    setStatus(userPassword, 'Veuillez entrer un Mot de Passe valide!');
  }
}

function setStatus(input, message) {
  const small = input.nextElementSibling;
  if (!message) {
    small.classList.remove('danger');
    small.classList.add('success');
    return (small.innerHTML = 'Champ Valide');
  }
  small.innerHTML = message.toUpperCase();
  small.classList.remove('success');
  small.classList.add('danger');
}
