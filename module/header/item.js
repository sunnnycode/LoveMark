jq(() => {
    headerItemJsPkg.init();
});

const headerItemJsPkg = {
    init: function () {
        this.headerFixed();
        this.headerJs();
        this.headerSwiper();
        this.headerSearch();
        this.bottomMenu();
    },
    bottomMenu: () => {
        if (jq(".titleArea h2").text() == "카테고리") {
            jq(".bottom_menu_bar ul li:nth-child(2)").addClass("active");
        } else if (jq(".titleArea h2").text() == "매거진") {
            jq(".bottom_menu_bar ul li:nth-child(3)").addClass("active");
        } else if (jq(".titleArea h2").text() == "장바구니") {
            jq(".bottom_menu_bar ul li:nth-child(4)").addClass("active");
        } else if (jq(".titleArea h2").text() == "마이페이지" || jq(".titleArea h2").text() == "주문내역 조회" || jq(".titleArea h2").text() == "적립금 내역" || jq(".titleArea h2").text() == "쿠폰 내역" || jq(".titleArea h2").text() == "최근 본 상품" || jq(".titleArea h2").text() == "나의 위시리스트" || jq(".titleArea h2").text() == "JOIN" || jq(".titleArea h2").text() == "나의 게시글" || jq(".titleArea h2").text() == "회원정보 수정" || jq(".titleArea h2").text() == "배송지 관리" || jq(".login-wr .sec_02 p").text() == "로그인") {
            jq(".bottom_menu_bar ul li:nth-child(5)").addClass("active");
        } else {
            jq(".bottom_menu_bar ul li.home_btn").addClass("active");
        }
    },
    headerSearch: () => {
        jq("#header .header-wr .header_search fieldset input").prop("placeholder", "검색어를 입력해주세요");
    },
    headerFixed: () => {
        var top = jq("#header").offset().top + 120;
        jq(window).scroll(function () {
            var y = jq(this).scrollTop();
            if (y >= top) {
                jq("#header").addClass("fixed");
            } else {
                jq("#header").removeClass("fixed");
            }
        });
    },
    headerJs: () => {
        let lastScrollTop = 0;
        let navbarHeight = 0;
        setTimeout(() => {
            navbarHeight = jq("#header").outerHeight();
        }, 300);

        jq(window).on("scroll", function () {
            // 스크롤 상,하 감지
            let st = jq(document).scrollTop();
            if (lastScrollTop > 100) {
                if (st > lastScrollTop) {
                    // down
                    jq("#header").css("transform", `translateY(-${navbarHeight}px)`);
                    jq(".search-area").hide();
                } else if (st + 5 < lastScrollTop) {
                    // up
                    jq("#header").css("transform", "translateY(0)");
                }
            } else if (lastScrollTop < 100) {
            }
            lastScrollTop = st;
        });
    },
    headerSwiper: () => {
        const swiper = new Swiper("#header .top-banner.swiper", {
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 3000,
            },
        });
    },
};
