var Submit = function () {
    var bindRadioOptions = function () {
        var $radioItems = $(".noodles-option-icon-checked,.noodles-option-icon").parent();
        $radioItems.on("click", function () {
            var $optionIcon = $(this).children("span").first();
            if ($optionIcon.hasClass("noodles-option-icon-checked")) {
                $optionIcon.removeClass("noodles-option-icon-checked").addClass("noodles-option-icon");
                return;
            }

            if ($optionIcon.hasClass("noodles-option-icon")) {
                $(this).parents(".swiper-slide").find(".noodles-option-icon-checked").removeClass("noodles-option-icon-checked").addClass("noodles-option-icon");
                $optionIcon.removeClass("noodles-option-icon").addClass("noodles-option-icon-checked");
                return;
            }
        });
    };

    var bindMultiOptions = function () {
        var $multiItems = $(".noodles-multi-option-icon-checked,.noodles-multi-option-icon").parent();
        $multiItems.on("click", function () {
            var $optionIcon = $(this).children("span").first();
            if ($optionIcon.hasClass("noodles-multi-option-icon-checked")) {
                $optionIcon.removeClass("noodles-multi-option-icon-checked").addClass("noodles-multi-option-icon");
                return;
            }

            if ($optionIcon.hasClass("noodles-multi-option-icon")) {
                $optionIcon.removeClass("noodles-multi-option-icon").addClass("noodles-multi-option-icon-checked");
                return;
            }
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
        $('.noodles-option-icon').parent().on('click', function () {
            if ($(this).children("span").first().hasClass("noodles-option-icon-checked")) {
                swiper.slideNext(true);//切换到下一个slide，速度为1秒
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
                $("#alertModal").modal();
                setTimeout(function () {
                    var answersArr = getAnswers();
                    $("#submitForm").attr("action", 'finish.html').submit();
                }, 3000);

            }

        });

    };
    //提交
    var submitForm = function () {
        //添加提交按钮
        $(".swiper-container>.swiper-wrapper>.swiper-slide").last()
            .append('<div class="am-text-center am-margin-vertical-xl">' +
            '<button id="confirm" class="am-btn am-btn-primary am-padding-vertical-sm" style="width: 60%">提交</button>' +
            '</div>');
        $('#confirm').on('click', function () {
            //未选择的题目号
            var uncheckedIndex = '';
            //答题卷
            var answersArr = getAnswers();
            console.log(answersArr);
            for (var key in answersArr) {
                if (answersArr[key].hasOwnProperty('index')) {
                    uncheckedIndex += (answersArr[key].index + 1) + ',';
                }
            }
            if (uncheckedIndex.length) {
                $('#confirmModal').find('.am-modal-dialog').find('.am-modal-bd').html('您还有第' + uncheckedIndex + '题未完成，您确定要提交吗?');
            }
            else {
                $('#confirmModal').find('.am-modal-dialog').find('.am-modal-bd').html('你已完成所有测试题，是否提交?');

            }

            $('#confirmModal').modal({
                relatedTarget: this,
                onConfirm: function () {
                    $("#submitForm").attr("action", 'finish.html').submit();
                },
                onCancel: function () {
                    return false;
                }
            });

        });
    };

    function getAnswers() {
        var returnAnswers = [];
        $(".swiper-container>.swiper-wrapper>.swiper-slide").each(function (index) {
            var tempAnswerArr = [];
            var $options = $(this).find(".noodles-multi-option-icon-checked,.noodles-multi-option-icon,.noodles-option-icon-checked,.noodles-option-icon");
            $options.each(function () {
                if ($(this).hasClass("noodles-multi-option-icon-checked") || $(this).hasClass("noodles-option-icon-checked")) {
                    tempAnswerArr.push($(this).attr("data-option-id"));
                }
            });
            if (tempAnswerArr.length) {
                returnAnswers.push({
                    question: $(this).attr("data-question-id"),
                    answer: tempAnswerArr
                });
            } else {
                returnAnswers.push({index: index});

            }
        });
        return returnAnswers;
    }

    return {
        init: function () {
            bindRadioOptions();
            bindMultiOptions();
            initSwaper();
            initCountdown();
            submitForm();
        }

    };
}();