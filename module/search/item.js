jq(() => {
    searchItemJsPkg.init();
});

const searchItemJsPkg = {
    init: function () {
        this.searchLayerOnOff();
    },
    searchLayerOnOff: () => {
        jq("#header .header_search").on("click", function () {
            jq(".search-area").fadeToggle(200);
            jq("body, html").toggleClass("hold");
            jq("#mask").toggleClass("on search");
        });
        jq(".search-area .close_btn").on("click", function () {
            jq(".search-area").fadeOut(200);
            jq("body, html").removeClass("hold");
            jq("#mask").removeClass("on search");
        });
        setTimeout(() => {
            jq(".search-area .search-wr input").attr("onmousedown", "");
            jq(".search-area .search-wr input").attr("placeholder", "");
        }, 300);
    },
};
