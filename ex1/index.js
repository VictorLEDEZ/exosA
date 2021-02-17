// Créer une fonction “gridGenerator” prenant les arguments “xAxis” et “yAxis”. Vous devez générer une matrice en “table” html de x * y. Vous devrez colorer aléatoirement chaque case de la grille d’une couleur différente toutes les “1s” à “2s”.

///////////////////////////////////////////////////////////////////////////////
// ELEMENTS ///////////////////////////////////////////////////////////////////
const element = document.querySelector('tbody');
const btn = document.querySelector('button');
let freq = 1000;
let timer;

btn.addEventListener('click', recordXY);

///////////////////////////////////////////////////////////////////////////////
// FUNCTIONS //////////////////////////////////////////////////////////////////

function generateInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function recordXY(e) {
  e.preventDefault();

  const x = document.getElementById('xInput').value;
  const y = document.getElementById('yInput').value;

  if (x <= 0 || y <= 0) return alert('Entrez des valeurs positives svp');

  // After clicking, directly generate the table
  gridGenerator(x, y);

  //  Starts the timer
  clearInterval(timer);
  timer = window.setInterval(function () {
    gridGenerator(x, y);
  }, freq);
}

function gridGenerator(xAxis, yAxis) {
  // Change the frequency at each iterations
  freq = generateInt(1000, 2000);
  element.innerHTML = '';
  // Generer une matrice en table html de x*y
  for (let i = 0; i < yAxis; i++) {
    // creates rows
    const tr = document.createElement('tr');
    // add the rows
    element.appendChild(tr);

    for (let j = 0; j < xAxis; j++) {
      // create columns
      const td = document.createElement('td');
      // Generer un nombre aleatoire de 0 a 255
      const r = generateInt(0, 255);
      const g = generateInt(0, 255);
      const b = generateInt(0, 255);
      // ad the columns
      tr.appendChild(td).style.backgroundColor =
        'rgb(' + r + ',' + g + ',' + b + ')';
    }
  }
}
