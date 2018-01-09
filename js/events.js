/*
v1.1
Handles events from desktop browers, ipad, and <ie8
use events.handler(event_name, function) to attach event
*/

(function() {
	window.events = {

		init : function(){
			events.platform = null;
			
			events.get.platform();
			events.set.touch_events();
		},
		
		events : {
			touch : {
				start : 'touchstart',
				end : 'touchend',
				move : 'touchmove',
				enter : 'touchenter',
				leave : 'touchleave'
			},
			
			ie : {
				start : 'onmousedown',
				end : 'onmouseup',
				move : 'onmousemove',
				enter : 'onmouseover',
				leave : 'onmouseout'
			}
		},
		
		touch_event : {
				start : 'mousedown',
				end : 'mouseup',
				move : 'mousemove',
				enter : 'mouseover',
				leave : 'mouseout'
		},
		
		handler : function(event_name, _function, obj) {
			if(obj == null){ obj = document; }
			if(obj.addEventListener){ obj.addEventListener(event_name, _function); }
			else{ obj.attachEvent(event_name, _function); }
		},
		
		get : {
			platform : function() {
				if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Windows Phone/i)) {
					events.get.touch = function(e){ return ({ x : e.changedTouches[0].pageX, y : e.changedTouches[0].pageY, offsetX : e.offsetX || e.layerX, offsetY : e.offsetY || e.layerY  }); };
					events.platform = 'mobile';
				}
				else if (navigator.userAgent.indexOf('iPad') != -1) { 
					events.get.touch = function(e){ return ({ x : e.changedTouches[0].pageX, y : e.changedTouches[0].pageY, offsetX : e.layerX, offsetY : e.layerY }); };
					events.platform = 'ipad'; 
				}
				else if (window.attachEvent && !window.addEventListener) {
					events.get.touch = function(e){ return ({ x : e.clientX, y : e.clientY, offsetX : e.offsetX, offsetY : e.offsetY  }); };
					events.platform = 'desktop'; 
				}
				else { 
					events.get.touch = function(e){ return ({ x : e.pageX, y : e.pageY, offsetX : e.offsetX || e.layerX, offsetY : e.offsetY || e.layerY  }); };
					events.platform = 'desktop'; 
				}
			},
			
			touch : function(e) {
				/* THIS FUNCTION IS SET BY get.platform() */
			}
		},
		
		set : {
			touch_events : function() {
				if (events.platform == 'ipad' || events.platform == 'mobile') {
					events.touch_event = events.events.touch;
				}
				else if (window.attachEvent && !window.addEventListener) {
					events.touch_event = events.events.shit_ie;
				}
			}
		}
	}

	events.init();

})();