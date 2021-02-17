// Vous devez intégrer cette world map à votre strucutre HTML. Le JavaScript devra générer la map suivante avec une méthode “renderWorldMap”. Source : https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg Vous devez permettre avec le survol de la souris de colorer en bleu chaque pays. Vous devez lors d’un clique colorer en rouge le pays ciblé. Vous devez également afficher le nom du pays survolé ou cliqué en bas de la carte comme une légende.

const loadMap = document.querySelector('.loadMap');
const legend = document.querySelector('.legend');
let countries;

class Map {
  constructor(url) {
    this.url = url;
    this._renderCountryBind = this._renderCountry.bind(this);
    this._renderLegend('clickez sur un pays !');
    this._renderWorldMap();
  }

  // 1. Generer la map
  _renderWorldMap() {
    fetch(this.url)
      .then((response) => response.text())
      .then((data) => {
        loadMap.insertAdjacentHTML('beforeend', data);
        countries = document.getElementById('svg2').querySelectorAll('path');

        countries.forEach((country) => {
          country.addEventListener('click', this._renderCountryBind);
          country.addEventListener('mouseover', this._renderCountryBind);
          country.addEventListener('mouseleave', this._renderCountryBind);

          country.addEventListener(
            'mouseover',
            this._renderLegend.bind(this, country.id)
          );
          country.addEventListener(
            'mouseleave',
            this._renderLegend.bind(this, country.id)
          );
        });
      });
  }

  _renderCountry(e) {
    // this._renderLegend(e.target.id);
    if (e.type === 'click') {
      this._renderLegend(e.target.id);
      if (e.target.style.fill === 'red') {
        e.target.addEventListener('mouseover', this._renderCountryBind);
        e.target.addEventListener('mouseleave', this._renderCountryBind);
        return this._colorize(e.target, 'blue');
      }
      e.target.removeEventListener('mouseover', this._renderCountryBind);
      e.target.removeEventListener('mouseleave', this._renderCountryBind);
      return this._colorize(e.target, 'red');
    }
    if (e.type === 'mouseover') {
      return this._colorize(e.target, 'blue');
    }
    return this._colorize(e.target, 'black');
  }

  // 2. Colorer en bleu chaque pays survolé
  // 3. Cololer en rouge quand clické
  _colorize(country, color) {
    country.style.fill = color;
  }

  // 4. Afficher le nom du pays survolé ou cliqué en bas de la carte comme une légende.
  _renderLegend(countryId) {
    legend.textContent = `Pays : ${countryId.toUpperCase()}`;
  }
}

const map = new Map(
  'https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg'
);
