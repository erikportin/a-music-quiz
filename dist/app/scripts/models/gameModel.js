"use strict";function _containsId(a,b){for(var c=0;c<a.length;c++)if(a[c].id===b)return!0;return!1}function _getAllTracks(a){var b=Q.defer();return 0!==Object.keys(a._allTracks).length?b.resolve(a._allTracks):spotifyService.getTracks(a.playlistOwner,a.playlistId).then(function(c){c?(a._allTracks=c.tracks,b.resolve(a._allTracks)):b.reject(new Error("unable to get playlist"))},function(){console.error("error getTracks")}),b.promise}function _isValidPlaylist(a){var b={},c=0;return a.forEach(function(a){b[a.artist.id]||(b[a.artist.id]=a.artist.id,c++)}),c>3}function _setCurrentRound(a,b,c){log("Game Model: _setCurrentRound"),log(a,b,c),a._currentOptionsIndex++;var d={current:b[a._currentOptionsIndex],options:[{id:b[a._currentOptionsIndex].artist.id,name:b[a._currentOptionsIndex].artist.name}]};for(d.current.index=a._currentOptionsIndex+1;d.options.length<4;){var e=Math.floor(Math.random()*b.length);_containsId(d.options,b[e].artist.id)||d.options.push({id:b[e].artist.id,name:b[e].artist.name})}d.options=Helpers.shuffle(d.options),a.round=d,a.round.index=a._currentOptionsIndex+1,a.gameLength=c}var Game=function(a,b,c){var d=c||{};this.playlistId=b,this.playlistOwner=a,this.history=[],this.round=[],this.points=0,this.gameLength=d.gameLength,this.isGameOver=!1,this._currentOptionsIndex=-1,this._allTracks={},this._isValidPlaylist=!0};Game.prototype.next=function(){var a=this,b=Q.defer();return _getAllTracks(a).then(function(c){if(_isValidPlaylist(c)){var d=c.length;a.gameLength<=c.length&&(d=a.gameLength),a._currentOptionsIndex>=d-1?(a.isGameOver=!0,b.resolve(a)):(_setCurrentRound(a,c,d),b.resolve(a))}else a._isValidPlaylist=!1,b.reject(new Error("not valid playlist"))},function(a){b.reject(a)}),b.promise},Game.prototype.answer=function(a,b){log("Game Model: answer"),log(a);var c=this,d=Q.defer(),e={},f={isAnswerCorrect:!1,points:c.points};return _getAllTracks(c).then(function(g){g[c._currentOptionsIndex].artist.id===a?(c.points+=parseInt(b),e={rightAnswer:!0,points:b},f={isAnswerCorrect:!0,points:c.points}):e={rightAnswer:!1,points:0},e.data=g[c._currentOptionsIndex],e.answer=a,c.history.push(e),f.rightAnswer=g[c._currentOptionsIndex].artist.id,d.resolve(c)}),d.promise},Game.prototype.reset=function(){return log("Game Model: reset"),this.history=[],this.round=[],this.points=0,this.isGameOver=!1,this._currentOptionsIndex=-1,this._allTracks={},this._isValidPlaylist=!0,this};