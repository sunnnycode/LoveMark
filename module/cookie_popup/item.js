jq(() => {
    cookiePopupItemJsPkg.init();
});

const cookiePopupItemJsPkg = {
    init: function () {
        // cookiePopupItemJsPkg.createCookiePopup("a", 1, "/web/img/common/popup_01.png");
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
    createCookiePopup: (type, num, con) => {
        if (cookiePopupItemJsPkg.getCookie(`cp${num}`) != "y") {
            function appendCloseBar(num) {
                jq("#cookie_popup > div").append(`<div class="close_bar cp${num}"><div class="btn_01">오늘하루열지않기</div><div class="btn_02">닫기</div></div>`);
            }

            jq("#cookie_popup").addClass("on");
            jq("body").addClass("hold");
            if (type == "a") {
                // img popup
                jq("#cookie_popup > div").append(`<div class="contents cp${num}"><img src="${con}" alt="cp${num}"/></div>`);
                appendCloseBar(num);
            } else if (type == "b") {
                // text popup
                jq("#cookie_popup > div").append(`<div class="contents cp${num}">${con}</div>`);
                appendCloseBar(num);
            }
            setTimeout(() => {
                jq("#cookie_popup > div").addClass("on");
            }, 100);

            cookiePopupItemJsPkg.removeCookiePopup(num);
        }
    },
    removeCookiePopup: (num) => {
        jq(`.close_bar.cp${num} > div`).on("click", function () {
            if (jq(this).hasClass("btn_01")) {
                cookiePopupItemJsPkg.setCookie(`cp${num}`, "y", 1);
            } else if (jq(this).hasClass("btn_02")) {
                cookiePopupItemJsPkg.setCookie(`cp${num}`, "n", -1);
            }
            jq(`#cookie_popup .cp${num}`).remove();
            console.log(jq("#cookie_popup").find(`div[class*="cp"]`).length);
            if (jq("#cookie_popup").find(`div[class*="cp"]`).length == 0) {
                jq("#cookie_popup").remove();
                jq("body").removeClass("hold");
            }
        });
    },
    cookiePopupAnimation: () => {},
};
