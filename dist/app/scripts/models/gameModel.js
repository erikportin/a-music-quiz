"use strict";function _containsId(a,b){for(var c=0;c<a.length;c++)if(a[c].id===b)return!0;return!1}function _getAllTracks(a){var b=Q.defer();return 0!==Object.keys(a._allTracks).length?b.resolve(a._allTracks):spotifyService.getTracks(a.playerId,a.playlistId).then(function(c){c?(a._allTracks=c,b.resolve(a._allTracks)):b.reject(new Error("unable to get playlist"))}),b.promise}function _isValidPlaylist(a){var b={},c=0;return a.forEach(function(a){b[a.artist.id]||(b[a.artist.id]=a.artist.id,c++)}),c>3}function _setCurrentRound(a,b,c){log("Game Model: _setCurrentRound"),log(a,b,c),a._currentOptionsIndex++;var d={current:b[a._currentOptionsIndex],options:[{id:b[a._currentOptionsIndex].artist.id,name:b[a._currentOptionsIndex].artist.name}]};for(d.current.index=a._currentOptionsIndex+1;d.options.length<4;){var e=Math.floor(Math.random()*b.length);_containsId(d.options,b[e].artist.id)||d.options.push({id:b[e].artist.id,name:b[e].artist.name})}d.options=Helpers.shuffle(d.options),a._currentRound=d,a._currentRound.index=a._currentOptionsIndex+1,a._currentRound.gameLength=c}var Game=function(a,b,c){var d=c||{};this.playlistId=b,this.playerId=a,this._gameLength=d.gameLength,this._points=0,this._currentOptionsIndex=-1,this._currentRound=[],this._allTracks={},this._isValidPlaylist=!0};Game.prototype.next=function(){var a=this,b=Q.defer();return _getAllTracks(a).then(function(c){if(a._isValidPlaylist||_isValidPlaylist(c)){var d=c.length;a._gameLength&&a._gameLength<=c.length&&(d=a._gameLength),a._currentOptionsIndex+1>=d?b.resolve(void 0):(_setCurrentRound(a,c,d),b.resolve(a._currentRound))}else a._isValidPlaylist=!1,b.reject(new Error("not valid playlist"))},function(a){b.reject(a)}),b.promise},Game.prototype.answer=function(a,b){var c=this,d=Q.defer(),e={isAnswerCorrect:!1,points:c._points};return _getAllTracks(c).then(function(f){f[c._currentOptionsIndex].artist.id===a&&(e={isAnswerCorrect:!0,points:parseInt(c._points)+parseInt(b)}),e.rightAnswer=f[c._currentOptionsIndex].artist.id,d.resolve(e)}),d.promise},Game.prototype.reset=function(){return this._gameLength,this._points=0,this._currentOptionsIndex=-1,this._currentRound=[],this._allTracks={},this};