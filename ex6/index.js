// A l’aide d’une fonction “checkPhoneNumber” vous devez renvoyer “true” si le numéro de téléphone correspond à un 06, 07 et 01. Vous devez utiliser les Regex.

const input = document.querySelector('input');
const small = document.querySelector('small');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkPhoneNumber(input.value);
});

function checkPhoneNumber(num) {
  const phoneRegExp = new RegExp('([0]{1})([6-7+1]{1})[0-9]{8}', 'g');
  if (phoneRegExp.test(num)) {
    small.textContent = 'true';
    return true;
  }
  small.textContent = 'false';
  return false;
}
