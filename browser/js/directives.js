juke.directive('sidebar', function() {
	return {
		restrict: 'E',
		templateUrl:'/js/sidebar/templateSidebar.html'
	}
})

juke.directive('player', function(PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl:'/js/player/templatePlayer.html', 
		link : function(scope) {
			
			angular.extend(scope, PlayerFactory); //it transfers all PlayerFactory mthods onto the scope of the player directives

			scope.toggle = function () {
			    if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
			    else PlayerFactory.resume();
			};

			scope.getPercent = function () {
			    return PlayerFactory.getProgress() * 100;
			};
		}
	}
})

juke.directive('albumList', function() {
	return {
		restrict: 'E',
		templateUrl:'/js/album/templates/albumsTemplate.html', 
		scope : { // controls how it is gonna populate (for the ng-repeat)
			albums : '='
		}
	}
})

juke.directive('songsList', function(PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl:'/js/song/allSongsTemplate.html', 
		scope : { // controls how it is gonna populate (for the ng-repeat)
			songs : '='
		},
		link : function(scope) {
			
			angular.extend(scope, PlayerFactory);

			scope.getCurrentSong = function () {
				return PlayerFactory.getCurrentSong();
			};

			scope.isPlaying = function (song) {
				return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
			};

			scope.toggle = function (song) {
				if (song !== PlayerFactory.getCurrentSong()) {
				PlayerFactory.start(song, scope.songs);// to access the 'songs' we need to refer first to the scope and then songs
				} else if ( PlayerFactory.isPlaying() ) {
				PlayerFactory.pause();
				} else {
				PlayerFactory.resume();
				}
			};
		}
	}
})