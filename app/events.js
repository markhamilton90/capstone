
$(document).ready( function() {

	$('.albumlist').on('click', 'img', function(e) {
		var img = $(this);
		var audio = img.next('audio')[0];
		console.log(this);
		if (audio.classList.contains('playing')) {
			audio.pause();
			audio.classList.remove('playing');
		} else {
			audio.classList.add('playing');
			audio.play();
		}
	});


	$('.tracklist').on('click', 'p', function(e) {
		var el = $(this);
		var audio = el.next('audio')[0];
		console.log(this);
		if (audio.classList.contains('playing')) {
			audio.pause();
			audio.classList.remove('playing');
		} else {
			audio.classList.add('playing');
			audio.play();
		}
	});

});