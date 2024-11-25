jq(() => {
    faqItemJsPkg.init();
});

const faqItemJsPkg = {
    init: function () {
        this.foldJs();
    },
    foldJs: function () {
        jq(".faq-wr li p").on("click", function () {
            jq(this).parent().find("span").toggleClass("on");
        });
    },
};
