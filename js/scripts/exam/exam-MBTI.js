var ExamMBTI = function () {
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
                    //结果集
                    var resultStr = getAnalysis(answersArr);
                    resultStr = 'exam-MBTI-result.html?' + resultStr;
                    window.location.href = resultStr;
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
            //结果集
            var resultStr = getAnalysis(answersArr);
            console.log(resultStr);

            for (var key in answersArr) {
                if (answersArr[key].hasOwnProperty('index')) {
                    uncheckedIndex += (answersArr[key].index + 1) + ',';
                }
            }
            if (uncheckedIndex.length) {
                $('#confirmModal').find('.am-modal-dialog').find('.am-modal-bd').html('您还有' + uncheckedIndex + '题未完成，您确定要提交吗?');
            }
            else {
                $('#confirmModal').find('.am-modal-dialog').find('.am-modal-bd').html(' 你已完成所有测试题，是否提交?');

            }

            $('#confirmModal').modal({
                relatedTarget: this,
                onConfirm: function () {
                    window.location.href = 'exam-MBTI-result.html?' + resultStr;
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

//分析答案得出性格属性
    function getAnalysis(answersArr) {
        var resultStr = '';
        var resultArr = [];
        resultArr.E = 0;
        resultArr.I = 0;
        resultArr.S = 0;
        resultArr.N = 0;
        resultArr.T = 0;
        resultArr.F = 0;
        resultArr.J = 0;
        resultArr.P = 0;
        for (var value in answersArr) {
            if (value % 4 === 0 && answersArr[value].hasOwnProperty('answer')) {
                if (answersArr[value].answer == 1) {
                    resultArr.E++;
                }
                if (answersArr[value].answer == 2) {
                    resultArr.I++;
                }
            }
            if (value % 4 == 1 && answersArr[value].hasOwnProperty('answer')) {
                if (answersArr[value].answer == 1) {
                    resultArr.S++;
                }
                if (answersArr[value].answer == 2) {
                    resultArr.N++;
                }
            }
            if (value % 4 == 2 && answersArr[value].hasOwnProperty('answer')) {
                if (answersArr[value].answer == 1) {
                    resultArr.T++;
                }
                if (answersArr[value].answer == 2) {
                    resultArr.F++;
                }
            }
            if (value % 4 == 3 && answersArr[value].hasOwnProperty('answer')) {
                if (answersArr[value].answer == 1) {
                    resultArr.J++;
                }
                if (answersArr[value].answer == 2) {
                    resultArr.P++;
                }
            }
        }
        console.log(resultArr);
        if (resultArr.E> resultArr.I) {
            resultStr += 'E';
        } else {
            resultStr += 'I';

        }
        if (resultArr.S > resultArr.N) {
            resultStr += 'S';
        } else {
            resultStr += 'N';

        }
        if (resultArr.T > resultArr.F) {
            resultStr += 'T';
        } else {
            resultStr += 'F';

        }
        if (resultArr.J > resultArr.P) {
            resultStr += 'J';
        } else {
            resultStr += 'P';

        }
        return resultStr;
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