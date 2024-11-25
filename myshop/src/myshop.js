jq(() => {
    mypageItemJsPkg.init();
});

const mypageItemJsPkg = {
    init: function () {},
    orderListInput: () => {
        jq(".xans-myshop-orderhistoryhead fieldset .ec-base-button a.eDataSet").on("click", function () {
            jq("#dataSearch").toggleClass("on");
        });
    },
    submitBtnChange: () => {
        jq("#dataSearch input").attr("src", "/web/img/common/submit_btn.png");
    },
    orderDetail: () => {
        // titleToggle
        jq(".xans-myshop-orderhistorydetail .title").on("click", function () {
            jq(this).siblings().stop().slideToggle();
            jq(this).toggleClass("on");
        });

        // 합계 상품 가격 토글
        jq(".order-total-price .price-title").on("click", function () {
            jq(this).toggleClass("on");
            jq(".xans-myshop-orderhistorydetail .order-total-price ul").stop().slideToggle();
        });

        // 결제정보 토글
        jq(".xans-myshop-orderhistorydetail .order-cash-info .folder-btn p").on("click", function () {
            const nonLiLen = jq(this).parent().parent().find("> ul.folder > li.displaynone").length;
            const liLen = jq(this).parent().parent().find("> ul.folder > li").length;
            if (nonLiLen !== liLen) {
                jq(this).parent().parent().find("> .folder").stop().slideToggle();
            }
        });

        // 최종 결제 정보 토글
        jq(".xans-myshop-orderhistorydetailpaymentfinal > li").each(function () {
            if (jq(this).find(" > div > p").html() == "") {
                jq(this).find(" > p").addClass("removeAfter");
            }
        });
    },

    recent: () => {
        // 최근 본 상품 소비자가 지우기
        jq(".xans-product-recentlist > ul > li").each(function () {
            const strike = Number(jq(this).find(".info .strike > strong").text().split("원")[0].replace(",", ""));
            const price = Number(jq(this).find(".info .price > strong").text().split("원")[0].replace(",", ""));

            if (strike == price) {
                jq(this).find(".info .strike").hide();
            }
        });
    },
    wishList: () => {
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
};
