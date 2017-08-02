$(function() {
	$popUpPromo = $('.pop-up-promo');
	$popUpSubscribe = $('.pop-up-subscribe');
	$popUpOverlay = $('.pop-up-overlay');
	var animationEvent = whichAnimationEvent();

	$('.btn-popup-promo').click(function(event) {
		showPopUp($popUpPromo);
	});

	$('.btn-popup-subscribe').click(function(event) {
		showPopUp($popUpSubscribe);
	});
	
	//Close Pop Up
	$('.pop-up--close').click(function(event) {
		//$popUp = $(this).siblings('.pop-up');
		hidePopUp($('.pop-up-active'));
	});

	// Scroll Top Button
	$('.scroll-top').click(function(e) {
		$('html, body').animate({scrollTop: $('body').offset().top}, 800);
	});

	$scrollTop = $('.scroll-top');
	winHeight = $(window).height();

	$(window).resize(function(e) {
		winHeight = $(window).height();
		console.log(winHeight);
	});

	$(window).on('scroll', function() {		
		$topOffset = $(window).scrollTop();

		// Animate scroll btn on window scroll
		if (!$('.pop-up').css('display') == 'block') {
			if($topOffset > winHeight) {
				showScrollBtn();
			} else {
				hideScrollBtn();
			}
		}
	});

	// Scroll Top Btn animate
	function showScrollBtn() {
		$topOffset = $(window).scrollTop();
		if($topOffset > winHeight) {
			$scrollTop.fadeIn('300');
		}
	}

	function hideScrollBtn() {
		$scrollTop.fadeOut('300');
	}

	//var scrollPosition = ($('.platform-container').width() - $('.rating').width()) / 2;
	//console.log($('.platform-row').outerWidth());

	
	var size = 0;
	$listctnr = $('.platform-row');
	$ctnr = $('.platform-container');

	$ctnr.children().each(function() {
		size += $(this).outerWidth(true);
	});
	$ctnr.width(size);

	// Set scroll position to center
	var scrollPosition = ($ctnr.width() - $listctnr.width()) / 2;
	$(window).resize(function(e) {
		var scrollPosition = ($ctnr.width() - $listctnr.width()) / 2;
		$listctnr.scrollLeft(scrollPosition);	
	});

	// Disable mousewheel on container
	// $listctnr.bind('mousewheel', function () {
	// 	return false;
	// })

	$listctnr.scrollLeft(scrollPosition);	
	//console.log(scrollPosition);

	var listsize = $listctnr.width();
	// Define hover zones on container
	var zone = {
		1: {action: 'move', from: 0, to: 0.06 * listsize, direction: -1 , speed: 32},
		2: {action: 'move', from: 0.06 * listsize, to: 0.1 * listsize, direction: -1 , speed: 28},
		3: {action: 'move', from: 0.1 * listsize, to: 0.2 * listsize, direction: -1 , speed: 28},
		4: {action: 'move', from: 0.2 * listsize, to: 0.25 * listsize, direction: -1 , speed: 28},
		5: {action: 'stop', from: 0.25 * listsize, to: 0.75 * listsize},
		6: {action: 'move', from: 0.75 * listsize, to: 0.8 * listsize, direction: 1 , speed: 28},
		7: {action: 'move', from: 0.8 * listsize, to: 0.85 * listsize, direction: 1 , speed: 28},
		8: {action: 'move', from: 0.85 * listsize, to: 0.94 * listsize, direction: 1 , speed: 28},
		9: {action: 'move', from: 0.94 * listsize, to: listsize, direction: 1 , speed: 32}
	}
	// Store default state values in container
	$ctnr[0].isChanging = false;
	$ctnr[0].direction  = 0;
	$ctnr[0].speed      = 1;

	$listctnr.mousemove(function(e) {
		checkMouse(e.pageX);
	});
	$listctnr.bind('mouseleave', function () {
		stopMoving();
	});

	


	function checkMouse(x) {
		pos = x;

		for (i in zone) {
			if (pos >= zone[i].from && pos < zone[i].to) {
				if (zone[i].action == 'move') {startMoving(zone[i].direction, zone[i].speed);}
				else {stopMoving();}
			}
		}
	}

	/**
		 * Start scrolling the list with a given speed and direction
		 *
		 * @param direction {Integer}	Direction of the displacement, either -1|1
		 * @param speed {Integer}		Speed of the displacement (20 being very fast)
		 */
	function startMoving(direction, speed) {
		if ($ctnr[0].direction != direction) {
			stopMoving();
			$ctnr[0].direction  = direction;
			$ctnr[0].isChanging = true;
			move();
		}
		if ($ctnr[0].speed != speed) {
			$ctnr[0].speed = speed;
		}
	}

	function stopMoving() {
		if ($ctnr[0].isChanging) {
			$ctnr[0].isChanging = false;
			$ctnr[0].direction  = 0;
			$ctnr[0].speed      = 1;
			clearTimeout($ctnr[0].timer);
		}
	}

	function move() {
		if ($ctnr[0].isChanging == false) {return;}
		
		// var scrollSide;
		// if (!params.vertical) {scrollSide = 'scrollLeft';}
		// else {scrollSide = 'scrollTop';}
		
		$listctnr[0]['scrollLeft'] += $ctnr[0].direction * $ctnr[0].speed;
		$ctnr[0].timer = setTimeout(function() {move();}, 50);
	}

	// Function from David Walsh: http://davidwalsh.name/css-animation-callback
	function whichAnimationEvent(){
	  var t,
	      el = document.createElement("fakeelement");

	  var animations = {
	    "animation"      : "animationend",
	    "OAnimation"     : "oAnimationEnd",
	    "MozAnimation"   : "animationend",
	    "WebkitAnimation": "webkitAnimationEnd"
	  }

	  for (t in animations){
	    if (el.style[t] !== undefined){
	      return animations[t];
	    }
	  }
	}

	// Pop up animation
	function showPopUp(popUp) {
		hideScrollBtn();
		$popUpOverlay.fadeIn('200');
		//$.merge(popUp, $popUpOverlay).on('mousewheel', function() {return false;})
		popUp.addClass('pop-up-active pop-up-bounceIn').show();
		popUp.one(animationEvent, function () {
			popUp.removeClass('pop-up-bounceIn');
		});
	}

	function hidePopUp(popUp) {
		console.log(popUp);
		popUp.removeClass('pop-up-active');
		popUp.addClass('pop-up-bounceOut');
		popUp.one(animationEvent, function () {
			popUp.removeClass('pop-up-bounceOut').hide();
		});
		$popUpOverlay.fadeOut('500');
		showScrollBtn();
	}

});

if (window.innerWidth >= 991) {
	$(function () {
	new WOW({
	  offset:       200,          
	  mobile:       true      
	}).init();
	});
};