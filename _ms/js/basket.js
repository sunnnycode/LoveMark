jq(() => {
    basketJsPkg.init();
});

const basketJsPkg = {
    init: function () {
        $productPrice = jq(".xans-order-normnormal .right > ul > li:nth-child(1) span");
        $salePrice = jq(".xans-order-normnormal .right > ul > li:nth-child(2) span");
        $delPrice = jq(".xans-order-normnormal .right > ul > li:nth-child(3) span");
        $totalPrice = jq(".xans-order-normnormal .right > ul > li:nth-child(4) span");

        $orderList = jq(".xans-order-normnormal .left .xans-order-list > li");

        $orderList.each(function () {
            let _this = jq(this).find(".a4 > ul > li:nth-child(1) > div > p > span[id*='product_discount_price']");
            if (_this.text() != "0") {
                _this.parent().parent().parent().show();
            }
        });

        this.getPrice();
        this.nbspRemove();
        this.clickBasketInput();
    },
    getPrice: () => {
        setTimeout(() => {
            $productPrice.text(jq(".total_product_price_display_front").text());
            $totalPrice.text(jq("#total_order_price_front").text());

            if (jq("#total_product_discount_price_front").text() != 0) {
                $salePrice.text(`-${jq("#total_product_discount_price_front").text()}`);
                jq(".xans-order-normnormal .right > ul li:nth-child(2)").show();
            } else {
                // jq(".xans-order-normnormal .right > ul li:nth-child(2)").hide();
            }

            if (jq(".total_delv_price_front").text() == 0) {
                // $delPrice.text("무료배송");
            } else {
                $delPrice.text(jq(".total_delv_price_front").text());
            }
        }, 200);
    },
    clickBasketInput: () => {
        jq("#all-list").trigger("click");

        jq("#all-list").on("click", function () {
            if (jq(this).is(":checked") == true) {
                basketJsPkg.getPrice();
            } else {
                $productPrice.text("0");
                $salePrice.text("0");
                $delPrice.text("0");
                $totalPrice.text("0");
            }
        });

        jq(".xans-order-normnormal .left .xans-order-list > li .a1 input[id*='basket_chk_id_']").on("click", function () {
            let checkcount = 0;
            $orderList.each(function () {
                if (jq(this).find("> .a1 input").is(":checked")) {
                    checkcount += 1;
                }
            });

            if (checkcount == 0) {
                $productPrice.text("0");
                $salePrice.text("0");
                $delPrice.text("0");
                $totalPrice.text("0");
            } else {
                basketJsPkg.getPrice();
            }

            if (checkcount !== $orderList.length) {
                jq("#all-list").prop("checked", false);
            } else {
                jq("#all-list").prop("checked", true);
            }
        });
    },
    nbspRemove: () => {
        const input = jq("input");
        input.each(function () {
            const reTag = jq(this).parent().html();
            if (reTag != undefined && reTag.includes("&nbsp")) {
                jq(this)
                    .parent()
                    .html(
                        jq(this)
                            .parent()
                            .html()
                            .replace(/&nbsp;/gi, "")
                    );
            }
        });
    },
};
