
angular.module('discoveri', [])
	.factory('spotifyData', function($http) {
		return {
			getArtist: function(query) {
				return $http.get('https://api.spotify.com/v1/search?q=' + query + '&type=artist');
			},
			getTracks: function(id) {
				return $http.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US');
			},
			getRelatedArtists: function(id) {
				return $http.get('https://api.spotify.com/v1/artists/' + id + '/related-artists');
			},
			getAlbums: function(ids) {
				return $http.get('https://api.spotify.com/v1/albums?ids=' + ids);
			}
		}
	})
	.controller('MainCtrl', function($scope, $q, $sce, spotifyData) {

		$scope.tracksView = true;

		$scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		}

		


		var callArtist = function(query) {
			return spotifyData.getArtist(query).then(function(response) {
				var artist = response.data.artists.items[0];
				$scope.artist = artist.name;
				$scope.artistId = artist.id;
				$scope.images = artist.images[0].url;
				$scope.followers = artist.followers.total;
				return artist.id;
			});
		}




		var callRelatedArtists = function(id) {
			return spotifyData.getRelatedArtists(id).then(function(response) {
				$scope.relatedArtists = response.data.artists;
				return id;
			});
		}




		var callTracks = function(id) {
			return spotifyData.getTracks(id).then(function(response) {
				$scope.topTracks = response.data.tracks;
				return response.data.tracks;
			})
		}



		var callAlbums = function(tracks) {
			var tracks = tracks;
			var arrayOfAlbums = [];
			for (var i = 0; i < tracks.length; i++) {
				if (arrayOfAlbums.indexOf(tracks[i].album.id) > -1) continue; 
				else arrayOfAlbums.push(tracks[i].album.id);
	 		}
	 		var queryString = arrayOfAlbums.join(',');
	 		spotifyData.getAlbums(queryString).then(function(response) {
	 			$scope.albums = response.data.albums;
	 		});
		}




		$scope.getArtistInfo = function(query) {
			callArtist(query)
			.then(function(response) {
				callRelatedArtists(response);
				callTracks(response).then(function(response) {
					callAlbums(response)
				});
			});
		}








		$scope.getArtistInfo('Rise Against');

		
	});