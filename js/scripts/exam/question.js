var Question = function () {

	var totalQuestionNum = 0;

	var bindRadioOptions = function () {
		var $radioItems = $(".noodles-option-icon-checked,.noodles-option-icon").parent();
		$radioItems.on("click",function(){
			var $optionIcon = $(this).children("span").first();
			if ($optionIcon.hasClass("noodles-option-icon-checked")) {
				$optionIcon.removeClass("noodles-option-icon-checked").addClass("noodles-option-icon");
				return;
			};

			if ($optionIcon.hasClass("noodles-option-icon")) {
				$(this).parents(".swiper-slide").find(".noodles-option-icon-checked").removeClass("noodles-option-icon-checked").addClass("noodles-option-icon");
				$optionIcon.removeClass("noodles-option-icon").addClass("noodles-option-icon-checked");
				return;
			};
		});
	};

	var bindMultiOptions = function () {
		var $multiItems = $(".noodles-multi-option-icon-checked,.noodles-multi-option-icon").parent();
		$multiItems.on("click",function(){
			var $optionIcon = $(this).children("span").first();
			if ($optionIcon.hasClass("noodles-multi-option-icon-checked")) {
				$optionIcon.removeClass("noodles-multi-option-icon-checked").addClass("noodles-multi-option-icon");
				return;
			};

			if ($optionIcon.hasClass("noodles-multi-option-icon")) {
				$optionIcon.removeClass("noodles-multi-option-icon").addClass("noodles-multi-option-icon-checked");
				return;
			};
		});
	};

	var initSwaper = function () {
		var swiper = new Swiper('.swiper-container',{
			onSlideChangeEnd: function(swiper){
				var index = swiper.activeIndex + 1;
				var paginationStr = index+"/"+swiper.slides.length;
				$("#pagination").html(paginationStr);
			}
		});


		var index = swiper.activeIndex + 1;
		var paginationStr = index+"/"+swiper.slides.length;
		totalQuestionNum = swiper.slides.length;
		$("#pagination").html(paginationStr);
	};


	var initCountdown = function () {
		var limitTimeNum = $('#timeCountdown').html();
		var nowTime = new Date(); 
		var limitDate = new Date(nowTime.getTime() + limitTimeNum * 1000); 
		var month=limitDate.getMonth()+1;
		var limitDateStr = limitDate.getFullYear()+"/"+month+"/"+limitDate.getDate()+" "+limitDate.getHours()+":"+limitDate.getMinutes()+":"+limitDate.getSeconds();
		$('#timeCountdown').countdown(limitDateStr, function(event) {
			$(this).html(event.strftime('%H:%M:%S'));
		});
	};


	var initSubmitBtn = function () {
		//添加提交按钮
		$(".swiper-container>.swiper-wrapper>.swiper-slide").last().append('<div id="submitHandle" class="am-g am-margin-vertical-xl"><button type="button" class="am-btn am-btn-primary am-radius am-u-sm-10 am-u-sm-offset-1">提 交</button></div>');
		//绑定提交事件
		$("#submitHandle").on("click",function(){
			var answers = getAnswers();
			if (answers.length == totalQuestionNum) {
				console.log("填完了");
			}else{
				console.log("没回答完");
			}
			// $('#confirmModal').modal({
			// 	relatedTarget: this,
			// 	onConfirm: function () {
   //                  	// $("#my-form").attr("action", 'finish.html').submit();
   //                  },
   //                  onCancel: function () {
   //                  	return false;
   //                  }
   //              });
		});
	};
	//函数==================================================
	function getAnswers () {
		var returnAnswers = [];
		$(".swiper-container>.swiper-wrapper>.swiper-slide").each(function(){
			var tempAnswerArr = [];
			var $options = $(this).find(".noodles-multi-option-icon-checked,.noodles-multi-option-icon,.noodles-option-icon-checked,.noodles-option-icon");
			$options.each(function(){
				if ($(this).hasClass("noodles-multi-option-icon-checked")||$(this).hasClass("noodles-option-icon-checked")) {
					tempAnswerArr.push($(this).attr("data-option-id"));
				};
			});
			if (tempAnswerArr.length) {
				returnAnswers.push({question:$(this).attr("data-question-id"),answer:tempAnswerArr});
			};
		});
		return returnAnswers;
	}

	return {
		init: function () {
			bindRadioOptions();
			bindMultiOptions();
			initSwaper();
			initCountdown();
			initSubmitBtn();
		},

	}
}();