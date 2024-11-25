jq(() => {
    commonJsPkg.init();
});

const commonJsPkg = {
    init: function () {
        this.tabFunc();
        this.transCateLink();
        this.paginateConfirm();
        this.nbspRemove();
    },
    tabFunc: () => {
        jq("ul.tabs li").click(function () {
            var tab_id = jq(this).attr("data-tab");

            jq(this).parent().find("> li").removeClass("current");
            jq(this).parent().parent().find(".tab-content").removeClass("current");

            jq(this).addClass("current");
            jq(this)
                .parent()
                .parent()
                .find("." + tab_id)
                .addClass("current");
        });
    },
    transCateLink: () => {
        const cateLi = jq(".xans-layout-category li.xans-record-");
        cateLi.each(function () {
            jq(this)
                .find("a")
                .attr("href", "/product/list.html?cate_no=" + jq(this).find("a").attr("href").split("/")[3]);
        });
    },
    paginateConfirm: () => {
        if (jq(".ec-base-paginate ol").children().length > 1) {
            jq(".ec-base-paginate").show();
        }
    },
    nbspRemove: () => {
        const img = jq("img");
        img.each(function () {
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
    numberWithCommas: (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    numberRemoveCommas: (x) => {
        return x.replace(/,/g, "");
    },
    productSwiper: (target, view) => {
        jq(target).addClass("swiper");
        jq(target).find(".prdList").addClass("swiper-wrapper");
        jq(target).find(".prdList").children().addClass("swiper-slide");
        jq(target).append(`
            <div class="swiper-pagination" style="position:static;margin-top:20px;"></div>
        `);

        const swiper = new Swiper(target, {
            slidesPerView: view,
            spaceBetween: 10,
            pagination: {
                el: `${target} .swiper-pagination`,
                clickable: true,
            },
        });
    },
};
