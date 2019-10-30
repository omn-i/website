class VideoSyncManager {
	isPlaying = false;
	callback_switch;
	callback_onAllReady_list = new Array();

	nbVideo;
	video_list = new Array();
	principalNode;

	nbPromiseReceived = 0;
	isAllPromiseOk = true;

	constructor(idConteneur, callback_switch) {
		if (isFunction(callback_switch)) {
			this.callback_switch = callback_switch;
		}
		this.principalNode = document.getElementById(idConteneur);
		var elements = this.principalNode.getElementsByClassName('video_sync');
		this.nbVideo = elements.length;
		for (var i = 0, n = this.nbVideo; i < n; i++) {
			this.video_list.push(elements[i]);
		}
		var self = this;
		var button = this.principalNode.getElementsByClassName('button_sync');
		if (button.length > 0) {
			button = button[0];
			button.addEventListener("click", function() {
				self._switchPlaying();
			});
		}
		this._switchPlaying();
	}

	_switchPlaying() {
		var isPlaying = this.isPlaying;
		var isPremier = true;
		for (var i = 0, n = this.nbVideo, currentTime, video, playPromise; i < n; i++) {
			video = this.video_list[i];
			if (isPlaying) {
				video.pause();
				if (isPremier) {
					isPremier = false;
					currentTime = video.currentTime;
				}
				video.currentTime = currentTime;
				this._promiseReceived(true);
			}
			else {
				playPromise = video.play();
				if (playPromise === undefined) {
					this._promiseReceived(true);
				}
				else {
					playPromise.then(() => this._promiseReceived(true))
					.catch(() => this._promiseReceived(false));
				}
			}
		}
	}

	_promiseReceived(isOk) {
		if (!isOk && this.isAllPromiseOk) {
			this.isAllPromiseOk = false;
		}
		if (++this.nbPromiseReceived === this.nbVideo) {
			this.nbPromiseReceived = 0;
			if (this.isAllPromiseOk) {
				if (this.isPlaying) {

				}
				else {

				}
				this.isPlaying = !this.isPlaying;
				if (isFunction(this.callback_switch)) {

					this.callback_switch(this.isPlaying);
				}
			}
			else {
				this.isAllPromiseOk = true;
			}
		}
	}
}
