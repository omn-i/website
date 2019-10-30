const URL_IMAGE_DECOUPE = '/skoma/images/decoupe.png';
const NB_UNITE_DIFFERENCE_DECOUPE = 35;

class ProgressBarManager {
	#list = null;
	#list_arg = null;
	#image = null;

	load() {
		this.#list = new Array();
		this.#list_arg = new Array();
		var elements = document.getElementsByClassName('ProgressBar');
		if (elements !== null) {
			for (var i = 0, n = elements.length, outArg; i < n; i++) {
				outArg = {};
				this.#list.push(new ProgressBar(elements[i], outArg));
				this.#list_arg.push(outArg);
			}
		}
		if (this.#image === null) {
			var self = this;
			this.#image = new Image();
			this.#image.addEventListener('load', function() {
				self.#image.removeEventListener('load', this);
				self._loadList();
			});
			this.#image.src = URL_IMAGE_DECOUPE;
		}
		else {
			this._loadList();
		}
	}

	getInstance(element) {
		if (this.#list === null) {
			this.load();
		}
		for (var i = 0, n = this.#list.length; i < n; i++) {
			if (this.#list[i].element === element) {
				return this.#list[i];
			}
		}
		return null;
	}

	_loadList() {
		for (var i = 0, n = this.#list.length, progressBar; i < n; i++) {
			if (this.#list_arg[i].isBesoinImageDecoupe) {
				progressBar = this.#list[i];
				progressBar.setImageDecoupe(ImageColor.getImageColored(
					this.#image, 
					this._getNewColor(progressBar.getForegroundColorRGB())
				));
			}
		}
		this.#list_arg = null;
	}

	_getNewColor(colorRGB) {
		return new RGB(
			colorRGB.R + NB_UNITE_DIFFERENCE_DECOUPE,
			colorRGB.G + NB_UNITE_DIFFERENCE_DECOUPE,
			colorRGB.B + NB_UNITE_DIFFERENCE_DECOUPE);
	}
}

var progressBarManager__ = new ProgressBarManager();

class ProgressBar {
	element;
	#el_pourcentage;
	#el_interieur_conteneur;
	#marge_warning_anim = 0;
	#marge_actuel_warning_anim = 0;
	#ajout_warning_anim = 0;

	static load() {
		progressBarManager__.load();
	}

	static getInstance(element) {
		return progressBarManager__.getInstance(element);
	}

	constructor(element, outArg)
	{
		this.element = element;
		var enfant;
		var self = this, bar_interieur_conteneur, bar_interieur;

		enfant = createDiv('ProgressBar_bar');
			bar_interieur_conteneur = createDiv('ProgressBar_bar_interieur_conteneur');
			this.#el_interieur_conteneur = bar_interieur_conteneur;
				bar_interieur = createDiv('ProgressBar_bar_interieur');
				if (!(outArg.isBesoinImageDecoupe = 
					(
						isClassIn(element, 'ProgressBar_warning') ||
						isClassIn(element, 'ProgressBar_warning_animated')
					))) {
					bar_interieur.style.backgroundImage = 'none';
				}
				bar_interieur_conteneur.appendChild(bar_interieur);
			enfant.appendChild(bar_interieur_conteneur);
		element.appendChild(enfant);

		if (isClassIn(element, 'ProgressBar_warning_animated')) {
			new ResizeSensor(bar_interieur_conteneur, function() {
				self.#marge_warning_anim = getHeight(bar_interieur_conteneur) * 2.0;
				self.#ajout_warning_anim = self.#marge_warning_anim / (FPS * 3);
				if (self.#marge_actuel_warning_anim === 0) {
					self.#marge_actuel_warning_anim = self.#marge_warning_anim;
				}
			    bar_interieur.style.width = (getWidth(bar_interieur_conteneur) + self.#marge_warning_anim + 2.0).toString() + 'px';
			});
			setInterval(function() {
				self.#marge_actuel_warning_anim -= self.#ajout_warning_anim;
				if (self.#marge_actuel_warning_anim <= 0) {
					self.#marge_actuel_warning_anim += self.#marge_warning_anim;
				}
				doTransform(bar_interieur, 'translateX(' + self.#marge_actuel_warning_anim.toString() + 'px)');
			}, 1000 / FPS);
		}

		enfant = createDiv('ProgressBar_info');
		if (isClassIn(element, 'ProgressBar_info_hidden')) {
			enfant.style.visibility = 'hidden';
		}
		else if (isClassIn(element, 'ProgressBar_info_collapse')) {
			enfant.style.visibility = 'collapse';
		}
			this.#el_pourcentage = createElement('p', 'ProgressBar_info_pourcentage unselectable');
			enfant.appendChild(this.#el_pourcentage);
		element.appendChild(enfant);

		this.setValue(70);
	}

	setValue(valeur) {
		if (valeur > 100) {
			valeur = 100;
		}
		else if (valeur < 0) {
			valeur = 0;
		}
		var string_valeur = Math.round(valeur).toString() + '%';
		var string_info = new String(string_valeur);
		var n = string_info.length;
		while (n < 4) {
			string_info += ' ';
			n++;
		}
		this.#el_pourcentage.innerHTML = string_info;
		this.#el_interieur_conteneur.style.width = string_valeur;
	}

	setImageDecoupe(image) {
		this.element.getElementsByClassName('ProgressBar_bar_interieur')[0].style.backgroundImage = 'url(' + image + ')';
	}

	getForegroundColorRGB() {
		var cible = this.element.getElementsByClassName('ProgressBar_bar_interieur')[0];
		return new RGB(window.getComputedStyle ? 
			window.getComputedStyle(cible, null).getPropertyValue("background-color") : 
			cible.style.backgroundColor);
	}
}
