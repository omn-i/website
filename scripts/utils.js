var null_place;
var DEFAULT_ICON_COLOR;

const FPS = 30;

function loaded(nomItemMenu) {
	null_place = document.getElementById('null_place');
	var element = createDiv('default_icon_color');
	null_place.appendChild(element);
	DEFAULT_ICON_COLOR = new RGB(window.getComputedStyle ? 
		window.getComputedStyle(element, null).getPropertyValue("background-color") : 
		element.style.backgroundColor);
	null_place.removeChild(element);

	SelectionnerMenuPrincipal(nomItemMenu);
}

function SelectionnerMenuPrincipal(nomItemMenu) {
	var nav = document.getElementById('nav_principal');
	if (nav !== null) {
		var elements_texte = nav.getElementsByClassName('nav_item_texte');
		var elements_underline = nav.getElementsByClassName('nav_item_underline');
		var n = elements_texte.length;
		if (n === elements_underline.length) {
			var allOff = false;
			for (var i = 0, nbTrouve = 0; i < n; i++) {
				if (allOff || elements_texte[i].innerHTML.toString() !== nomItemMenu) {
					elements_underline[i].style.visibility = 'hidden';
				}
				else {
					elements_underline[i].style.visibility = 'visible';
					if (++nbTrouve === 2) {
						i = -1;
						allOff = true;
					}
				}
			}
			return !allOff;
		}
	}
	return false;
}

function ScrollWindowSnap(isMonter) {
	var scroll_snap = document.getElementsByClassName('scroll_snap');
	if (scroll_snap.length > 0) {
		scroll_snap = scroll_snap[0];
		var height = window.innerHeight ||
			document.documentElement.clientHeight ||
			document.getElementsByTagName('body')[0].clientHeight;
		scroll_snap.scroll({
			top: isMonter ? -height : height, 
			left: 0, 
			behavior: 'smooth',
		});
	}
	ClearSelection();
}

function ClearSelection() {
	if (window.getSelection) {
		window.getSelection().removeAllRanges();
	}
 	else if (document.selection) {
 		document.selection.empty();
 	}
}

function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
}

function isClassIn(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') != -1;
}

function createDiv(className = '') {
	return createElement('div', className);
}

function createElement(tag, className = '') {
	var div = document.createElement(tag);
	div.className = className;
	return div;
}

function getWidth(element) {
	return parseFloat((window.getComputedStyle ? 
		window.getComputedStyle(element, null).getPropertyValue("width") : 
		element.style.width).replace('px', ''));
}

function getHeight(element) {
	return parseFloat((window.getComputedStyle ? 
		window.getComputedStyle(element, null).getPropertyValue("height") : 
		element.style.height).replace('px', ''));
}

function doTransform(element, transform) {
	element.style.transform = transform;
	element.style.webkitTransform = transform;
	element.style.MozTransform = transform;
	element.style.msTransform = transform;
	element.style.OTransform = transform;
}



class RGB {
	R;
	G;
	B;

	constructor(r, g, b) {
		if (Number.isInteger(r) && Number.isInteger(g) && Number.isInteger(b)) {
			this.R = r;
			this.G = g;
			this.B = b;
		}
		else if (r.constructor === String && r.length > 0) {
			if (r.charAt(0) === '#') {
				this._loadFromHex(r);
			}
			else {
				var rgb_list = r.replace('rgb(', '').replace(')', '').replace(new RegExp(' ', 'g'), '').split(',');
				this.R = parseInt(rgb_list[0]);
				this.G = parseInt(rgb_list[1]);
				this.B = parseInt(rgb_list[2]);
			}
		}
		else {
			this.R = 0;
			this.G = 0;
			this.B = 0;
		}
	}

	static hexToRGB(colorHex) {
	    return new RGB(colorHex);
	}

	static rgbToHex(colorRGB) {
		return "#" +
			RGB._rgbToHex_char(colorRGB.R) +
			RGB._rgbToHex_char(colorRGB.G) +
			RGB._rgbToHex_char(colorRGB.B);
	}

	_loadFromHex(colorHex) {
		var long = parseInt(colorHex.replace('#', ''), 16);
		this.R = (long >>> 16) & 0xff;
		this.G = (long >>> 8) & 0xff;
		this.B = long & 0xff;
	}

	static _rgbToHex_char(c) {
	  	var hex = c.toString(16);
	  	return hex.length === 1 ? '0' + hex : hex;
	}
}



const MAX_IMAGE_CACHE = 8;

class ImageColorManager {
	#list = new Array();

	getImageColored(img_src, colorRGB) {
		for (var i = 0, n = this.#list.length; i < n; i++) {
			if (this.#list[i].img_original === img_src) {
				return this.#list[i].getImageColored(colorRGB);
			}
		}
		var conteneur = new ImageColor(img_src);
		this.#list.push(conteneur);
		return conteneur.getImageColored(colorRGB);
	}
}

var imageColorManager__ = new ImageColorManager();

class ImageColor {
	#colorInfo_list = new Array();
	img_original;

	static getImageColored(img_src, colorRGB) {
		return imageColorManager__.getImageColored(img_src, colorRGB);
	}

	constructor(img) {
		this.img_original = img;
	}

	getImageColored(colorRGB) {
		var colorHex = RGB.rgbToHex(colorRGB);
		var n = this.#colorInfo_list.length;
		for (var i = 0; i < n; i++) {
			if (this.#colorInfo_list[i].colorHex === colorHex) {
				return this.#colorInfo_list[i].img;
			}
		}
		if (n >= MAX_IMAGE_CACHE && n > 0) {
			this.#colorInfo_list.splice(0, 1);
		}
		var info = new ImageColorInfo(this.img_original, colorRGB);
		this.#colorInfo_list.push(info);
		return info.img;
	}
}

class ImageColorInfo {
	img;
	colorHex;

	constructor(img, colorRGB) {
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = img.width;
	    canvas.height = img.height;
	    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
	    var currentPixels = ctx.getImageData(0, 0, img.width, img.height);
        for (var i = 0, n = currentPixels.data.length; i < n; i += 4) {
            if (currentPixels.data[i + 3] > 0) {
                currentPixels.data[i] = colorRGB.R;
                currentPixels.data[i + 1] = colorRGB.G;
                currentPixels.data[i + 2] = colorRGB.B;
            }
        }
        ctx.putImageData(currentPixels, 0, 0);
        this.img = canvas.toDataURL("image/png");
        this.colorHex = RGB.rgbToHex(colorRGB);
	}
}

function GetImageColored(callback, url, color = DEFAULT_ICON_COLOR) {
	if (isFunction(callback)) {
		var image = new Image();
		image.addEventListener('load', function() {
			image.removeEventListener('load', this); 
			callback(ImageColor.getImageColored(image, color));
		});
		image.src = url;
	}
}

function GetPngPathsFromDirectory(path_directory, callback, putInCache = false) {
	if (path_directory.constructor !== String && path_directory.length === 0) {
		return;
	}
	if (path_directory.slice(-1) !== '/') {
		path_directory += '/';
	}
	GetPngPathsFromDirectory_intern(path_directory, callback, new Array(), 0, putInCache === true);
}

function GetPngPathsFromDirectory_intern(path_directory, callback, paths, index, putInCache) {
	var xhttp = new XMLHttpRequest();
	var removeEventListener, event_load, event_error;
	var path = path_directory + index.toString() + '.png';
	removeEventListener = function() {
		xhttp.removeEventListener('readystatechange', event_load, true);
		xhttp.removeEventListener('error', event_error, true);
	};
	event_load = function() {
		if (xhttp.readyState === 4) {
			removeEventListener();
			if (xhttp.status === 200) {
				paths.push(path);
				GetPngPathsFromDirectory_intern(path_directory, callback, paths, ++index, putInCache);
			}
			else {
				callback(paths);
			}
		}
	};
	event_error = function() {
		removeEventListener();
		callback(paths);
	};
	xhttp.addEventListener('readystatechange', event_load, true);
	xhttp.addEventListener('error ', event_error, true);
    xhttp.open(putInCache ? 'GET' : 'HEAD', path, true);
    xhttp.send();
}
