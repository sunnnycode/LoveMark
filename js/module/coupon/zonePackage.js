$(document).ready(function () {
    $(".tab li a").click(function (e) {
        $(this).parent().addClass("selected").siblings().removeClass("selected");
    });
});
