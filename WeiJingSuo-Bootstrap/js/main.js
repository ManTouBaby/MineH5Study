$(function () {
    function resize() {
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;

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

        $('[data-toggle="tooltip"]').tooltip()

        var ulConstainer = $(".ul-constainer>ul");
        var widthCount = 30;
        ulConstainer.children().each(function (index, element) {
            widthCount += element.clientWidth;
            // console.log(element.clientWidth);
        })
        if (widthCount >= windowWidth) {
            ulConstainer.css('width', widthCount).parent().css('overflow-x', 'scroll');
        } else {
            ulConstainer.css('width', '100%');
        }

    }

    $(window).on('resize', resize).trigger('resize');
})