var lightBox_demo;
var lightBox;

const URL_IMAGE_GO_INTO = '/skoma/images/go_into.png';

document.addEventListener("DOMContentLoaded", function(event) {
	loaded('PROJETS');

	GetImageColored(function(image) {
		document.getElementById('img_go_into_demonstration').src = image;
	}, URL_IMAGE_GO_INTO);


	ProgressBar.getInstance(document.getElementById('ProgressBar_premiereVersion')).setValue(100);
	ProgressBar.getInstance(document.getElementById('ProgressBar_secondeVersion')).setValue(100);

	lightBox = LightBox.getInstance(document.getElementsByClassName('LightBox')[0]);
	GetPngFromDirectory('/skoma/images/demo', function(images) {
		lightBox.setImages(images);
	});
	document.getElementById('demonstration').addEventListener('click', function() {
		lightBox.SwitchVisibility();
	});
	
	//test
});
