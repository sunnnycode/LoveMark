jq(() => {
    fixedItemJsPkg.init();
});

const fixedItemJsPkg = {
    init: function () {
        this.fixedMenu();
    },
    fixedMenu: () => {
        jq(window).on("scroll", function () {
            if (jq(this).scrollTop() > 200) {
                jq(".move_btn").fadeIn();
            } else {
                jq(".move_btn").fadeOut();
            }
        });

        jq(".move_btn .top").on("click", () => {
            jq("html, body").animate({ scrollTop: 0 }, 400);
            return false;
        });

        jq(".move_btn .bottom").on("click", () => {
            const scrollHeight = jq(document).height();
            jq("html, body").animate({ scrollTop: scrollHeight + 400 }, 400);
            return false;
        });
    },
};
