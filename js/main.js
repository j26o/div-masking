/*
 * Frame by Frame Animation - jQuery plugin
 *
 * Copyright (c) 2010-2012 Roland Baldovino
 *
 * Project home:
 *   https://github.com/junebaldovino/frame-animation.git
 *
 * Version:  0.1.2
 *
 */

(function($){
	var settings = {
      sliderclass: 		'slider',
      imgclass1: 	'before',
      imgclass2: 	'after',
      container1: 	null,
      container2: 	null,
      slider: 		null,
      startpoint: 	.5
    };
    var _this, container;
	var methods = {
		init : function( options ) {
			return this.each(function(){
			 
			 _this = $(this);
			 container = $('<div />')
			 var $this = $(this),
			     data = $this.data('maskreveal');
			     $this.append(container);
			    
			     settings.container1 = $this.find('.'+settings.imgclass1).eq(0);
			     settings.container2 = $this.find('.'+settings.imgclass2).eq(0);
			     settings.slider = $this.find('.'+settings.sliderclass).eq(0);

			     container.css({height:settings.container1.height(), width:settings.container1.width(), overflow: 'hidden', 'z-index':0, position:'relative'}).append(settings.container1).append(settings.container2);

			     $this.css({height:settings.container1.height(), width:settings.container1.width()});
			     
			     var px = settings.container1.width()*settings.startpoint;

			     settings.slider.css({
			     	position: 	'absolute', 
			     	'z-index': 	'2',
			     	bottom: 	-settings.slider.height()/2,
			     	left: 		px - settings.slider.width()*.5,
			     	'-webkit-touch-callout': 'none',
					'-webkit-user-select': 'none',
					'-khtml-user-select': 'none',
					'-moz-user-select': 'none',
					'-ms-user-select': 'none',
					'user-select': 'none'
			     });

			     settings.container1.css({'z-index':1, overflow: 'hidden', position: 'absolute', width: px});
			     settings.container2.css({'z-index':0, overflow: 'hidden', position: 'absolute'});

			     methods.addListeners();
			 
			 if (!data) {
			   $(this).data('maskreveal', {
			       target : $this,
			       container: container,
			       px: 		px
			   });
			 }
			});
		},
		addListeners : function(){
			settings.slider.bind({
				'mousedown': function() {
					$('body').bind({
						'mousemove.maskreveal': function(e){methods.onMove(e)},
						'mouseup.maskreveal'  : function(e){$('body').unbind('mousemove.maskreveal');}
					});
				}
			});
		},
		onMove : function(e){
			var px = e.pageX-_this.offset().left;

			if(px < 0) px = 0;
			if(px > _this.width()) px = _this.width();

			_this.data().maskreveal.px = px;
			settings.slider.css({
		     	bottom: 	-settings.slider.height()/2,
		     	left: 		px - settings.slider.width()*.5
		     });
			settings.container1.css({width: px});
		},
		destroy : function( ) {

			return this.each(function(){

				var $this = $(this),
				    data = $this.data('maskreveal');

				$(window).unbind('.maskreveal');
				data.maskreveal.remove();
				$this.removeData('maskreveal');
			});

		},
		reposition : function( ) {  },
		show : function( ) { },
		hide : function( ) {  },
		update : function( content ) { }
	};

	$.fn.maskreveal = function(method) {
		if ( methods[method] ) {
		  	return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || ! method) {
		  	return methods.init.apply(this, arguments);
		} else {
		  	$.error('Method ' +  method + ' does not exist on jQuery.maskreveal');
		}
	};

})( jQuery );