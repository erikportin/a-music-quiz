var RoundOption=React.createClass({displayName:"RoundOption",handleClick:function(){var a=this;a.props.onUserAnswer(a.getDOMNode().value)},render:function(){var a="";return this.props.answer==this.props.option.id&&(a+="is-selected"),React.DOM.button({disabled:this.props.answer,value:this.props.option.id,className:a,onClick:this.handleClick},this.props.option.name)}});