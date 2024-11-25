jq(() => {
    detailJsPkg.init();
});

const detailJsPkg = {
    init: function () {
        this.detailDiscountRate();
        this.detailPurchaseAreaFixed();
        this.detailTabFixed();
        this.detailFold();
        this.detailOptionAlert();
        this.detailCleaner();
        // this.soldOutBlur();
        // this.deliveryPrice();
    },
    detailDiscountRate: () => {
        let price = "";
        let customPrice = "";
        
        if (jq("#span_optimum_discount_price").text() == "") {
            price = jq("#span_product_price_text").text().split("원")[0];
        } else {
            price = jq("#span_optimum_discount_price").text().split("원")[0];
        }
        
        
        
        if (jq("#span_product_price_custom").text() == "") {
            customPrice = jq("#span_product_price_text").text().split("원")[0];
            jq(".xans-product-detail .prdDesc .price_area p.custom_price").text(jq("#span_product_price_text").text());
        } else {
            customPrice = jq(".xans-product-detail .prdDesc .price_area p.custom_price").text().split("원")[0];
        }
        



        jq(".xans-product-detail .discount_rate").text(Math.round(((commonJsPkg.numberRemoveCommas(customPrice) - commonJsPkg.numberRemoveCommas(price)) / commonJsPkg.numberRemoveCommas(customPrice)) * 100) + "%");
        jq(".xans-product-detail .price_area > .price").text(commonJsPkg.numberWithCommas(Number(commonJsPkg.numberRemoveCommas(price)) + "원"));

        const rate = jq(".price_area .discount_rate");
        rate.each(function (i) {
            if (jq(this).text() == "0%" || jq(this).text() == "-Infinity%") {
                jq(this).next().next().remove();
                jq(this).remove();
            }
        });
    },
    detailTabFixed: () => {
        const tabProductOffset = jq("#tabProduct").offset().top;
        jq(window).scroll(function () {
            const currentScroll = jq(this).scrollTop();

            if (currentScroll >= tabProductOffset) {
                jq("#tabProduct").addClass("fixed");
                jq(".xans-product-relation").css("margin-bottom", "40px");
            } else {
                jq("#tabProduct").removeClass("fixed");
                jq(".xans-product-relation").css("margin-bottom", "0");
            }
        });
    },
    detailFold: () => {
        jq(".fold ul li").on("click", function () {
            $(this).toggleClass("on");
            $(this).find(".fold-contents").toggleClass("on");
        });
    },
    detailCleaner: () => {
        if (jq(".xans-product-detail .detail_summary_desc").text() == "") {
            jq(".xans-product-detail .detail_summary_desc").remove();
        }
    },
    detailPurchaseAreaFixed: () => {
        let detail_option;
        let default_height;
        let optionCount = 0;

        jq(window).scroll(function () {
            optionCount = jq(".option_products").children().length + jq(".add_products").children().length;
            detail_option = jq(".topStandard").offset().top;
            const y = jq(this).scrollTop();
            if (jq(".xans-product-detail .fixed-wr").hasClass("fixed") == false) {
                default_height = jq(".xans-product-detail .fixed-wr").outerHeight();
            }
            if (y > detail_option) {
                jq(".xans-product-detail .overview").css("margin-bottom", default_height);
                jq(".xans-product-detail .fixed-wr").addClass("fixed");
                jq(".xans-product-detail .fixed-wr").css("bottom", default_height * -1.5);
            } else {
                jq(".xans-product-detail .overview").css("margin-bottom", 0);
                jq(".xans-product-detail .fixed-wr").removeClass("fixed");
                jq(".xans-product-detail .fixed-wr").css("bottom", "auto");
                jq(".detail_mask, .action_mask, .xans-product-detail .fixed-wr").removeClass("on");
                jq(".fixed-wr .prdDesc").css("height", "auto");
            }
        });

        jq(".action_mask").on("click", function () {
            jq(".xans-product-detail .fixed-wr").addClass("on");
            jq(".detail_mask").addClass("on");
            jq(this).addClass("on");
            jq("body, html").addClass("hold");
        });

        jq(".detail_mask").on("click", function () {
            jq(".xans-product-detail .fixed-wr").removeClass("on");
            jq(".action_mask").removeClass("on");
            jq(this).removeClass("on");
            jq(".xans-product-detail .fixed-wr").css("bottom", jq(".xans-product-detail .fixed-wr").outerHeight() * -1);
            jq("body, html").removeClass("hold");
        });
    },
    detailOptionAlert: () => {
        if (jq(".prd_option tbody.xans-product-option ").length > 0) {
            // console.log("옵션 있는 상품");
            jq("#action_buy_btn, #action_buyClone, #actionBuyCloneFixed, #actionCart").on("click", () => {
                if (jq(".option_product").length == 0) {
                    alert("필수 옵션을 선택해주세요.");
                }
            });
        } else {
            // console.log("옵션 없는 상품");
        }
    },
    soldOutBlur: () => {
        if (jq(".xans-product-action .soldout").hasClass("displaynone") == false) {
            jq(".xans-product-mobileimage .thumbnail").addClass("blur");
            jq(".xans-product-option, .xans-product-addproduct, #totalProducts, #totalPrice").remove();
            jq(".xans-product-detail .prdDesc .ec-base-table.gClearCell.typeWrite").css("margin", "5px 0");
        }
    },
    // deliveryPrice: () => {
    //     let text = "배송비 " + jq(".info_contents .delv_price_B").text();
    //     jq(".xans-product-detail .prdDesc .price_area > span").text(text);
    // },
};
