/**
 * 할인기간 레이어
 */
$(document).ready(function () {
    $(".discountPeriod > a").on("click", function () {
        $(this).parent().find(".layerDiscountPeriod").show();
    });

    $(".btnClose, button.submit").on("click", function () {
        $(this).parents(".layerDiscountPeriod").hide();
    });
});
