var lightBox_demo;
var lightBox;

document.addEventListener('DOMContentLoaded', function(event) {
	loaded('PROJETS');

	GetImageColored(function(image) {
		document.getElementById('img_go_into_demonstration').src = image;
	}, '/images/go_into.png');

	ProgressBar.getInstance(document.getElementById('ProgressBar_premiereVersion')).setValue(100);
	ProgressBar.getInstance(document.getElementById('ProgressBar_secondeVersion')).setValue(100);

	lightBox = LightBox.getInstance(document.getElementsByClassName('LightBox')[0]);
	GetPngPathsFromDirectory('/images/demo', function(images) {
		lightBox.setPaths(images);
	}, true);
	document.getElementById('demonstration').addEventListener('click', function() {
		lightBox.SwitchVisibility();
	});
});
