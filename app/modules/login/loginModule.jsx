/**
 * @jsx React.DOM
 */

'use strict';

var LoginView = React.createClass({
    getInitialState: function() {
        return {
            loginUrl: ''
        };
    },

    login: function() {
        log('Login: login');
        spotifyService.login().then(function(data) {
            this.setState({
                loginUrl: data['redirect_url']
            })
        }.bind(this))
    },

    tryLogin: function() {
        log('Login: tryLogin');

        var _queries = Helpers.getQueries(window.location.search),
            _tokens = localStorage.getItem('amq-user') || spotifyService.getTokens(window.location.search).accessToken;

        
        //TODO automate
        if(_queries.debug){
            localStorage.setItem('amq-debug', _queries.debug);
        }

        if(_queries.mute){
            localStorage.setItem('amq-mute', _queries.mute);
        }

        if(_queries.owner && _queries.id){
            sessionStorage.setItem('amq-game', JSON.stringify({
                owner: _queries.owner,
                id: _queries.id 
            }));            
        }

        if (_tokens) {
            spotifyService.getUser(_tokens).then(function(userData) {
                log('Login: got user');
                log(userData);
                
                localStorage.setItem('amq-user', _tokens);
            
                var _gameUrl = JSON.parse(sessionStorage.getItem('amq-game'));

                if(_gameUrl){
                    log('Login: using stored game')
                    sessionStorage.removeItem('amq-game')
                    this.props.onPlay(_gameUrl.owner, _gameUrl.id);
                }
                else{
                    log('Login: auth')
                    this.props.onAuth(userData.id);                    
                }

            }.bind(this), function() {
                log('Login: failed to get user');
                localStorage.removeItem('amq-user');
                this.login();
            }.bind(this))
        } else {
            this.login();
        }
    },

    render: function() {
        log('Login: render');

        var _view = '',
            _loader = '';

		if(this.state.loginUrl){
			_view = <div className='m-login-inner'>
				    	<h1>a music quiz</h1 >
                        <p>Turn your Spotify playlist into a Music Quiz</p>
           				<a className='m-login-link' href={this.state.loginUrl}> login with Spotify </a>
				      	<p className='m-login-cred'>made by Erik Portin</p >
           			</div> 	
		}
		else {	
                _loader = <Loading module='Login'/>;
				this.tryLogin();				
			}		

        return (
                 <div className="l-view-outer">
		            <div className='m-login l-view'>
		            	{_view}
		            </div>
                    {_loader}
                </div>
		    	)
}

});