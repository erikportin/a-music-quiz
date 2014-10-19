/**
 * @jsx React.DOM
 */

'use strict';

var LoginLink = React.createClass({displayName: 'LoginLink',
  render: function() {
    return (
      React.DOM.a( {href:this.props.url}, "Login")
    );
  }
});

var MusicApp = React.createClass({displayName: 'MusicApp',
  render: function() {
    return (
      React.DOM.div( {className:"m-app"}
      )
    );
  }
});


document.body.onload = function(){
	function _login(){
		ajax('api/login', '').then(function(data){
			var _loginUrl = data['redirect_url'];
			if(document.getElementById('app')) {
				React.renderComponent(LoginLink( {url:_loginUrl}), document.getElementById('app'));
			}
		})		
	}

	function _startGame(accessToken){
		spotifyService.getUser(tokens.accessToken).then(function(userData){
			spotifyService.getPlaylists(userData.id).then(function(playlists){
				//Start game
				var _game = new Game(userData.id, playlists[2].id)
				React.renderComponent(GameView( {game:_game}), document.getElementById('app'));

			}).fail(function(failed){
				console.log(failed)
			})

		}, function(error){
			console.log(error)
			_login();
		});	
	}

	var tokens = spotifyService.getTokens(window.location.search);

	if(tokens.accessToken && tokens.refreshToken){	
		_startGame(tokens.accessToken);	
	}
	else{
		_login();
	}
}