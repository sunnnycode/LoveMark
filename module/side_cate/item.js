jq(() => {
    sideCateItemJsPkg.init();
});

const sideCateItemJsPkg = {
    init: function () {
        this.sideCateOnOff();
        this.sideCateAccordion();
        this.recentProduct();
    },
    sideCateOnOff: () => {
        jq(".bottom_menu_bar .cate_btn").on("click", function () {
            // $offset = jq("#wrap").offset();
            // jq("html, body").animate({ scrollTop: $offset.top }, 0);
            jq(".side-cate").addClass("on");
            jq("#mask").addClass("on");
            jq("body, html").addClass("hold");
        });
        jq("#mask, #mask i").on("click", function () {
            jq(".side-cate").removeClass("on");
            jq(".search-area").fadeOut(200);
            jq("#mask").removeClass("on search");
            jq("body, html").removeClass("hold");
        });
    },
    sideCateAccordion: () => {
        const sideCateLi = jq(".side-cate .cate_ul_wr > ul > li");
        sideCateLi.each(function () {
            const thisLiP = jq(this).find("p");
            jq(thisLiP).on("click", function () {
                jq(this).parent().find("ul").slideToggle();
            });
        });
    },
    recentProduct: () => {
        setTimeout(() => {
            if (jq(".side-cate .xans-layout-productrecent > ul > li.xans-record-").length > 0) {
                jq(".side-cate .recent_product").show();
            }
        }, 100);
    },
};
