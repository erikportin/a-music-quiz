"use strict";var AppView=React.createClass({displayName:"AppView",login:function(){$.ajax("api/login","").then(function(a){var b=a.redirect_url;document.getElementById("app")&&React.renderComponent(LoginLink({url:b}),document.getElementById("app"))},function(){console.error("Failed to login")})},startGame:function(a){var b=this;spotifyService.getUser(a).then(function(a){spotifyService.getPlaylists(a.id).then(function(a){var b=Helpers.getQueries(sessionStorage.getItem("amq-queries"));b.debug&&(Settings.debug=b.debug),React.renderComponent(PlaylistView({playlists:a}),document.getElementById("app"))}).fail(function(){})},function(){b.login()})},render:function(){var a=spotifyService.getTokens(window.location.search);return a.accessToken&&a.refreshToken?(log("AppView: start game"),this.startGame(a.accessToken)):(console.log(window.location.search),sessionStorage.setItem("amq-queries",window.location.search),this.login()),React.DOM.div({className:"m-app-loading"},"loading")}});