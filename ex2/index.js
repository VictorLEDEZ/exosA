// Vous devez réaliser une barre de chargement. Cette barre de chargement devra comprendre deux parties, une partie colorée et une partie non colorée pour permettre de repérer le progression de la barre. Vous devrez créer la classe “drawBar” qui prendra deux arguments : “sum” pour la somme totale du nombre et “nbr” pour la proportion du segement chargé de la barre.

///////////////////////////////////////////////////////////////////////////////
// SELECTING ELEMENTS /////////////////////////////////////////////////////////

const nbr = document.getElementById('nbr');

///////////////////////////////////////////////////////////////////////////////
// CREATING THE CLASS /////////////////////////////////////////////////////////

class drawBar {
  constructor(sum, nbr) {
    this.sum = sum;
    this.nbr = nbr;

    this._load();
  }

  _load() {
    this._percentage = ((this.nbr * 100) / this.sum).toFixed(1);
    nbr.style.width = this._percentage + '%';
    nbr.innerHTML = this._percentage + ' %';
  }
}

///////////////////////////////////////////////////////////////////////////////
// STARTING THE BAR ///////////////////////////////////////////////////////////

// sum pour la somme totale du nombre
// nbr pour la proportion du segment chargé de la barre
const bar = new drawBar(300, 200);
