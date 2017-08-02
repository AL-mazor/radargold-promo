function isValidEmailAddress(i){return new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(i)}$(function(){$input=$(".input-field-validation").find("input"),$input.keyup(function(){$this=$(this);var i=$this.val();$inputCheck=$this.siblings(".input-field--check"),0!=i?isValidEmailAddress(i)?$inputCheck.css({"background-image":"url('img/check-ok.svg')"}):$inputCheck.css({"background-image":"url('img/check-error.svg')"}):$inputCheck.css({"background-image":"none"})}),$("form").each(function(){$(this).validate({ignore:".ignore",rules:{name:"required",email:{required:!0,email:!0}},showErrors:function(){return!1},submitHandler:function(i){$("html").css("cursor","wait"),$(this).find(".btn-submit").prop("disabled",!0),$.ajax({url:i.action,type:i.method,data:$(this).serialize(),contentType:!1,processData:!1,success:function(){console.log("sent"),$("html").css("cursor","default"),$(this).find(".btn-submit").prop("disabled",!1)},error:function(){$("html").css("cursor","default"),$("#submit-btn").prop("disabled",!1),alert("Doesn't send")}})}})})});
$(function(){function o(){$topOffset=$(window).scrollTop(),$topOffset>winHeight&&$scrollTop.fadeIn("300")}function n(){$scrollTop.fadeOut("300")}function t(o){pos=o;for(i in u)pos>=u[i].from&&pos<u[i].to&&("move"==u[i].action?e(u[i].direction,u[i].speed):c())}function e(o,n){$ctnr[0].direction!=o&&(c(),$ctnr[0].direction=o,$ctnr[0].isChanging=!0,r()),$ctnr[0].speed!=n&&($ctnr[0].speed=n)}function c(){$ctnr[0].isChanging&&($ctnr[0].isChanging=!1,$ctnr[0].direction=0,$ctnr[0].speed=1,clearTimeout($ctnr[0].timer))}function r(){0!=$ctnr[0].isChanging&&($listctnr[0].scrollLeft+=$ctnr[0].direction*$ctnr[0].speed,$ctnr[0].timer=setTimeout(function(){r()},50))}function p(o){n(),$popUpOverlay.fadeIn("200"),o.addClass("pop-up-active pop-up-bounceIn").show(),o.one(d,function(){o.removeClass("pop-up-bounceIn")})}function s(n){console.log(n),n.removeClass("pop-up-active"),n.addClass("pop-up-bounceOut"),n.one(d,function(){n.removeClass("pop-up-bounceOut").hide()}),$popUpOverlay.fadeOut("500"),o()}$popUpPromo=$(".pop-up-promo"),$popUpSubscribe=$(".pop-up-subscribe"),$popUpOverlay=$(".pop-up-overlay");var d=function(){var o,n=document.createElement("fakeelement"),t={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(o in t)if(void 0!==n.style[o])return t[o]}();$(".btn-popup-promo").click(function(o){p($popUpPromo)}),$(".btn-popup-subscribe").click(function(o){p($popUpSubscribe)}),$(".pop-up--close").click(function(o){s($(".pop-up-active"))}),$(".scroll-top").click(function(o){$("html, body").animate({scrollTop:$("body").offset().top},800)}),$scrollTop=$(".scroll-top"),winHeight=$(window).height(),$(window).resize(function(o){winHeight=$(window).height(),console.log(winHeight)}),$(window).on("scroll",function(){$topOffset=$(window).scrollTop(),"block"==!$(".pop-up").css("display")&&($topOffset>winHeight?o():n())});var l=0;$listctnr=$(".platform-row"),$ctnr=$(".platform-container"),$ctnr.children().each(function(){l+=$(this).outerWidth(!0)}),$ctnr.width(l);var a=($ctnr.width()-$listctnr.width())/2;$(window).resize(function(o){var n=($ctnr.width()-$listctnr.width())/2;$listctnr.scrollLeft(n)}),$listctnr.scrollLeft(a);var f=$listctnr.width(),u={1:{action:"move",from:0,to:.06*f,direction:-1,speed:32},2:{action:"move",from:.06*f,to:.1*f,direction:-1,speed:28},3:{action:"move",from:.1*f,to:.2*f,direction:-1,speed:28},4:{action:"move",from:.2*f,to:.25*f,direction:-1,speed:28},5:{action:"stop",from:.25*f,to:.75*f},6:{action:"move",from:.75*f,to:.8*f,direction:1,speed:28},7:{action:"move",from:.8*f,to:.85*f,direction:1,speed:28},8:{action:"move",from:.85*f,to:.94*f,direction:1,speed:28},9:{action:"move",from:.94*f,to:f,direction:1,speed:32}};$ctnr[0].isChanging=!1,$ctnr[0].direction=0,$ctnr[0].speed=1,$listctnr.mousemove(function(o){t(o.pageX)}),$listctnr.bind("mouseleave",function(){c()})}),window.innerWidth>=991&&$(function(){new WOW({offset:200,mobile:!0}).init()});