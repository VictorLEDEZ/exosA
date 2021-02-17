// Vous devrez réaliser la fonction “checkPalindrome” avec un argument “str”. Cette fonction devra renvoyer “true” si le mot ou la phrase peut être inversé et “false” si ce n’est pas le cas. Vous devez prendre en compte les mots et les phrases. Vous devez utiliser les boucles et aucune autres fonctions de JavaScript.

function checkPalindrome(str) {
  const string = str.toUpperCase().split('');
  const stringLen = string.length;

  // Les mots doivent contenir au moins 3 characteres
  return string.every(
    (char, i, arr) => char === arr[stringLen - i - 1] && stringLen >= 3
  );
}

console.log(checkPalindrome('vi')); //false
console.log(checkPalindrome('lool')); //true
console.log(checkPalindrome('victor')); //false
console.log(checkPalindrome('victor victor')); //false
console.log(checkPalindrome('sexes')); //true
console.log(checkPalindrome('sexes sexes')); //true
console.log(checkPalindrome('   sexes sexes')); //false
