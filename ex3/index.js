'use strict';

// Réaliser le jeu du morpion avec une classe “MyMorpionXO”. Vous devez compter les points gagnés. Lorsqu’un des deux joueurs obtient 3 points la phrase “X/O a gagné la partie !” devra apparaître.

// SELECTS THE ELEMENTS -------------------------------------------------------
// We select our elements here
const instructions = document.querySelector('.instructions');
const rematch = document.querySelector('button');
const boxes = document.querySelectorAll('td');
const table = document.querySelector('table');

// SET FUNCTIONS --------------------------------------------------------------

class MyMorpionXO {
  // Function that is called instantaneously
  constructor(active) {
    // Public
    this.active = active;

    // To remove and add event listeners
    // Bind creates a new function so we cannot add then remove this._tickBox.bind(this) as these are two different functions
    this.tickHandler = this._tickBox.bind(this);

    // Private
    this._game = [];
    this._tour = 0;
    this._start();
  }

  _start() {
    this._writeInstructions(`${this.active} doit commencer`);
    this._eventListener();
    this._setGameArr();
  }

  // To create the game array that will store game data
  _setGameArr() {
    for (let i = 0; i < 3; i++) {
      this._game[i] = [];
      for (let j = 0; j < 3; j++) {
        this._game[i][j] = undefined;
      }
    }
  }

  // To plot the instructions
  _writeInstructions(message) {
    instructions.textContent = message;
  }

  // To add the or remove the event listeners to the Morpion boxes
  _eventListener(remove) {
    boxes.forEach((box) => {
      if (remove) {
        box.removeEventListener('click', this.tickHandler);
      } else {
        box.addEventListener('click', this.tickHandler);
      }
    });
    rematch.addEventListener('click', this._rematch.bind(this));
  }

  // Checks if the game is winning for the active player
  _checkWin() {
    return this._game.some((arr, i, game) => {
      const checkEvery = (arr) => arr.every((box) => box === this.active);

      const row = checkEvery(arr);

      const col = checkEvery(game.flatMap((arr) => arr.slice(i, i + 1)));

      const diagTopLeft = checkEvery(
        game.flatMap((arr, j) => arr.slice(j, j + 1))
      );

      const diagBottomRight = checkEvery(
        game.flatMap((arr, j) => arr.slice(arr.length - 1 - j, arr.length - j))
      );

      if (row || col || diagTopLeft || diagBottomRight) return true;
    });
  }

  _changePlayer() {
    this.active = this.active === 'X' ? 'O' : 'X';
  }

  // To rematch
  _rematch() {
    this._changePlayer();
    this._start();
    this._tour = 0;

    // reset the Morpion
    table.style.display = '';
    boxes.forEach((box) => (box.textContent = ``));
  }

  // Write the data on the ticked box and checks if it is winning via _checkWin
  _tickBox(e) {
    const box = e.target;

    // Checks the target box is empty. If not returns an error
    if (box.textContent) {
      return this._writeInstructions(
        `Joueur ${this.active} -> CLICKEZ SUR UNE CASE VIDE !`
      );
    }

    // Records coordinates and ticks the corresponding box
    let boxPos = [...box.className];
    this._game[+boxPos[0] - 1][+boxPos[1] - 1] = this.active;
    box.textContent = this.active;

    this._tour++;

    // Checks if it is winning for the active player
    if (this._checkWin() || this._tour === 9) {
      this._eventListener(true);
      return this._writeInstructions(
        !this._checkWin() ? `Partie null !` : `${this.active} a gagné !`
      );
    }

    // Change players
    this._changePlayer();
    this._writeInstructions(`Au tour de ${this.active}`);
  }
}

const morpion = new MyMorpionXO('X');
