jq(() => {
    footerItemJsPkg.init();
});

const footerItemJsPkg = {
    init: function () {
        this.footerJs();
    },
    footerJs: () => {
        setTimeout(() => {
            jq("#footer .info > span i").on("click", function () {
                jq(this).toggleClass("on");
                jq(this).parent().parent().find("> div").slideToggle();
            });
        }, 1000);
    },
};
