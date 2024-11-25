jq(() => {
    searchJsPkg.init();
});

const searchJsPkg = {
    init: function () {
        this.getlist(".ec-base-product .prdList li[id*='anchorBoxId_']", "li[rel*='최적'] span:nth-child(2)", "li[rel='판매가'] span:nth-child(2)", "li[rel='소비자가'] span:nth-child(2)");
        // this.soldOutBlur();
    },
    getlist: (list, bestPrice, price, customPrice) => {
        const allList = jq(list);
        allList.each(function () {
            if (jq(this).find(bestPrice).text() == "") {
                searchJsPkg.pushPrice(searchJsPkg.getPrice(jq(this).find(price)), searchJsPkg.getCustomPrice(jq(this).find(customPrice)), jq(this).find(".discount_rate .product_price"), jq(this).find(".discount_rate .product_custom"), jq(this).find(".discount_rate .rate"));
            } else {
                searchJsPkg.pushPrice(searchJsPkg.getPrice(jq(this).find(bestPrice)), searchJsPkg.getCustomPrice(jq(this).find(customPrice)), jq(this).find(".discount_rate .product_price"), jq(this).find(".discount_rate .product_custom"), jq(this).find(".discount_rate .rate"));
            }
            jq(this).find(bestPrice).remove();
            jq(this).find(price).remove();
            jq(this).find(customPrice).remove();
        });
    },
    getPrice: (price) => {
        return commonJsPkg.numberRemoveCommas(price.text().split("원")[0]);
    },
    getCustomPrice: (customPrice) => {
        return commonJsPkg.numberRemoveCommas(customPrice.text().split("원")[0]);
    },
    pushPrice: (price, customPrice, priceArea, customPriceArea, rateArea) => {
        if (customPrice == "") {
            priceArea.text(`${commonJsPkg.numberWithCommas(price)}원`);
            customPriceArea.remove();
            rateArea.remove();
        } else {
            priceArea.text(`${commonJsPkg.numberWithCommas(price)}원`);
            customPriceArea.text(`${commonJsPkg.numberWithCommas(customPrice)}원`);
            if (Math.round(((Number(customPrice) - Number(price)) / Number(customPrice)) * 100) == 0) {
                customPriceArea.remove();
                rateArea.remove();
            } else {
                rateArea.text(Math.round(((Number(customPrice) - Number(price)) / Number(customPrice)) * 100) + "%");
            }
        }
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
