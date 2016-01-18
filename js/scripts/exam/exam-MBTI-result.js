var ExamMBTIResult = function () {
    var queryUrl = function () {
        var type = window.url('query', window.location.href);
        $('.am-hide');
        $('.' + type).removeClass('am-hide');
    };

    return {
        init: function () {
            queryUrl();
        }
    };
}();