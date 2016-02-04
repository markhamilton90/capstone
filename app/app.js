
angular.module('discoveri', [])
	.factory('getArtist', function($http) {
		return function(query) {
			return $http.get('https://api.spotify.com/v1/search?q=' + query + '&type=artist');
		}
	})
	.factory('getTracks', function($http) {
		return function(id) {
			return $http.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US');
		}
	})
	.factory('getRelatedArtists', function($http) {
		return function(id) {
			return $http.get('https://api.spotify.com/v1/artists/' + id + '/related-artists');
		}
	})
	.factory('getAlbums', function($http) {
		return function(ids) {
			return $http.get('https://api.spotify.com/v1/albums?ids=' + ids);
		}
	})
	.directive('backImage', function() {
		return function(scope, element, attrs) {
			attrs.$observe('backImage', function(value) {
				element.css({
					'background-image': 'url(' + value + ')'
				});
			});
		}
	})
	.controller('MainCtrl', function($scope, $q, $http, getArtist, getTracks, 
	getRelatedArtists, getAlbums) {

		$scope.tracksView = true;






		$scope.callAlbums = function(tracks) {
			var tracks = tracks;
			var arrayOfAlbums = [];
			for (var i = 0; i < tracks.length; i++) {
				if (arrayOfAlbums.indexOf(tracks[i].album.id) > -1) continue; 
				else arrayOfAlbums.push(tracks[i].album.id);
	 		}
	 		var queryString = arrayOfAlbums.join(',');
	 		getAlbums(queryString).then(function(response) {
	 			$scope.albums = response.data.albums;
	 		});
		}






		$scope.callArtist = function(query) {
			getArtist(query).then(function(response) {
				$scope.artistId = response.data.artists.items[0].id;
				$scope.images = response.data.artists.items[0].images[0].url;
				$scope.artist = response.data.artists.items[0].name;
				$scope.followers = response.data.artists.items[0].followers.total;
				return response.data.artists.items[0].id;
			})
			.then(function(response) { 
				// get related artists via artist ID
				getRelatedArtists(response).then(function(response) {
					$scope.relatedArtists = response.data.artists;
				});
				// get top tracks via artist ID
				var tracks = getTracks(response).then(function(response) {
					$scope.topTracks = response.data.tracks;
					return response.data.tracks;
				});
				return tracks;
			})
			.then(function(tracks) {
				// get albums via top tracks
				$scope.callAlbums(tracks);
			});
		}

		$scope.callArtist('Rise Against');

		
	});