/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

$(document).ready(function(){
   if($.browser.msie) {
    try {
      document.execCommand('BackgroundImageCache', false, true);
    } catch(e) {}
   }  
function photogallery(rootElem){
	var me=this;
	var nav=rootElem.find('.b-gallery-nav a');
	var imgCol=nav.length;
	var globalSrc=new Array(imgCol);
    var auto,timer;
	var controls={
		leftCont:rootElem.find('.b-l-control'),
		rightCont:rootElem.find('.b-r-control')
	}
	var speed=400;
	var imgContainer=rootElem.find('.b-photogallery-big-inner'),
		currentImage=imgContainer.find('img'),
		containerWidth=imgContainer.width();
	var inMotion=false,
		currentSlide=0,
		leftPos=0;
	
	function motion(direction) {
		if (inMotion) return false;
		inMotion=true;
		var fakeImg= $('<img src="" alt="">');
		
		if (direction==1) {
			currentSlide++;
			if (currentSlide==imgCol) currentSlide=0;
			fakeImg.css({left:containerWidth-1,top:0});
			leftPos=-containerWidth;
		}
		else {
			currentSlide--;
			if (currentSlide<0) currentSlide=imgCol-1;
			fakeImg.css({left:-containerWidth,top:0});
			leftPos=containerWidth;
		}
		
		imgContainer.append(fakeImg);
		fakeImg.load(function(){
		
			fakeImg.animate({left:0},speed);

			currentImage.animate({left:leftPos+'px'},speed,function(){
					currentImage.remove();
					currentImage=imgContainer.find('img');
					inMotion=false;
                    if (auto) {
                      timer=setTimeout(function(){motion(1);},3000);
                    }
				});
			
		});
		fakeImg.attr('src',nav.eq(currentSlide).attr('href'));
		
	}
	controls.leftCont.click(function(){
        clearTimeout(timer);
        auto=false;
		motion(-1);
	});
	controls.rightCont.click(function(){
        clearTimeout(timer);
        auto=false;
		motion(1);
	});
    timer=setTimeout(function(){motion(1);auto=true;},2000);
}
if ($('.b-photogallery-big').length){
	var g=new photogallery($('.b-photogallery-big'));
	}
function gallery(elem) {
	var me=this;
	me.opts={
		direction:1,
		acceleration:3,
		stepNumber:0
	}
	var galleryTape=$('.b-small-gallery');
	me.root=$(elem).eq('0');

	me.toLeft=galleryTape.find('.b-l-control');

	me.toRight=galleryTape.find('.b-r-control');

	var v=$('.b-small-gallery-inner')[0];
	
	v.scrollLeft=0;

	if (v.scrollLeft==0) {
		me.toLeft.addClass('b-l-control-nonactive');
	}

	var l=$('.b-small-gallery-wrap').find('li').length;
    me.opts.step=$('.b-small-gallery-wrap').find('li').width();

    if(v.offsetWidth>me.opts.step*l){
		me.toRight.addClass('b-r-control-nonactive');
		me.toLeft.addClass('b-l-control-nonactive');
        
	};
    
	this.toLeft.click(
	function(){
        
		me.opts.direction=1;
		motion(me.root);
	});
	this.toRight.click(
	function(){
		me.opts.direction=-1;
		motion(me.root);
	});

	var i=0,j=0;
	function motion(e){
       var to;
		if (me.opts.direction==1) {
            to=v.scrollLeft-me.opts.step;
			if (v.scrollLeft==0) {
				me.toLeft.addClass('b-l-control-nonactive');
				i=0;
			}
			else {
				if (i==0) {
					me.toRight.removeClass('b-r-control-nonactive');
					i=1;
					j=0;
				}
			}
		}
		else {
            to=v.scrollLeft+me.opts.step;
			if (v.scrollLeft==v.scrollWidth-v.offsetWidth) {
				me.toRight.addClass('b-r-control-nonactive');
				j=0;
			}
			else {
				if (j==0) {
					me.toLeft.removeClass('b-l-control-nonactive');
					j=1;
					i=0;
				}
			}
		}

        $('.b-small-gallery-inner')
        .stop()
        .animate({scrollLeft: to}, 300,check);
	}
    function check() {
       if (v.scrollLeft==0) {
				me.toLeft.addClass('b-l-control-nonactive');
       }
       if (v.scrollLeft==v.scrollWidth-v.offsetWidth) {
				me.toRight.addClass('b-r-control-nonactive');
       }
    }
}
if ($('.b-small-gallery').length) {
    var g=new gallery('.b-small-gallery-inner');
    }
if ($('.lightbox').length) {
    $('.lightbox').lightbox({fitToScreen: false});
	}
$(function($) {
	$('a[class=external]').click(function(){
	window.open(this.href);
	return false;
	}); 
});
$('.b-trigger-test').click(function(){
	if ($('#test-block').is(':visible')) {
		$('#test-block').slideUp(400)
	}
	else {
		$('#test-block').slideDown(400)
	}
	return false;
});
$('.b-hidden-container input').change(function(){
if ($(this).is(":radio")) {

	if ((!$(this).hasClass('b-hidden-trigger'))) {
		$(this).parents('.b-hidden-container').find('.b-hidden-cont').hide();
		$(this).parents('.b-hidden-container').find('.b-hidden-cont textarea').val('');
	} 
	else {
	$(this).parents('.b-hidden-container').find('.b-hidden-cont').show();
	}
	}
	if ($(this).is(":checkbox")&&($(this).hasClass('b-hidden-trigger'))) {
		if ($(this).is(":checked")) {
			$(this).parents('.b-hidden-container').find('.b-hidden-cont').show();
		}
		else {
			$(this).parents('.b-hidden-container').find('.b-hidden-cont').hide();
			$(this).parents('.b-hidden-container').find('.b-hidden-cont textarea').val('');
		}
	}
});
$('.b-poll-popup .b-close').click(function(){
	$(this).parents('.b-poll-popup').hide()
})


$('#poll').submit(function(){
	var action='http://www.sunpan.ru/js/'+$(this).attr('action');
	var me=$(this);
		//var data=me.serialize();
	
    var data={}
    data['text']='';
    $('#poll').find('.b-poll-item-inner').each(function(i){
		
		var me=$(this),meIn;
		data[i]='';
		$(this).parent().find('input,textarea').each(function(){
			meIn=$(this);
			
			
			if ($(this).attr('type') == 'radio'){
				if ($(this).attr('checked')){
				
					data[i] += $(this).val()+'|';
					
				}
				

			}		
			else if ($(this).attr('type') == 'checkbox'){
				if ($(this).attr('checked')){
				data[i] += $(this).val()+'|';
				}			
			}
			else{
				if ($(this).val()!='')
				data[i] += $(this).val()+'*p|';			
			}
			
		})
		data['text']+=me.text()+'|';
			
		});
		
    
	//$(this).ajaxSubmit({url:action});
    $.get(action,data,function(d){
		$('#poll').remove();
		
		$('.b-poll-popup').append('<div class="b-poll-popup-thanks">Спасибо за ваш отзыв!</div>');
		coord($('.b-poll-popup'));
		$('.b-poll-trigger').slideUp(300);
        setTimeout(function(){$('.b-poll-popup').fadeOut(500);},2000);
        
        
		return false;
        });
	return false;
	});
	$('.b-poll-trigger a').click(function(){
		$('.b-poll-popup').show().css({visibility:'hidden'});
		coord($('.b-poll-popup'));
		
	});
	function coord(popup){
		var coordTop= $(window).height()/2-popup.height()/2;
		popup.css({top:coordTop,visibility:'visible'});
	}
	
	
});

