"use strict";var Progress=React.createClass({displayName:"Progress",render:function(){for(var a=[],b="m-progress-item ",c="",d=1;d<this.props.gameLength+1;d++)c=d==this.props.current?"is-active":"",a.push(React.DOM.li({className:b+c,key:d},d));return React.DOM.ul({className:"m-progress"},a)}});