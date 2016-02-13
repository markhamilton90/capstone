
$(document).ready( function() {

	$('.tracklist').on('click', 'li', function(e) {
		var audio = $(this).find('audio')[0];
		var btn = $(this).find('i')[0];
		playTrack(audio, btn);
	});


	$('.albumlist').on('click', 'img', function(e) {
		var audio = $(this).next('audio')[0];
		var isPlaying;
		if ($('audio.playing')[0]) {
			isPlaying = $('audio.playing')[0];
			if (audio == isPlaying) {
				audio.pause();
				audio.classList.remove('playing');
			} else {
				if ($('audio.playing').prev().prev()[0]) {
					isPlayingBtn = $('audio.playing').prev().prev()[0];
					isPlayingBtn.classList.remove('fa-pause');
					isPlayingBtn.classList.add('fa-play');
				}
				isPlaying.pause();
				isPlaying.classList.remove('playing');
				audio.classList.add('playing');
				audio.play();
			}
		} else {
			audio.classList.add('playing');
			audio.play();
		}
		
	});


	function playTrack(audio, btn) {
		if ($('audio.playing')[0]) {
			var isPlaying = $('audio.playing')[0];
			var isPlayingBtn = $('audio.playing').prev().prev()[0];
			if (audio == isPlaying) {
				audio.pause();
				audio.classList.remove('playing');
				btn.classList.remove('fa-pause');
				btn.classList.add('fa-play');
			} else {
				isPlaying.pause();
				isPlaying.classList.remove('playing');
				if (isPlayingBtn) {
					isPlayingBtn.classList.remove('fa-pause');
					isPlayingBtn.classList.add('fa-play');
				}
				btn.classList.remove('fa-play');
				btn.classList.add('fa-pause');
				audio.classList.add('playing');
				audio.play();
			}
		} else {
			btn.classList.remove('fa-play');
			btn.classList.add('fa-pause');
			audio.classList.add('playing');
			audio.play();
		}
	}

});