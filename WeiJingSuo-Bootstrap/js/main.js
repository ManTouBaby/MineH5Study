$(function () {
    function resize() {
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;

        /*广告屏幕适配*/
        $("#main_ads>.carousel-inner>div").each(function (i, item) {
            var $item = $(item);
            var a = $item.data("image-xs");
            var b = $item.data("image-lg");
            var imgSrc = isSmallScreen ? a : b;
            $item.css('backgroundImage', 'url("' + imgSrc + '")')

            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '">');
            } else {
                $item.empty();
            }
        })

        /*新闻导航栏屏幕适配响应*/
        var ulConstainer = $(".ul-constainer>ul");
        var widthCount = 30;
        ulConstainer.children().each(function (index, element) {
            widthCount += element.clientWidth;
        })
        if (widthCount >= windowWidth) {
            ulConstainer.css('width', widthCount).parent().css('overflow-x', 'scroll');
        } else {
            ulConstainer.css('width', '100%').parent().css('overflow-x','hidden');
        }

        /*合作伙伴宽度适配响应*/
        var $partnersList = $("#partners>.container>.partners-list");
        var partnersWidth = 0;
        $partnersList.children().each(function (index, element) {
            var $element = $(element);
            var borderWidth = $element.outerWidth();
            partnersWidth += borderWidth;
        })
        if (partnersWidth >= windowWidth) {
            $partnersList.css('width', partnersWidth);
        } else {
            $partnersList.css('width', $partnersList.parent().width());
        }
        var count = $partnersList.width() / $partnersList.children().length;
        $partnersList.children().each(function (index, element) {
            var $element = $(element);
            $element.css('width', count);
            console.log('宽度:' + element.width);
        })
    }

    $(window).on('resize', resize).trigger('resize');
    /*鼠标提示框*/
    $('[data-toggle="tooltip"]').tooltip()
    /*设置动态新闻标题*/
    var title = $(".new-title");
    $(".new-content-title>ul>li>a").on("click", function () {
        console.log($(this).data("title"));
        title.text($(this).data("title"));
    })

    /*Banner实现左右滑动*/
    var touchSt;
    var touchEnd;
    var space = 50;
    $('#main_ads').on('touchstart', function (event) {
        touchSt = event.originalEvent.touches[0].screenX;
        console.log(touchSt);
    })
    $('#main_ads').on('touchmove', function (event) {
        touchEnd = event.originalEvent.touches[0].screenX;
    })
    $('#main_ads').on('touchend', function () {
        if (Math.abs(touchEnd - touchSt) > space) $(this).carousel(touchEnd - touchSt > 0 ? 'prev' : 'next');
    })

})