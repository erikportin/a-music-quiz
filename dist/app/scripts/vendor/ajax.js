function ajax(a,b){var c=Q.defer();if(this.bindFunction=function(a,b){return function(){return a.apply(b,[b])}},this.stateChange=function(){401==this.request.status?c.reject(new Error(this.request.responseURL+" : "+this.request.statusText)):4==this.request.readyState&&200==this.request.status&&this.request.responseText&&c.resolve(JSON.parse(this.request.responseText))},this.getRequest=function(){return window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest?new XMLHttpRequest:!1},this.postBody=arguments[2]||"",this.url=a,this.request=this.getRequest(),this.request){var d=this.request;d.onreadystatechange=this.bindFunction(this.stateChange,this),d.open("GET",a,!0);for(var e in b.headers)d.setRequestHeader(e,b.headers[e]);d.send(this.postBody)}return c.promise}