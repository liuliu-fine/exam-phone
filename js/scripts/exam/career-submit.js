var CareerSubmit = function () {
    var bindRadioOptions = function () {

        var $radioItems = $(".noodles-option-number");
        $radioItems.on("click", function () {
            var radioText = 5 - $(this).html();
            $(this).parent().parent().find('.noodles-option-number-checked').removeClass('noodles-option-number-checked').addClass('noodles-option-number');
            $(this).removeClass('noodles-option-number').addClass('noodles-option-number-checked');
            var $brotherGroup = $(this).parent().parent().siblings('.am-text-lg');
            $brotherGroup.find('.noodles-option-number-checked').removeClass('noodles-option-number-checked').addClass('noodles-option-number');
            $brotherGroup.find('.noodles-option-number').each(function () {
                if ($(this).html() == radioText) {
                    $(this).removeClass('noodles-option-number').addClass('noodles-option-number-checked');
                }
            });
            $brotherGroup.find(radioText);

            //console.log(radioText);
        });


    };


    var initSwaper = function () {
        var swiper = new Swiper('.swiper-container', {
            onSlideChangeEnd: function (swiper) {
                var index = swiper.activeIndex + 1;
                var paginationStr = index + " / " + swiper.slides.length;
                $("#pagination").html(paginationStr);
            }
        });

        var index = swiper.activeIndex + 1;
        var paginationStr = index + "/" + swiper.slides.length;
        console.log(paginationStr);
        $("#pagination").html(paginationStr);
        $('.noodles-option-number').on('click', function () {
            if ($(this).hasClass("noodles-option-number-checked")) {
                swiper.slideNext(true);//切换到下一个slide，速度为1.5秒
            }

        });

    };


    var initCountdown = function () {
        var limitTimeNum = $('#timeCountdown').html();
        var nowTime = new Date();
        var limitDate = new Date(nowTime.getTime() + limitTimeNum * 1000);
        var month = limitDate.getMonth() + 1;
        var limitDateStr = limitDate.getFullYear() + "/" + month + "/" + limitDate.getDate() + " " + limitDate.getHours() + ":" + limitDate.getMinutes() + ":" + limitDate.getSeconds();
        $('#timeCountdown').countdown(limitDateStr, function (event) {
            $(this).html(event.strftime('%H:%M:%S'));
            //倒计时结束跳转
            if (event.type == 'finish') {
                $(window).unbind('beforeunload');
                var answerSheet = getAnswers();
                localStorage.resultArr = JSON.stringify(answerSheet);
                $("#submitForm").attr("action", 'career-finish.html').submit();


            }

        });

    };

    //提交
    var submitForm = function () {
        //添加提交按钮
        $(".swiper-container>.swiper-wrapper>.swiper-slide").last()
            .append('<div class="am-text-center am-margin-vertical-xl am-padding-vertical-xl">' +
            '<button id="confirm" class="am-btn am-btn-primary am-padding-vertical-sm" style="width: 60%">提交</button>' +
            '</div>');

        $('#confirm').on('click', function () {
            var answerSheet = getAnswers();
            localStorage.resultArr = JSON.stringify(answerSheet);
            if (answerSheet.unchecked.length) {
                $('#confirmModal').find('.am-modal-dialog').find('.am-modal-bd').html('您还有第' + answerSheet.unchecked.substr(0, answerSheet.unchecked.length - 1) + '题未完成，您确定要提交吗?');
            }
            else {
                $('#confirmModal').find('.am-modal-dialog').find('.am-modal-bd').html('你已完成所有测试题，是否提交?');

            }
            $('#confirmModal').modal({
                relatedTarget: this,
                onConfirm: function () {
                    $(window).unbind('beforeunload');
                    $("#submitForm").attr("action", 'career-finish.html').submit();
                },
                onCancel: function () {
                    return false;
                }
            });
        });
    };

    function getAnswers() {
        var resultArr = {};
        resultArr.E = 0;
        resultArr.I = 0;
        resultArr.S = 0;
        resultArr.N = 0;
        resultArr.T = 0;
        resultArr.F = 0;
        resultArr.J = 0;
        resultArr.P = 0;
        resultArr.unchecked = '';
        $('.swiper-slide').each(function (value) {
            if ($(this).find('.am-text-lg').has('.noodles-option-number-checked').length == 0) {
                resultArr.unchecked += (value + 1) + ',';
            }
            var $options = $(this).find(".noodles-option-number-checked");

            $options.each(function (index) {
                switch (value % 4) {
                    case 0:
                        if (index == 0) {
                            resultArr.E += parseInt($(this).html());
                        }
                        if (index == 1) {
                            resultArr.I += parseInt($(this).html());
                        }
                        break;
                    case 1:
                        if (index == 0) {
                            resultArr.S += parseInt($(this).html());
                        }
                        if (index == 1) {
                            resultArr.N += parseInt($(this).html());
                        }
                        break;
                    case 2:
                        if (index == 0) {
                            resultArr.T += parseInt($(this).html());
                        }
                        if (index == 1) {
                            resultArr.F += parseInt($(this).html());
                        }
                        break;
                    case 3:
                        if (index == 0) {
                            resultArr.J += parseInt($(this).html());
                        }
                        if (index == 1) {
                            resultArr.P += parseInt($(this).html());
                        }
                        break;
                }

            });

        });
        return resultArr;
    }

    function alert() {
        $(window).bind('beforeunload', function () {
            return '考试尚未完成！';

        });
    }

    return {
        init: function () {
            bindRadioOptions();
            initSwaper();
            initCountdown();
            submitForm();
            alert();
        }
    };
}();