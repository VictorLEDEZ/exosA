// Vous devrez créer une bataille navale en indiquant dans la matrice suivante la position des bateaux : “[[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],[0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 4, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]”. Lors d’un clique sur une des cases vous devez indiquer la couleur rouge si un bateau à été touché si non la couleur bleu. Vous devez également nommer chaque colonne avec des chiffres et chaque ligne avec des lettres. Un message “vous avez gagné” indiquera que vous avez gagné si tous les bateaux sont coulés. Vous devez aussi afficher à l’écran le nom des bateaux coulés. Exemple : “Porte avion, Frégate”.

///////////////////////////////////////////////////////////////////////////////
// SELECTING ELEMENTS /////////////////////////////////////////////////////////

const instructions = document.querySelector('.instructions');
const coulé = document.querySelector('.coulé');
const tbody = document.querySelector('tbody');

///////////////////////////////////////////////////////////////////////////////
// CREATING THE GAME //////////////////////////////////////////////////////////

class BatailleNavale {
  constructor(gameArr) {
    this._boats = [
      { name: 'Torpilleur', id: 1, size: 2 },
      { name: 'Frégate', id: 2, size: 3 },
      { name: 'Contre-Torpilleurs', id: 3, size: 4 },
      { name: 'Croiseur', id: 4, size: 5 },
      { name: 'Porte-Avions', id: 5, size: 5 },
    ];
    this._game = gameArr;

    this._changeText(instructions, '⛴ Clickez sur un case pour attaquer ! ⛴');
    this._changeText(coulé, 'Bateau coulés : ');
    this._checkTouchBind = this._checkTouch.bind(this);
    this._placeBoats();
    this._addCoords();
  }

  _changeText(target, message) {
    target.textContent = message;
  }

  _addText(target, message) {
    target.textContent += message;
  }

  _nextChar(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1).toUpperCase();
  }

  _placeBoats() {
    // To add the class names
    let col = 0;
    let row = '`'; // ` is before a in the ASCII Table

    // To set the text Content
    let colNum = 0;
    let rowNum = -1;

    this._game.forEach((arr) => {
      // creates and adds rows
      const tr = document.createElement('tr');
      tbody.appendChild(tr);
      row = this._nextChar(row);
      col = 0;

      colNum = 0;
      rowNum++;

      arr.forEach(() => {
        // create and add columns
        col++;
        const td = document.createElement('td');
        td.id = `${
          this._game[rowNum][colNum] === 0 ? '' : this._game[rowNum][colNum]
        }`;
        tr.appendChild(td).className = `${row}.${col}`;

        colNum++;
      });
    });

    this._eventListener();
  }

  _eventListener() {
    const tds = document.querySelectorAll('td');
    tds.forEach((td) => td.addEventListener('click', this._checkTouchBind));
  }

  _addCoords() {
    let row = '`';
    const trs = document.querySelectorAll('tr');
    trs.forEach((tr) => {
      row = this._nextChar(row);
      const tdRow = document.createElement('td');
      tdRow.className = 'coords';
      tdRow.textContent = row;
      tr.appendChild(tdRow);
    });

    const tr = document.createElement('tr');
    tbody.appendChild(tr);

    for (let i = 0; i < this._game.length; i++) {
      const tdCol = document.createElement('td');
      tdCol.className = 'coords';
      tdCol.textContent = i + 1;
      tr.appendChild(tdCol);
    }
  }

  _checkTouch(e) {
    const target = e.target;
    const boatId = target.id;
    const boat = this._boats[boatId - 1];

    target.removeEventListener('click', this._checkTouchBind);

    if (boatId) {
      if (boat.dead) return;

      boat.size--;
      target.style.backgroundColor = 'red';

      if (!boat.size) {
        boat.dead = true;

        this._addText(coulé, `${boat.name} / `);

        if (this._checkWin()) return;

        return this._changeText(instructions, `${boat.name} Coulé !`);
      } else {
        return this._changeText(instructions, `Touché !`);
      }
    }
    this._changeText(instructions, `Raté !`);
    return (target.style.backgroundColor = 'blue');
  }

  _checkWin() {
    if (this._boats.every((boat) => boat.dead)) {
      this._changeText(instructions, `Vous avez gagné !`);

      const tds = document.querySelectorAll('td');

      tds.forEach((td) =>
        td.removeEventListener('click', this._checkTouchBind)
      );
      return true;
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
// STARTING THE GAME //////////////////////////////////////////////////////////

const testArr = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const bataille = new BatailleNavale(testArr);
