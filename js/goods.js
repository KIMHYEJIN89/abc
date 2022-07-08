if(typeof isNotNativeDetail === 'undefined') { isNotNativeDetail = true; }
/* 제품 명 두줄 이상일 경우 말 줄임 및 펼쳐보기 */
function pdName(_this) {
	var $this = $(_this),
	thisH = $this.height();

	if (thisH > 42) $this.addClass('short');

	$this.on('click',function(){
		if ($this.hasClass('short')) $this.toggleClass('open');
	});
}
/* 상품상세정보 높이 체크*/
function pdDetailView() {
	var wrap = $('.img_statem'),
		btnMore = $('.pd_info_more button');
	
	if(wrap.height() > 2500) wrap.addClass('short');

	btnMore.on('click',function(){
		wrap.removeClass('short');
	});
	
	$('#zoomWrap').find('.img_statem').removeClass('img_statem');
	$('#zoomWrap').find('.short').removeClass('short');
}
// 안드로이드 앱인 경우 앱에서 합수 호출시 탭 설정
function nativeAosDetailCalMargin(topSpace) {
	$('body').css({'padding-top': topSpace +'px'});
	$(window).trigger('resize');
}
/* 상품상세 탭 */
function detailTab(ele) {
	var tab = $(ele);
	if(tab.length) {
		var tabMenu = tab.find('.pd_detail_tab a'),
			tabTop = tab.offset().top, 
			headerH = $('#header').height(),
			pdDetailWrap = $('.img_statem'),
			scaleNotice = tab.find('.layer_scale_notice'),
			onState,
			isDetailApp = false;
		if(typeof isNativeDetail != "undefined" && isNativeDetail) {
			isDetailApp = true;
			tabTop -= 48;
			if(tabTop < 0) tabTop = 0;
		}

		pdDetailView();
		
		$('.ac_tit').click(function(){
			setTimeout(function(){
				tabTop = tab.offset().top;
				if(isDetailApp) {
					tabTop -= 48;
					if(tabTop < 0) tabTop = 0;
				}
			},200);
		});
		
		tabMenu.on('click',function(){
			if(tab.hasClass('fixed')){
				$('html, body').scrollTop(tabTop - (isDetailApp? 0 : 45));
			}
			return false;
		});

		scaleNotice.on('click',function(){
			scaleNotice.hide();
		});
		$(window).on({
			scroll : function(){
				var scrollTop = $(window).scrollTop(),
					pos = headerH + scrollTop;
				if (tabTop < pos && pdDetailWrap.length) {
					tab.addClass('fixed');
					if (onState !== 'on' && scrollTop > pdDetailWrap.offset().top && scrollTop < tabTop + pdDetailWrap.height()) {
						scaleNotice.show();
						setTimeout(function(){
							scaleNotice.fadeOut('3000');
							onState = 'on';
						},3000);
					} else {
						scaleNotice.fadeOut('3000');
					}
				} else {
					tab.removeClass('fixed');
					// 확대보기안내 레이어 체크 onState = '';

				}
			},
			resize : function(){
				if(!tab.parent().hasClass('fixed')){
					tabTop = tab.offset().top;
					if(isDetailApp) {
						tabTop -= 48;
						if(tabTop < 0) tabTop = 0;
					}
				}
			}
		});

		// $("#noInterestCard .close, #moreBenefit .close").click(function(){
		// 	setTimeout(function(){
		// 		tab.removeClass('fixed');
		// 	},300);
		// });
		
	}
}

/* 페이지 내 스크롤 이동 */
function pageGo(id) {
	var target = $('#' + id);
		targetTop = target.offset().top,
		headerH = 0, tabH = 0;
		
	if($('.pd_detail_tab').length) {
		tabH = $('.pd_detail_tab').height(); 
	}
	if($('#header').length) {
		headerH = $('#header').height();
	}
	$('html, body').animate({'scrollTop':targetTop - headerH - tabH},200,function(){
		if(id !== 'qna_content') {
			target.find('.ac_tit').addClass('on').next().addClass('on');
		}
	});
}

/* 픽업 지점 찾기 */
function pickUp(ele) {
	var pickUpWrap = $(ele),
		sel = pickUpWrap.find('select'),
		btn = pickUpWrap.find('.btn_area [class*="btn_"]'),
		selLeng = sel.length, 
		selChk = 0;
	
	if(!sel.eq(0).parent().attr('data-default')){
		if(selLeng === 1) {
			btn.removeClass('dim').addClass('c2').prop('disabled', false);
		} else {
			selChk = 1;	
		}
	}
	
	sel.on('change', function(){
		var $this = $(this);
		selChk = $this.closest('li').index() + 1;
		
		if(selChk >= selLeng) {
			btn.removeClass('dim').addClass('c2').prop('disabled', false);
		}
	});
}

var showTipAr = getCookie( 's_tooltip_ar' );
if( showTipAr !== 'n' ) { // 쿠키가 없는 경우
	var $tipAr;
	$( window ).on( 'load', function() {
		if($('.badge_ar').length){
			$tipAr = $('.badge_tooltip_ar').removeClass( 'hide' ); // 툴팁 화면에 표시
			setTimeout( hideBadgeTooltipAr, 4000 ); // 페이지 로딩후 4초가 지나면 툴팁 가림
		}
	});
	function hideBadgeTooltipAr( todayNotShow ) { // 티처시 툴팁 가리기
		if( !$tipAr.hasClass('hide') ) { $tipAr.addClass('hide'); }

		if( todayNotShow ) { // 오늘 하루 보지 않음
			setCookie( 's_tooltip_ar', 'n', 1 );
		}
	}
}

var showTipReal = getCookie( 's_tooltip_real' );
if( showTipReal !== 'n' ) { // 쿠키가 없는 경우
	var $tipReal;
	$( window ).on( 'load', function() {
		if($('.badge_real').length){
			$tipReal = $('.badge_tooltip_real').removeClass( 'hide' ); // 툴팁 화면에 표시
			setTimeout( hideBadgeTooltipReal, 4000 ); // 페이지 로딩후 4초가 지나면 툴팁 가림
		}
	});
	function hideBadgeTooltipReal( todayNotShow ) { // 티처시 툴팁 가리기
		if( !$tipReal.hasClass('hide') ) { $tipReal.addClass('hide'); }

		if( todayNotShow ) { // 오늘 하루 보지 않음
			setCookie( 's_tooltip_Real', 'n', 1 );
		}
	}
}

var talkDatePos = [];
var posSet = function(ele) {
	var listWrap = $('.' + ele),
		items = listWrap.find('.item');
	talkDatePos = [];
	
	items.each(function(){
		var $this = $(this),
			pos = $this.position().left;
		talkDatePos.push(pos);
	});
}
var dateSel = function(_this) {
	var $this = $(_this),
		wrap = $this.closest('.talk_date'), 
		parent = $this.parent(),
		idx = parent.index();
	
	parent.addClass('active').siblings().removeClass('active');

	wrap.stop().animate({scrollLeft : talkDatePos[idx]},200);
}
var reivewSort = function(_this) {
	var $this = $(_this);
	$this.addClass('active').siblings().removeClass('active');
}
var reviewSwiper;
function reviewSlide() {
	if (reviewSwiper) reviewSwiper.destroy();
	$('.review_wrap .swiper').each(function(idx,ele){
		var $this = $(this)
		$this.addClass('swiper'+idx);
		reviewSwiper = new Swiper('.review_wrap .swiper'+idx, {
			wrapperClass: 'swiper_wrap',
			slideClass: 'swiper_slide',
			pagination: {
				el: '.review_wrap .swiper'+ idx +' .swiper_pagination',
				type: 'fraction'
			}
		});
	});
}

/* 추천 상품 슬라이드 */
var recomSwiper;
function recomSlide() {
	if (recomSwiper) { 
		$(".recom_swiper").each(function() {
			if ( $(this)[0].swiper != undefined ){
				$(this)[0].swiper.destroy();	
			}
		});
	}
	recomSwiper = new Swiper('.recom_swiper', {
		wrapperClass: 'swiper_wrap',
		slideClass: 'swiper_slide',
		slidesPerView: 'auto'
	});
}

/* 상세 레이어 팝업 zoom */
function detaliZoom() {
    $('.zoom_area').each(function () {
        new RTP.PinchZoom($(this), {
        	tapZoomFactor:1 //더블탭으로 확대방지. (default 2)
        });
    });
}

$(function(){
	/* 상단 제품 이미지 슬라이드*/
	if($('.swiper').length) {
		var pdTopSwiper = new Swiper('.broadcast_thumb .swiper',{
			wrapperClass: 'swiper_wrap',
			slideClass: 'swiper_slide',
			pagination: {
				el: '.broadcast_thumb .swiper_pagination',
				type: 'fraction'
			}		
		}); 

		/* 상품평 이미지 슬라이드*/
		$('.review_wrap .swiper').each(function(idx,ele){
			var $this = $(this)
			$this.addClass('swiper'+idx);
			reviewSwiper = new Swiper('.review_wrap .swiper'+idx, {
				wrapperClass: 'swiper_wrap',
				slideClass: 'swiper_slide',
				pagination: {
					el: '.review_wrap .swiper'+ idx +' .swiper_pagination',
					type: 'fraction'
				}
			});
		});
	
		/* 관련 동영상 슬라이드*/
		var relationVideo = new Swiper('.relation_video', {
			wrapperClass: 'swiper_wrap',
			slideClass: 'swiper_slide',
			pagination: {
				el: '.relation_video .swiper_pagination'
			}
		});
		
		$('.img_full_slide').on('click','span', function(){
			var $this = $(this),
				fullImgSrc = $this.data('src'),
				fullImg = $('.img_full img');
			$this.parent().addClass('active').siblings().removeClass('active');
			fullImg.attr('src',fullImgSrc);
		});
	}

	if($('.img_statem').length) {
//		document.documentElement.addEventListener('touchstart', function (event) {
//			if (event.touches.length > 1) {
//				event.preventDefault();
//			}
//		}, false);
//		
		var prdViewDetailPinch = new IScrollZoom("#zoomWrap",{
			zoom:true,
			scrollX:true,
			scrollY:true,
			eventPassthrough:false,
			preventDefault:false,
			lockDirection:false,
			bounce:false,
			momentum:false,
			zoomMax:4
		});
		
	}
	
	pdName('.pd_name');
	detailTab('.pd_detail');

	pickUp('.pick_up_sel');
	detaliZoom();
	
	//190520 상품상세기술서
    var swiper = new Swiper('.pd_detail_content .swiper_sm', {
		wrapperClass: 'swiper_wrap',
		slideClass: 'swiper_slide',
		navigation: {
			nextEl: '.swiper_next',
			prevEl: '.swiper_prev',
		},
		pagination: {
			el: '.swiper_pagination',
		}
    });
});

/* 상품상세 비디오 2020/6/23 */
$(function(){
    // 관련동영상
    var relationVideo = new Swiper('.relation_video_type01', {
        wrapperClass: 'swiper_wrapper',
        slideClass: 'swiper_slide',
        slidesPerView: 'auto',
    });

	$(window).on("scroll" , function(){
		if(!isVideoPlay) return;

		var scrollTop = $(this).scrollTop();
		var $videoWrap = $(".video_wrap");
		if(scrollTop > $(".broadcast_thumb").height()){
			$videoWrap.addClass("mini");
			$videoWrap.height(70);
			$(".broadcast_thumb").addClass("play")
		}else{
			$videoWrap.removeClass("mini");
			$videoWrap.height($(".broadcast_thumb .swiper").height());
			$(".broadcast_thumb").removeClass("play")
		}
		
	});

	detailTabNew('.pd_detail');
});
var isVideoPlay = false;
function playVideoGoodsDetail(target , title , isOnAir){
	isVideoPlay = true;
	$(target).closest('.notice_layer').hide()

	videoControl.play(target, $(target).closest('#container'));
	$(".video_wrap .control_wrap .close").on("click" , stopVideoGoodsDetail);

	var isOnAirClass = isOnAir ? 'on' : '';
	if($(".video_wrap .info").length < 1){
		var infoEl = '<div class="info">'+
					'<p class="title">' + title +'</p>'+
					'<p>';

					if(isOnAir){
						infoEl = infoEl+='<span class="liveType on">ON AIR</span>';
					}else{
						infoEl = infoEl+='<span class="liveType"></span>';
					}

				infoEl = infoEl+='</p>';
				infoEl = infoEl+='</div>';

		$(".video_wrap").append(infoEl);
	}else{
		$(".video_wrap .info .title").html(title)
		$(".video_wrap").find(".liveType").removeClass("on");
		$(".video_wrap .info .liveType").addClass(isOnAirClass)
		if(isOnAir){
			$(".video_wrap .info .liveType").html("ON AIR")
		}else{
			$(".video_wrap .info .liveType").html("")
		}
	}
	
	var $headerH = $("#header").length > 0 ? $("#header").outerHeight() : 0;
	$(".video_wrap").css("top" , $headerH);
	$(".video_wrap").height($(".broadcast_thumb .swiper").height())
	
}

function stopVideoGoodsDetail(){
	isVideoPlay = false;
	var $videoWrap = $(".video_wrap");
	$videoWrap.removeClass("mini");
	$videoWrap.height($(".broadcast_thumb .swiper").height());
	$(".broadcast_thumb").removeClass("play")
	$(".video_wrap .control_wrap .close").unbind("click" , stopVideoGoodsDetail);
	$(window).scroll();
}


//상세 탭 scroll 시 top 변경(native 에서 전달)
function detailTabView(top){
	detaileTabTopReceive = top;
	$(window).scroll();
}


var detaileTabTop = 46; //탭 기본  top
var detaileTabTopReceive = 0;//app 에서 전달 받은 탭 top 설정

/* 상품상세 탭 */
function detailTabNew(ele) {
	var tab = $(ele);
	if(tab.length) {
		var tabMenu = tab.find('.pd_detail_tab a'),
			tabTop = tab.offset().top, 
			headerH = $('#header').height(),
			pdDetailWrap = $('.img_statem'),
			scaleNotice = tab.find('.layer_scale_notice'),
			onState,
            isDetailApp = false;

		var className = "depth";

		pdDetailView();
		
		$('.ac_tit').click(function(){
			setTimeout(function(){
				tabTop = tab.offset().top;
				if(isDetailApp) {
					tabTop -= 48;
					if(tabTop < 0) tabTop = 0;
				}
			},200);
		});

		tabMenu.on('click',function(){
			if(tab.hasClass('fixed')){
				$('html, body').scrollTop(tabTop - (isDetailApp? 0 : 45));
			}
			return false;
		});

		scaleNotice.on('click',function(){
			scaleNotice.hide();
		});
		$(window).on({
			scroll : function(){
				var scrollTop = $(window).scrollTop();
				//미니 영상 노출 여부
				var vodAreaEleData = $(".video_wrap.mini").length > 0 && $(".video_wrap.mini").css('display') == 'block' ? true : false; 

				var pos = headerH + scrollTop + detaileTabTopReceive;
				if (tabTop < pos && pdDetailWrap.length) {
					tab.addClass('fixed');
					if(vodAreaEleData){
						detaileTabTop = 116;//미니 비디오 합친 값
					}else{
						detaileTabTop = 46;
						detaileTabTop = detaileTabTop + detaileTabTopReceive;
					}
					tab.find(".pd_detail_tab").css("top" , detaileTabTop)

					if (onState !== 'on' && scrollTop > pdDetailWrap.offset().top && scrollTop < tabTop + pdDetailWrap.height()) {
						
						scaleNotice.show();
						setTimeout(function(){
							scaleNotice.fadeOut('3000');
							onState = 'on';
						},3000);
					} else {
						scaleNotice.fadeOut('3000');
					}
				} else {
					tab.find(".pd_detail_tab").css("top" , 0)
					tab.removeClass('fixed').removeClass(className);
					// 확대보기안내 레이어 체크 onState = '';

				}
			},
			resize : function(){
				if(!tab.parent().hasClass('fixed')){
					tabTop = tab.offset().top;
					if(isDetailApp) {
						tabTop -= 48;
						if(tabTop < 0) tabTop = 0;
					}
				}
			}
		});
		$(window).scroll();
	}
}