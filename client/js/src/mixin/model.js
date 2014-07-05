var challenge = challenge || {};

challenge.modelmixin = (function () {
  "use strict";

  return {
    on  : function(event, fct){
      this._events = this._events || {};
      this._events[event] = this._events[event] || [];
      this._events[event].push(fct);
    },
    off  : function(event, fct){
      this._events = this._events || {};
      if( event in this._events === false  )  return;
      this._events[event].splice(this._events[event].indexOf(fct), 1);
    },
    trigger : function(event /*, args */){
      this._events = this._events || {};
      if( event in this._events === false  )  return;
      for(var i = 0; i < this._events[event].length; i++){
        this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    },
    set: function (key, value) {

      this._attributes = this._attributes || {};
      if (this._attributes[key] === value) {
        return;
      }

      var oldval = this._attributes[key];

      this._attributes[key] = value;
      this.trigger('change', this, key, value, oldval);
      this.trigger('change:' + key, this, key, value, oldval);
    },
    get: function (key) {
      this._attributes = this._attributes || {};
      return this._attributes[key];
    }
  };

}());