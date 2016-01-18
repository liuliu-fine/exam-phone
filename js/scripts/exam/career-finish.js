var careerFinish = function () {
    var setValue = function () {
        var resultStr = '';
        var storage = localStorage["resultArr"];
        var result = JSON.parse(storage);
        //矩形图
        $('ul.image>li').each(function () {
            var text = $(this).find('.am-text-xs').html().substr(1, 1);
            var value = result[text] / 15 * 131;
            if($(this).find('.noodles-bg-white')) {
                $(this).find('.noodles-bg-white').attr('style', "height:" + (131 - value) + "px");
            }
            $(this).find('.noodles-bg-primary').attr('style', "height:" + value + "px");
        });
        //结果
        if (result.E> result.I) {
            resultStr += 'E';
        } else {
            resultStr += 'I';

        }
        if (result.S > result.N) {
            resultStr += 'S';
        } else {
            resultStr += 'N';

        }
        if (result.T > result.F) {
            resultStr += 'T';
        } else {
            resultStr += 'F';

        }
        if (result.J > result.P) {
            resultStr += 'J';
        } else {
            resultStr += 'P';

        }
        $('.am-tabs-bd').find('.am-text-xl').find('span').html(resultStr);
        $('.' + resultStr).removeClass('am-hide');

    };

    return {
        init: function () {
            setValue();
        }
    };
}();