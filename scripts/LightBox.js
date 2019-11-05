const URL_IMAGE_CROIX = '/images/croix.png';

class LightBoxManager {
	#list = null;
	lightBoxAffiche = null;
	#overflowY_mem = null;
	#body;
	#image_croix = undefined;

	load() {
		this.#list = new Array();
		var elements = document.getElementsByClassName('LightBox');
		if (elements !== null) {
			for (var i = 0, n = elements.length; i < n; i++) {
				this.#list.push(new LightBox(elements[i]));
			}
		}
		if (this.#image_croix === undefined) {
			this.#body = document.getElementsByTagName('body')[0];
			var self = this;
			GetImageColored(function(image) {
				self.#image_croix = image;
				for (var i = 0, n = self.#list.length; i < n; i++) {
					self.#list[i].setImageCroix(image);
				}
			}, URL_IMAGE_CROIX, new RGB('#ffffff'));
		}
	}

	_checkLoad() {
		if (this.#list === null) {
			this.load();
		}
	}

	getInstance(element) {
		this._checkLoad();
		for (var i = 0, n = this.#list.length; i < n; i++) {
			if (this.#list[i].element === element) {
				return this.#list[i];
			}
		}
		return null;
	}

	NotifierAction(lightBox, isAffichage) {
		this._checkLoad();
		if (isAffichage) {
			if (this.lightBoxAffiche === null) {
				this.#overflowY_mem = this.#body.style.overflowY;
				this.#body.style.overflowY = 'hidden';
			}
			this.lightBoxAffiche = lightBox;
		}
		else if (lightBox !== null && this.lightBoxAffiche === lightBox) {
			this.#body.style.overflowY = this.#overflowY_mem;
			this.lightBoxAffiche = null;
			this.#overflowY_mem = null;
		}
	}

	GetImageCroix() {
		return this.#image_croix;
	}
}

var lightBoxManager__ = new LightBoxManager();

class LightBox {
	element;
	#paths;
	#index = -1;
	#el_image;
	#el_count;

	static load() {
		lightBoxManager__.load();
	}

	static getInstance(element) {
		return lightBoxManager__.getInstance(element);
	}

	constructor(element) {
		this.element = element;
		var enfant, enfant_2, enfant_3;
		var image_src;

		enfant = createDiv('LightBox_marge_conteneur');
			this.#el_count = createElement('p', 'LightBox_count unselectable');
			enfant.appendChild(this.#el_count);

			enfant_2 = createDiv('LightBox_fleche unselectable');
				enfant_3 = createElement('p');
				enfant_3.innerHTML = '&lt';
				enfant_2.appendChild(enfant_3);
			enfant.appendChild(enfant_2);
			enfant_2.addEventListener('click', () => this.DeplacerVisualiseur(this.#index - 1));
		element.appendChild(enfant);

		enfant = createDiv('LightBox_image_conteneur');
			enfant.appendChild(createDiv('LightBox_image_header'));
			this.#el_image = createElement('img', 'LightBox_image unselectable');
			enfant.appendChild(this.#el_image);
			enfant.appendChild(createDiv('LightBox_image_footer'));
		element.appendChild(enfant);

		enfant = createDiv('LightBox_marge_conteneur');
			enfant_2 = createElement('img', 'LightBox_croix unselectable');
			if ((image_src = lightBoxManager__.GetImageCroix()) !== undefined) {
				enfant_2.src = image_src;
			}
			enfant.appendChild(enfant_2);
			enfant_2.addEventListener('click', () => this.Fermer());

			enfant_2 = createDiv('LightBox_fleche unselectable');
				enfant_3 = createElement('p');
				enfant_3.innerHTML = '&gt';
				enfant_2.appendChild(enfant_3);
			enfant.appendChild(enfant_2);
			enfant_2.addEventListener('click', () => this.DeplacerVisualiseur(this.#index + 1));
		element.appendChild(enfant);
	}

	setPaths(paths) {
		this.#paths = new Array();
		if (Array.isArray(paths)) {
			for (var i = 0, n = paths.length; i < n; i++) {
				this.#paths.push(paths[i]);
			}
		}
		this.DeplacerVisualiseur(0);
	}

	DeplacerVisualiseur(newIndex) {
		var length = this.#paths.length;
		var isArrayVide = length === 0;
		if (isArrayVide) {
			this.#index = 0;
			this.#el_image.src = undefined;
		}
		else {
			if (newIndex < 0) {
				newIndex = 0;
			}
			else if (newIndex >= length) {
				newIndex = length - 1;
			}
			if (this.#index === newIndex) {
				return;
			}
			this.#index = newIndex;
			this.#el_image.src = this.#paths[newIndex];
		}
		this.#el_count.innerHTML = isArrayVide ?
			'0/0' :
			(this.#index + 1).toString() + '/' + length.toString();
	}

	isVisible() {
		return lightBoxManager__.lightBoxAffiche === this;
	}

	Ouvrir() {
		this.element.style.display = 'flex';
		lightBoxManager__.NotifierAction(this, true);
	}

	Fermer() {
		this.element.style.display = 'none';
		lightBoxManager__.NotifierAction(this, false);
	}

	SwitchVisibility() {
		if (this.isVisible()) {
			this.Fermer();
		}
		else {
			this.Ouvrir();
		}
	}

	setImageCroix(image) {
		this.element.getElementsByClassName('LightBox_croix')[0].src = image;
	}
}
