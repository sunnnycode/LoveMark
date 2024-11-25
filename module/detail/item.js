jq(() => {
    detailItemJsPkg.init();
});

const detailItemJsPkg = {
    init: function () {
        this.reviewListBtn();
    },
    reviewListBtn: () => {
        if (jq(".xans-product-review .board > li").length > 0) {
            jq("#prdReview .board > .ec-base-button a:nth-child(2)").addClass("on");
        }
    },
};
