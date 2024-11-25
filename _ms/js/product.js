jq(() => {
    productJsPkg.init();
});

const productJsPkg = {
    init: function () {
        $unit = "원";
        // ₩ = &#8361;

        this.litSort();
        this.listCurrentPathRemove();
        this.getlist(".ec-base-product .prdList li[id*='anchorBoxId_']", "li[rel*='최적'] span:nth-child(1)", "li[rel='판매가'] span:nth-child(1)", "li[rel='소비자가'] span:nth-child(1)");
        this.cusReview();
        // this.soldOutBlur();
        // this.listCurrentPath();
        // this.colorCount();
    },
    cusReview: () => {
        const prdItem = jq(".ec-base-product .prdList  > li");

        prdItem.each(function () {
            jq(this).find(".cus_review > span").text(jq(this).find(".spec li[rel='리뷰'] > span").text());
        });
    },
    getlist: (list, bestPrice, price, customPrice) => {
        const allList = jq(list);
        allList.each(function () {
            if (jq(this).find(bestPrice).text() == "") {
                productJsPkg.pushPrice(productJsPkg.getPrice(jq(this).find(price)), productJsPkg.getCustomPrice(jq(this).find(customPrice)), jq(this).find(".discount_rate .product_price"), jq(this).find(".discount_rate .product_custom"), jq(this).find(".discount_rate .rate"));
            } else {
                productJsPkg.pushPrice(productJsPkg.getPrice(jq(this).find(bestPrice)), productJsPkg.getCustomPrice(jq(this).find(customPrice)), jq(this).find(".discount_rate .product_price"), jq(this).find(".discount_rate .product_custom"), jq(this).find(".discount_rate .rate"));
            }
            jq(this).find(bestPrice).remove();
            jq(this).find(price).remove();
            jq(this).find(customPrice).remove();
        });
    },
    getPrice: (price) => {
        if ($unit == "원") {
            return commonJsPkg.numberRemoveCommas(price.text().split($unit)[0]);
        } else {
            return commonJsPkg.numberRemoveCommas(price.text().split($unit)[1]);
        }
    },
    getCustomPrice: (customPrice) => {
        if ($unit == "원") {
            return commonJsPkg.numberRemoveCommas(customPrice.text().split($unit)[0]);
        } else {
            return commonJsPkg.numberRemoveCommas(customPrice.text().split($unit)[1]);
        }
    },
    pushPrice: (price, customPrice, priceArea, customPriceArea, rateArea) => {
        if (customPrice == "") {
            if ($unit == "원") {
                priceArea.text(commonJsPkg.numberWithCommas(price) + $unit);
            } else {
                priceArea.text($unit + commonJsPkg.numberWithCommas(price));
            }

            customPriceArea.remove();
            rateArea.remove();
        } else {
            if ($unit == "원") {
                priceArea.text(commonJsPkg.numberWithCommas(price) + $unit);
                customPriceArea.text(commonJsPkg.numberWithCommas(customPrice) + $unit);
            } else {
                priceArea.text($unit + commonJsPkg.numberWithCommas(price));
                customPriceArea.text($unit + commonJsPkg.numberWithCommas(customPrice));
            }

            if (Math.round(((Number(customPrice) - Number(price)) / Number(customPrice)) * 100) == 0) {
                customPriceArea.remove();
                rateArea.remove();
            } else {
                rateArea.text(Math.round(((Number(customPrice) - Number(price)) / Number(customPrice)) * 100) + "%");
            }
        }
    },
    listCurrentPathRemove: () => {
        jq(".currnet_path").remove();
    },
    listCurrentPath: () => {
        if (jq(".currnet_path")) {
            setTimeout(() => {
                jq(".currnet_path").css("opacity", 1);
            }, 100);
        }

        jq(".currnet_path ul li.depth_01").on("click", function () {
            jq(this).toggleClass("on");
            jq(".all_path .cate_depth_01").toggleClass("on");
            if (jq(".currnet_path ul li.depth_02").hasClass("on")) {
                jq(".currnet_path ul li.depth_02").removeClass("on");
                jq(".all_path .cate_depth_02").removeClass("on");
            }
        });

        jq(".currnet_path ul li.depth_02").on("click", function () {
            jq(this).toggleClass("on");
            jq(".all_path .cate_depth_02").toggleClass("on");
            if (jq(".currnet_path ul li.depth_01").hasClass("on")) {
                jq(".currnet_path ul li.depth_01").removeClass("on");
                jq(".all_path .cate_depth_01").removeClass("on");
            }
        });
    },
    litSort: () => {
        const sortLi = jq("#selArray option");
        sortLi.each(function () {
            if (jq(this).val() !== "") {
                jq(".sort > ul").append(`<li><a href='/product/list.html${jq(this).val()}'>${jq(this).text()}</a></li>`);
            }
        });

        jq("#selArray").remove();
        jq(".sort > p").on("click", function () {
            jq(this).toggleClass("on");
            jq(".sort > ul").slideToggle();
        });

        const currentUrl = jq(location).attr("href");
        if (currentUrl.indexOf("sort_method=1") != -1) {
            jq(".sort > p span").text("상품명");
        } else if (currentUrl.indexOf("sort_method=2") != -1) {
            jq(".sort > p span").text("제조사");
        } else if (currentUrl.indexOf("sort_method=3") != -1) {
            jq(".sort > p span").text("낮은가격");
        } else if (currentUrl.indexOf("sort_method=4") != -1) {
            jq(".sort > p span").text("높은가격");
        } else if (currentUrl.indexOf("sort_method=5") != -1) {
            jq(".sort > p span").text("신상품");
        } else if (currentUrl.indexOf("sort_method=6") != -1) {
            jq(".sort > p span").text("인기상품");
        } else if (currentUrl.indexOf("sort_method=7") != -1) {
            jq(".sort > p span").text("사용후기");
        } else {
            jq(".sort > p span").text("상품정렬");
        }
    },
    colorCount: () => {
        // 컬러 갯수
        const colorCount = jq(".colorCount");
        colorCount.each(function () {
            if (jq(this).parent().parent().find(".spec li[rel='상품색상'] .color span").length == 0) {
                jq(this).find("span").text(1);
            } else {
                jq(this).find("span").text(jq(this).parent().parent().find(".spec li[rel='상품색상'] .color span").length);
            }
        });
    },
    soldOutBlur: () => {
        const productListLi = jq(".ec-base-product .prdList > li");
        productListLi.each(function () {
            if (jq(this).find(".icon img[alt='품절']").length == 1) {
                jq(this).addClass("blur");
                jq(this).find(".summary").remove();
                jq(this).find(".discount_rate").remove();
                jq(this).find(".spec").text("SOLD OUT");
            }
        });
    },
};
