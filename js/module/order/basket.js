$(function () {
    // 상품리스트 전체선택
    $("#product_select_all").bind("click", function () {
        var _status = $(this).data("status");

        $('[id^="basket_chk_id_"]').each(function () {
            var bChecked = $(this).is(":checked");

            if (_status == "off") {
                if (bChecked === false) $(this).attr("checked", true);
            } else {
                $(this).attr("checked", false);
            }
        });

        $(this).data("status", _status == "off" ? "on" : "off");
    });

    $("#product_select_all").trigger("click");
});

// 장바구니 선택상품 삭제
function selBasketDel(id) {
    $('[id^="' + BASKET_CHK_ID_PREFIX + '"]').attr("checked", false);
    $('[id="' + id + '"]').attr("checked", true);
    Basket.deleteBasket();
}
