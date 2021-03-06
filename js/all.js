/*common.js*/
$(function(){

    //로딩 이미지 제거
    function removeLoading(){
       $(".loading").fadeOut(800);
       //$(".loading").css({'z-index':'-100'});
    }


    // GNB 생성 함수
    function gnbMaker(){

        var html = '';

        html += ' <div class="fixed"> ';
        html += ' <h1 class="logo"> ';
        html += ' <img src="/mhna/images/logo.png" style="width:2.5rem; height:2.5rem;"/>';
        html += ' </h1> ';
        html += ' <div class="menu" role="button" tabindex="0"> ';
        html += ' <div class="menu_burger" tabindex="0"> ';
        html += ' <div class="line line_01"></div> ';
        html += ' <div class="line line_02"></div> ';
        html += ' <div class="line line_03"></div> ';
        html += ' </div> ';
        html += ' </div> ';
        html += ' </div> ';
        html += ' <nav class="gnb" style="display:none"> ';
        html += ' <h2 class="text_hide">Navigation</h2> ';
        html += ' <ul class="nav"> ';
        html += ' <li class="menu_item"><a href="/mhna">HOME.</a></li> ';
        html += ' <li class="menu_item menu_work"><a href="/mhna/#work">WORK.</a></li> ';
        html += ' <li class="menu_item menu_about"><a href="/mhna/about.html">ABOUT.</a></li> ';
        html += ' </ul> ';
        html += ' <div class="contact"> ';
        html += ' <a href="mailto:mhp3nd25@gmail.com" class="contact_link">  ';
        html += ' <span class="contact_heading">MAIL</span>    ';
        html += ' <span class="contact_info">mhp3nd25@gmail.com</span> ';
        html += ' </a> ';
        html += ' <a href="tel:01071074084" class="contact_link"> ';
        html += ' <span class="contact_heading">PHONE</span>';
        html += ' <span class="contact_info">82.10.7107.4084</span> ';
        html += ' </a> ';
        html += ' <a href="https://github.com/florebb1/" class="contact_link"> ';
        html += ' <span class="contact_heading">GITHUB</span>  ';
        html += ' <span class="contact_info">florebb1</span> ';
        html += ' </a> ';
        html += ' </div> ';
        html += ' </nav> ';


        $(".header").append(html);
    }


    // Footer 생성 함수
    function footerMaker(){

        var updateDay = 'January 1rd';

        var html = '';

        html += ' <h2 class="title footer_title">Let&acute;s start right Now!</h2> ';
        html += ' <p class="footer_text">작업 준비 완료됐습니다. 편하실 때 연락 주세요!</p> ';
        html += ' <address class="footer_address"> ';
        html += ' <a href="mailto:mhp3nd25@gmail.com" class="footer_link link_mail"> ';
        html += ' <span class="icon_circle"></span> ';
        html += ' <span class="footer_link_text" style="font-size:0.8rem;"></span> ';
        html += ' </a> ';
        html += ' <a href="tel:01071074084" class="footer_link link_phone"> ';
        html += ' <span class="icon_circle"></span> ';
        html += ' <span class="footer_link_text" style="font-size:0.8rem;"></span> ';
        html += ' </a> ';
        html += ' </address> ';
        html += ' <div class="footer_bottom"> ';
        html += ' <ul class="social"> ';
        html += ' <li class="social_item social_github"><a href="https://github.com/florebb1" target="_blank">github</a></li> ';
        html += ' </ul> ';
        html += ' <p class="update">Last Updated On '+updateDay+', 2020</p> ';
        html += ' <p class="copyright">&copy; 2020 MINHO NA</p> ';
        html += ' </div> ';

        $(".footer").append(html);

    }

    $(window).on('load',function(){
        setTimeout(function(){
            removeLoading();
        },100);
        gnbMaker();
        footerMaker();
    });
});
$(function(){


    // 전역변수 선언
    var $body = null;
    var $burger = null;
    var $gnb = null;
    var $gnb_item = null;
    var tl_nav_show = null;
    var isOnTop = false;

    // 전역에서 사용할 요소 초기화
    function init(){
        $body = $("body");
        $burger = $(".menu");
        $gnb = $(".gnb");
        $gnb_item = $(".menu_item");

        tl_nav_show = new TimelineLite({paused:true, reversed:true});

    }

    function timeline_nav(){

        var $nav = $(".nav");
        var $menu = {
            item_1 : $nav.children().eq(0),
            item_2 : $nav.children().eq(1),
            item_3 : $nav.children().eq(2)
        };
        var $contact = $nav.next();

        tl_nav_show
            .addLabel("menuOpen")
            .staggerFrom( //네비 리스트 보이기
                [$menu.item_1, $menu.item_2, $menu.item_3], //각 아이템 및 순서
                0.7, //듀레이션
                {opacity: 0, top: 20}, //애니메이션
                0.2, //간격
                "menuOpen+=0.4"
            )
            .addLabel("menuShow")
            .from( //하단 contact 정보 보이기
                $contact, //대상
                0.5, //듀레이션
                {opacity: 0}, //애니메이션
                "menuShow-=0.32" //시간 조절
            );


    }

    function openBurgerMenu(){
            $gnb.addClass('open'); //GNB배경 보이기
            $burger.addClass('open'); //버거 아이콘 바꾸기
            if($burger.hasClass('onTop')==true){ //onTop클래스가 있으면 제거
                isOnTop = true;
                $burger.removeClass('onTop');
            }
            tl_nav_show.play().timeScale(1); //애니메이션 실행
            $gnb.addClass('open'); //GNB배경 보이기
            preventScroll();

            function preventScroll(){
                $("html").addClass("no_scroll");
                $(".wrap").css({"margin-right":scrollBarWidth()});
                $(".footer").css({width:"calc(100% - "+scrollBarWidth()+"px)"});
                $(".menu").css({right:'+='+scrollBarWidth()});
            }

      	   //브라우저별로 달라지는 스크롤바 너비 구하기
            function scrollBarWidth() {
                document.body.style.overflow = 'hidden';
                var width = document.body.clientWidth;

                document.body.style.overflow = 'scroll';
                width -= document.body.clientWidth;

                if(!width) width = document.body.offsetWidth - document.body.clientWidth;

                document.body.style.overflow = '';

                return width;
            }



    }

    function closeBurgerMenu(){

           function allowScroll(){
                $(".wrap, .menu, .footer").removeAttr("style");
                $("html").removeClass("no_scroll");
           }

           $burger.removeClass('open'); //버거 아이콘 바꾸기

           tl_nav_show.reverse().timeScale(1.8); //애니메이션 실행

           setTimeout(function(){
               $gnb.removeClass('open'); //GNB배경 숨기기

               if(isOnTop==true){ //메뉴를 열 때 onTop클래스가 있었으면 다시 추가
                   isOnTop = false;
                   $burger.addClass('onTop');
               }
           },300);

           setTimeout(function(){
               allowScroll();

           },520);

    }


    function initEvent(){

        $gnb.show();

        //타임라인 애니메이션 (GSAP)
        timeline_nav();

        //메뉴 클릭 시 헤더 오픈/클로즈
        $burger.on('click',function(evt){
           evt.preventDefault();

           tl_nav_show.reversed() ? openBurgerMenu() : closeBurgerMenu();

           if(!$gnb.hasClass('open')){
               $burger.removeClass('open');
           }
        });

        //메뉴 아이템 클릭 시 버거 닫고 이동
        $gnb_item.on('click',function(evt){
            var href = $(this).children('a').attr('href');
            console.log(href);
            evt.preventDefault();
            closeBurgerMenu();
                setTimeout(function(){
                   window.location.href = href;
                }, 600);
        });
    }



    $(window).on('load',function(){
        init();
        initEvent();
    });

});


/*footer.js*/
$(function(){




    $(window).on('load resize',function(){


      siteFooter();

        function siteFooter() {
            var siteContent = $('.contents');
            var siteContentHeight = siteContent.height();
            var siteContentWidth = siteContent.width();

            var siteFooter = $('.footer');
            var siteFooterHeight = siteFooter.height();
            var siteFooterWidth = siteFooter.width();

            siteContent.css({
                "margin-bottom" : siteFooterHeight
            });
        };




    });

    $(window).on('load resize',function(){



    //문서 2/3이상 스크롤 시 on클래스 부여
	var scrollBottom = 0;
    var bodyHeight = $(document).height();
	var scrollOverBodyHeight = (bodyHeight/3)*2
	function toTop_or_toBottom(){
		scrollBottom = $(window).scrollTop()+$(window).height();
		if ( scrollBottom >= scrollOverBodyHeight ){
			$('.footer').addClass("on");
		}else{
			$('.footer').removeClass("on");
		}
	}

       $(window).on("scroll",function(){toTop_or_toBottom()});



    });



});



$(function(){

    // 전역변수 선언
    var $burger = null;
    var $logo = null;
    var scrollTop = 0;
    var topAreaHeight = 0;

    // 전역에서 사용할 요소 초기화
    function init(){
        $burger = $(".menu");
        $logo = $(".logo");
        topAreaHeight = $('.topArea').outerHeight();
    }

     function showTitle(){
        $("[data-ani]").each(function(){


            var objectBottom = $(this).offset().top + $(this).outerHeight();
            var windowBottom = $(window).scrollTop() + ( $(window).height() / 1.5);
            var $titleLine = $(this).next('.title_line');

            function showElemLine(){
                $titleLine.addClass('on');
            }


            if ( windowBottom > objectBottom ) {
                TweenLite.to($(this),1.5,{className:'+=on', top:-10, ease: Power2.easeOut, onComplete: showElemLine()});

            }


        });


    }

    function burgerColor(){
        if( scrollTop >= topAreaHeight ){
            $burger.add($logo).removeClass('onTop');
        }else{
            $burger.add($logo).addClass('onTop');
        }
    }

    function scrollTo(where){
            $('html,body').stop().animate({scrollTop:where});

    }


    // 이벤트 초기화
    function initEvent(){

        $(window).on('scroll',function(){
            scrollTop = $(window).scrollTop();

            showTitle();
            if ($(".wrap.about").length){
                return false;
            }
            burgerColor();

        });

        $('h1').on('click',function(){
           // scrollToTop();
        });
    }

    $(window).on('load',function(){
        init();
        initEvent();
        scrollTop = $(window).scrollTop();
        burgerColor();

       if ($(".wrap.home").length){

           var posWork = $('.article_work').offset().top;

            $('h1').on('click',function(){
                scrollTo(0);
            });
            $('.menu_work').on('click',function(){
                scrollTo(posWork);
            });
            $('.menu_about').on('click',function(){
                window.location.href = 'about.html';
            });
        }
       if ($(".wrap.about").length){
            $burger.add($logo).removeClass('onTop');

            $('h1').on('click',function(){
                window.location.href = '/mhna';
            });
        }
       if ($(".wrap.work").length){


            $('h1').on('click',function(){
                window.location.href = '/mhna';
            });
        }
    });


    $(window).on('resize',function(){
        topAreaHeight = $('.topArea').outerHeight();
        //console.log(topAreaHeight);
    });





});


/*
   [ sub.js ]

   2018.05.30

   메인페이지와 서브페이지 내용을 자동으로 생성합니다.
   이제 jQuery의 한계를 느낀드아앍@#$!@

*/



// ======================================


/*
    [!] 서브 페이지 내용 설정
*/

var customSubPage = {


    'RTMES':
        {

            'show': true, //메인화면에서 보일지 여부를 선택합니다.
            'name': 'rtmes', //폴더 및 이미지의 이름입니다. CSS 스타일링 역시 반드시 이 이름으로 지정해야 합니다.

            'title': 'RTMES Admin',
            'desc': 'RTMES 관리자 서비스', //설명
            'client': 'RTMES', //클라이언트
            'role': 'Front-End &middot; Back-End', //역할
            'percent': '(100% &middot; 20%)', //기여도
            'viewCode': true, //true = 코드 링크 있음, false = 코드 링크 없음

            'detailTitle': 'web',
            'detailInfo' : [
                'RTMES의 어드민 유저를 위해 만든 관리자 페이지입니다.<br/> 디자이너의 시안 없이, 기획 문서만 있는 상태에서 프론트 개발을 진행하였습니다.<br/>',
                '기획서를 보면서 바로 작업했기 때문에 제가 할 수 있는 범위가 넓어 즐겁게 작업할 수 있었습니다.<br/> 어드민 페이지이기 때문에 디자인 자체보다는 UX 측면을 중시하려 했고,<br/> 일부 요소들은 문구나 위치 선정에 있어 기획자와 의견을 물어가며 바꿔보기도 했습니다.<br/>',
                'Bootstrap4와 codeigniter3를 활용하여 빠르게 작업할 수 있었습니다. 했습니다.'
            ],

            'link': false, //true = 외부링크 있음, false = 서브페이지 있음
        },


    'MOOORR':
        {

            'show': true,
            'name': 'mooorr',

            'title': 'MOOORR',
            'desc': 'mooorr 사용자&관리자 서비스',
            'client': 'mooorr',
            'role': 'Front-End &middot; Back-End &middot; Server',
            'percent': '(100% &middot; 50% &middot; 100%)',

            'viewCode': true,
            'detailTitle': 'web & mobile 서비스 | 구축',
            'detailInfo' : [
              'Mooorr SNS 서비스와 이를 용이하게 관리할 수 있도록 돕는 관리자 플랫폼입니다. 가이드 시안이 거의 없었기에 단순 디자인만 보며 작업을 진행하여 많은 어려움이 있었습니다.<br/>',
              'API 작업은 JAVA Spring Boot Framework을 사용하였고, JPA2를 이용하여 SQL문을 거의 사용하지 않고 데이터를 조작하는 경험할 수 있었습니다.',
              'AWS의 EC2를 이용하여 서버를 생성하고, 서버 셋팅 후 배포하였습니다.',
              '또, 기획이 작업중 계속 바뀌면서 GIT을 통한 버전관리와 회의록의 중요성도 깨달았던 작업입니다.'
            ],

            'link': false,
            // 'existLink': 'http://argear.io',
        },

    'KCloud':
        {

            'show': true,
            'name': 'kcloud',

            'title': 'K-Cloud',
            'desc': 'K-Cloud 서비스',
            'client': 'kcloud',
            'role': 'Front-End',
            'percent': '(100%)',

            'viewCode': true,
            'detailTitle': 'web & mobile 서비스',
            'detailInfo' : [
              '한국클라우드산업협회 클라우드 성능 품질검사 Potal Site 입니다. 기존의 DB와 API를 활용하여 퍼블리싱만 새롭게 바꾼 작업입니다.'
            ],

            'link': false,
            // 'existLink': 'http://argear.io',
        },

    'PlayTime':
        {

            'show': true,
            'name': 'playtime',

            'title': 'PlayTime',
            'desc': 'PlayTime 모바일앱&관리자 서비스',
            'client': 'playtime',
            'role': 'Front-End &middot; Back-End',
            'percent': '(100% &middot; 80%)',

            'viewCode': true,
            'detailTitle': 'web & mobile 서비스',
            'detailInfo' : [
              '키즈카페 브랜드인 playtime 그룹의 멤버쉽 서비스를 웹으로 개발 후 네이티브 앱 형태로 껍데기를 씌우는 모바일 웹 앱 mobile webapp 방식을 사용한 작업입니다.',
              '협력 POS업체에서 오라클DB의 프로시저를 제공하여, API작업과 View Template Engine은 JSP로 작업하였습니다. JSTL을 이용하여 언어팩을 추가하여 베트남버전을 오픈하였습니다.',
              '아이폰 앱은 xcode의 Swift를 사용하여 만들었으며, 모바일 push는 구글의 Firebase를 이용하여 구현했습니다.'
            ],

            'link': false,
            // 'existLink': 'http://argear.io',
        },

    'aworks':
        {

            'show': true,
            'name': 'aworks',

            'title': 'a.works',
            'desc': 'POSCOICT RPA Service Potal',
            'client': 'aworks',
            'role': 'Front-End &middot; Back-End',
            'percent': '(50% &middot; 80%)',

            'viewCode': true,
            'detailTitle': 'web 서비스',
            'detailInfo' : [
              '포스코ICT의 RPA제품 Infomation 홈페이지와 제품의 User Software Repository 홈페이지입니다.',
              '처음으로 Spring boot를 접해본 프로젝트 사전지식이 많이 부족하여 고생을 많이 하였습니다. Gradle과 같은 Build Tool을 활용하는 방법을 배울 수 있었습니다.',
              'View Template Engine으로 Freemarker를 사용하였고, DB작업은 JPA와 MyBatis를 혼용하여 작업하였습니다.'
            ],

            'link': false,
            // 'existLink': 'http://argear.io',
        },
}





    var subPageList = [];




// ======================================


//서브페이지가 존재하는 work 아이템인지 파악해 변수에 넣습니다.

function checkHasSubPage(){


    for (var i in customSubPage) {
        if(customSubPage[i].link === false){
            subPageList.push(customSubPage[i].name);
        }
    }

}


function generateMainPage(){

    var myTurn = 0; //아이템이 삽입될 컬럼의 인덱스

    for (var i in customSubPage) {

        if(customSubPage[i].show === true){

            var mainHtml = '';

            mainHtml += '<div class="work_item">';
            mainHtml += '<figure>';

                mainHtml += ' <img src="images/thumb_'+customSubPage[i].name+'.png" alt="'+customSubPage[i].desc+'" class="work_image" /> ';

                if (customSubPage[i].link === true) {
                    // link 프로퍼티가 true인 경우 external 링크 추가
                    mainHtml += ' <figcaption class="work_caption external"> ';
                }else{
                    mainHtml += ' <figcaption class="work_caption"> ';
                }

                mainHtml += ' <div class="caption_textWrap"> ';
                    mainHtml += ' <strong class="caption_title">'+customSubPage[i].title+'</strong> ';
                    mainHtml += ' <p class="caption_desc">'+customSubPage[i].desc+'</p> ';
                mainHtml += ' </div> ';

                if(customSubPage[i].link  === true ){ //link 프로퍼티가 true인 경우 링크 주소 변경. 이때, existLink가 있다면 그걸로 변경
                    if(customSubPage[i].hasOwnProperty('existLink')){
                        mainHtml += ' <a href="'+customSubPage[i].existLink+'" target="_blank"></a> ';
                    }else{
                        mainHtml += ' <a href=" work/view_'+ customSubPage[i].name +'/index.html" target="_blank"></a> ';
                    }
                }else{
                    mainHtml += ' <a href=" work/work_'+ customSubPage[i].name +'.html "></a> ';
                }

            mainHtml += ' </figcaption> ';

            mainHtml += '</figure>';
            mainHtml += '</div>';

            $(".work_list .column").eq(myTurn).append(mainHtml); //인덱스 번호에 맞춰 아이템 삽입

        if(myTurn<$(".work_list .column").length-1){ //컬럼 개수에 맞춰 인덱스 증가
            myTurn++;
        }else{
            myTurn = 0;
        }
        }


    }
}
// ======================================


function generateSubPage(){

    var pageName = $(".wrap").data("sub").substring(5);
    var maxNum = subPageList.length;

    // console.log('pageName=', pageName);
    // console.log('maxNum=', maxNum);

    for (var i in customSubPage) {

        //name이 일치하는 경우 서브페이지를 그려냅니다.
        if(customSubPage[i].name === pageName){

            var num = subPageList.indexOf(pageName) + 1; //현재 페이지가 배열의 몇 번째인지 파악해 num에 대입합니다.

            // hero 화면 생성
            var html_hero = '';

            html_hero += '<div class="inner">';
                html_hero+= '<h2 class="hero_title">'+customSubPage[i].title+'<i class="hero_title_sm"> <span class="text_hide_m">featured</span> work #'+num+'</i></h2>';
                html_hero+= '<div class="hero_top"><p class="info_heading info_client">CLIENT<span class="info_text">'+customSubPage[i].client+'</span></p><p class="info_heading info_role">ROLE<span class="info_text">'+customSubPage[i].role+'<i class="info_percentage">'+customSubPage[i].percent+'</i></span></p></div>';
                html_hero+= '<div class="hero_center">';

                if (customSubPage[i].viewCode === true) { //viewCode 프로퍼티가 true라면 링크 추가
                     html_hero += '<a href="https://github.com/florebb1/'+customSubPage[i].name+'" target="_blank" class="hero_link btn_effect"><span>VIEW CODE</span></a>';
                     html_hero+= '<p class="hero_scroll">or just scroll down to see screenshots!</p>';
                }else{
                    html_hero+= '<p class="hero_scroll">Scroll down to see screenshots!</p>';
                }

                html_hero+= '</div>';
            html_hero += '</div>';


            // --
            //detail top 화면 생성

            var html_detailTop = '';

            html_detailTop += '<h2 class="detail_title">Web Service. <i class="detail_title_sm">'+customSubPage[i].detailTitle+'</i></h2>';
            html_detailTop += '<div class="detail_info"> <p class="detail_info_text">';

            for (var x=0; x < customSubPage[i].detailInfo.length; x++){
                html_detailTop += customSubPage[i].detailInfo[x];
                html_detailTop += '<span class="ly_mt_sm"></span>';
            }

            html_detailTop += '<span class="detail_mobile br_m"> 모바일에선 현재 페이지를 확대할 수 있어요! <br/>두 손가락으로 화면을 확대한 뒤 살펴보세요. <i class="detail_ico"></i></span>';
            html_detailTop += '<span class="detail_line"></span>';
            html_detailTop += '</p></div>';


            // --
            //detail main 화면에 alt 삽입 (lazyload 때문에 이미지는 html에 직접 작성하기로 함...)

            $(".shots_item_img").attr("alt",customSubPage[i].title+' Image');


            // --
            //detail bottom 화면 생성
            var html_detailBottom = '';
            html_detailBottom += '<div class="bottom_inner">';

            var prevNum = 0;
            var nextNum = 0;

            //이전 서브페이지의 html 이름을 파악합니다.
            function getPrevHtmlName(){
                var prevHtml = subPageList[(num-2)]; //배열에서 2번째 전 요소의 이름을 가져옵니다.

                if(prevHtml === undefined){ //이때 에러가 나면
                    prevHtml = subPageList[(subPageList.length - 1)]; //배열 최대 수에서 가장 마지막을 가져옵니다.
                }

                return prevHtml;
            }

            //다음 서브페이지의 html 이름을 파악합니다.
            function getNextHtmlName(){
                var nextHtml = subPageList[num];

                if(nextHtml === undefined){
                    nextHtml = subPageList[0];
                }

                return nextHtml;

            }

            (num <= 1)? prevNum = maxNum : prevNum = (num - 1);
            (num >= maxNum)? nextNum = 1 : nextNum = (num + 1);

            html_detailBottom += '<a href="work_'+getPrevHtmlName()+'.html" class="detail_btn prev"><span class="detail_btn_title">WORK #'+prevNum+'</span>Prev.</a>';

             if (customSubPage[i].viewCode === true){
                 html_detailBottom += '<a href="https://github.com/florebb1/'+customSubPage[i].name+'" target="_blank"  class="detail_link btn_effect"><span>view code</span></a>';
            }



            html_detailBottom += '<a href="work_'+getNextHtmlName()+'.html" class="detail_btn next"><span class="detail_btn_title">WORK #'+nextNum+'</span>Next.</a>';
            html_detailBottom += '</div>';


            $(".hero").append(html_hero);
            $(".detail_top").append(html_detailTop);
            $(".detail_bottom").append(html_detailBottom);
            $(".wrap").addClass(customSubPage[i].name);

            //임시
            $("ul.shots a.item_link").on("click",function(evt){
                evt.preventDefault();
            });


        }
    }
}


$(window).on("load",function(){

    checkHasSubPage();

    $(".wrap").data('sub')? generateSubPage() : generateMainPage();

});
