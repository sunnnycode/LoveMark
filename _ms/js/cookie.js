jq(() => {
    cookiePopupPkg.init();
});

const cookiePopupPkg = {
    init: function () {
        if (cookiePopupPkg.getCookie("ms_header_banner") == "y") {
            console.log("yes");
            jq("#header .top-banner").hide();
        } else {
            jq("#header .top-banner").show("on");
        }

        jq("#header .top-banner .close-btn").on("click", () => {
            cookiePopupPkg.setCookie(`ms_header_banner`, "y", 1);
            jq("#header .top-banner").hide();
        });
    },
    setCookie: (name, value, expiredays) => {
        const todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = `${name}=${escape(value)}; path=/; expires=${todayDate.toGMTString()};`;
    },
    getCookie: (name) => {
        const cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            if (name == cookieArr[i].replace(/(^\s*)|(\s*$)/, "").split("=")[0]) {
                return cookieArr[i].replace(/(^\s*)|(\s*$)/, "").split("=")[1];
            }
        }
    },
};
