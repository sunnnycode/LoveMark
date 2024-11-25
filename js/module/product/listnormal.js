/**
 * 할인기간 레이어
 */
$(document).ready(function () {
    $(".discountPeriod > a").click(function () {
        $(this).parent().find(".layerDiscountPeriod").show();
    });

    $(".btnClose, button.submit").click(function () {
        $(this).parents(".layerDiscountPeriod").hide();
    });
});
