"use strict";var Share=React.createClass({displayName:"Share",componentDidMount:function(){log("Share: componentDidMount"),window.twttr=function(a,b,c){var d,e,f=a.getElementsByTagName(b)[0];if(!a.getElementById(c))return e=a.createElement(b),e.id=c,e.src="https://platform.twitter.com/widgets.js",f.parentNode.insertBefore(e,f),window.twttr||(d={_e:[],ready:function(a){d._e.push(a)}})}(document,"script","twitter-wjs")},render:function(){log("Share: render");var a=this.props.share.text||"Play a Music Quiz";return React.DOM.div({className:"m-share l-view"},React.DOM.div({className:"m-share-inner"},React.DOM.h1(null,"Share"),React.DOM.div({className:"m-share-tweet"},React.DOM.a({className:"twitter-share-button","data-url":this.props.share.url,"data-text":a,"data-hashtags":"aMusicQuiz","data-size":"large","data-count":"none",href:"https://twitter.com/share"}," Tweet ")),React.DOM.p(null,"or copy this url"),React.DOM.p({className:"m-share-link-wrapper"},React.DOM.a({href:this.props.share.url,target:"_blank",className:"m-share-link"},this.props.share.url)),React.DOM.button({className:"m-share-close-btn",onClick:this.props.onResetShare},"Close")))}});