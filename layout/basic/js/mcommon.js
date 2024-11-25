jQuery(document).ready(function () {
    /* 전체 타이틀 화살표 수정   */
    jQuery(".titleArea .xans-layout-mobileaction a img").attr("src", "/images/customizing/btn_back.png");
    jQuery(".titleArea span").css("opacity", "1");

    /* 더보기 클릭시 소비자가격 0원 숨김   */
    jQuery(".typeMoreview").click(function () {
        setTimeout("price_custom_none();", 400);
    });
    price_custom_none();

    /* 상세페이지 소비자가격 0원 숨김   */
    jQuery(".priceArea  #custom").each(function () {
        var price_cus_view = jQuery(".price span", this)
            .text()
            .replace(/[^0-9]/g, "");
        if (price_cus_view == "0") {
            jQuery(this).css("display", "none");
        }
    });
});
/* 소비자가격이 0원일때 숨김   */
function price_custom_none() {
    setTimeout(function () {
        jQuery(".ec-base-product ul li .spec").each(function () {
            var price_cus = jQuery(".price_custom", this)
                .text()
                .replace(/[^0-9]/g, "");
            if (price_cus == "0") {
                jQuery(".price_custom", this).css("display", "none");
            }
        });
    }, 100);
}
