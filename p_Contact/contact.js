const TEXT_CONSULTER = 'Consulter';

var socialManager;

document.addEventListener('DOMContentLoaded', function(event) {
	loaded('CONTACT');

	socialManager = new SocialManager();
	var social;

	social = socialManager.getByElement(document.getElementById('Social_gmail'));
	social.setTitre('GMAIL');
	social.setIcone('/skoma/images/gmail.png');
	social.setAffichage('lucas.dujardin15@gmail.com');

	social = socialManager.getByElement(document.getElementById('Social_protonmail'));
	social.setTitre('PROTONMAIL');
	social.setIcone('/skoma/images/protonmail.png');
	social.setAffichage('lucas.dujardin@protonmail.com');

	social = socialManager.getByElement(document.getElementById('Social_github'));
	social.setTitre('GITHUB');
	social.setIcone('/skoma/images/github.png');
	social.setLien('https://github.com/omn-i/website');
});



class SocialManager {
	#list = new Array();

	constructor() {
		var elements;
		elements = document.getElementsByClassName('Social_affichage');
		if (elements !== null) {
			for (var i = 0, n = elements.length; i < n; i++) {
				this.#list.push(new SocialAffichage(elements[i]));
			}
		}
		elements = document.getElementsByClassName('Social_lien');
		if (elements !== null) {
			for (var i = 0, n = elements.length; i < n; i++) {
				this.#list.push(new SocialLien(elements[i]));
			}
		}
	}

	getByElement(element) {
		for (var i = 0, n = this.#list.length; i < n; i++) {
			if (this.#list[i].element === element) {
				return this.#list[i];
			}
		}
		return null;
	}
}

class Social {
	element;
	#el_titre;
	#el_icone;

	constructor(element) {
		this.element = element;
		var enfant;

		enfant = createDiv('Social_conteneur_icone unselectable');
			enfant.appendChild(createDiv('Social_circle_icone'));
			this.#el_icone = createElement('img', 'Social_icone');
			enfant.appendChild(this.#el_icone);
		element.appendChild(enfant);

		this.#el_titre = createElement('p', 'Social_texte_titre');
		element.appendChild(this.#el_titre);
	}

	setTitre(titre) {
		if (titre.constructor === String) {
			this.#el_titre.innerHTML = titre;
		}
	}

	setIcone(src) {
		this.#el_icone.src = src;
	}
}

class SocialAffichage extends Social {
	#el_affichage;

	constructor(element) {
		super(element);
		this.#el_affichage = createElement('p', 'Social_texte_affichage');
		element.appendChild(this.#el_affichage);
	}

	setAffichage(affichage) {
		if (affichage.constructor === String) {
			this.#el_affichage.innerHTML = affichage;
		}
	}
}

class SocialLien extends Social {
	#el_lien;

	constructor(element) {
		super(element);
		var enfant;

		enfant = createDiv();
			this.#el_lien = createElement('a', 'Social_texte_lien');
			this.#el_lien.innerHTML = TEXT_CONSULTER;
			this.#el_lien.target = '_blank';
			this.#el_lien.rel = 'noopener noreferrer';
			enfant.appendChild(this.#el_lien);
			enfant.appendChild(createDiv('Social_texte_lien_underline'));
		element.appendChild(enfant);
	}

	setLien(lien) {
		if (lien.constructor === String) {
			this.#el_lien.href = lien;
		}
	}
}
