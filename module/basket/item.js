jq(() => {
    basketItemJsPkg.init();
});

const basketItemJsPkg = {
    init: function () {
        this.option();
        this.allInputChecked();
    },
    option: () => {
        jq(".xans-order-normnormal .left .xans-order-list > li").each(function () {
            const thumImg = jq(this).find(".a1 img").clone();
            jq(this).find(".a2 .option .prd-img").append(thumImg);
        });
        // 위시 옵션 상품 이미지
        jq(".xans-myshop-wishlist .prdInfo").each(function () {
            const thumImg = jq(this).find(".thumbnail img").clone();
            jq(this).find(".description .option .prd-img").append(thumImg);
        });

        jq(".xans-myshop-wishlist .prdBox .description .option .name a").on("click", function () {
            const name = jq(this).parent().parent().parent().parent().find(".prdName > a").text();
            jq(this).parent().parent().find(".optionModify .option-prdInfo > div > strong").text(name);
        });
    },
    allInputChecked: () => {
        // 상품리스트 전체선택
        jq("#product_select_all").on("click", function () {
            var _status = jq(this).data("status");

            jq('[id^="basket_chk_id_"]').each(function () {
                var bChecked = jq(this).is(":checked");

                if (_status == "off") {
                    if (bChecked === false) jq(this).prop("checked", true);
                } else {
                    jq(this).prop("checked", false);
                }
            });

            jq(this).data("status", _status == "off" ? "on" : "off");
            fixedLayerPriceSet();
        });
    },
};
