// Vous devez réaliser une fonction “computeNotes” qui prendra un tableau de notes exemple : “[10, 13, 13, 12, 15, 12, 11, 16, 14]”, vous devrez calculer la moyenne générale au retour de cette méthode.

const computeNotes = (arr) =>
  (arr.reduce((acc, note) => note + acc) / arr.length).toFixed(2);

console.log(computeNotes([10, 13, 13, 12, 15, 12, 11, 16, 14]));
