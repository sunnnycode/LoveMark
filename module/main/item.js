jq(() => {
    mainItemJsPkg.init();
});

const mainItemJsPkg = {
    init: function () {
        this.mainSwiper();
        // this.popupProduct();
    },
    mainSwiper: () => {
        const swiper1 = new Swiper(".main-wr .main-slide.swiper", {
            slidesPerView: 1,
            navigation: {
                nextEl: ".main-wr .main-slide .swiper-button-next",
                prevEl: ".main-wr .main-slide .swiper-button-prev",
            },
            pagination: {
                el: ".main-wr .main-slide .swiper-pagination",
                type: "fraction",
            },
        });

        commonJsPkg.productSwiper(".xans-product-listmain-4", 1);
        commonJsPkg.productSwiper(".xans-product-listmain-5", 1);
        commonJsPkg.productSwiper(".xans-product-listmain-6", 1);
        commonJsPkg.productSwiper(".xans-product-listmain-7", 1);

        const swiper2 = new Swiper(".banner__slide .swiper2", {
            slidesPerView: 1,
            pagination: {
                el: ".banner__slide .swiper-pagination",
                clickable: true,
            },
        });
        const swiper3 = new Swiper(".magazineSwiper", {
            spaceBetween: 20,
            pagination: {
                el: ".swiper-pagination",
            },
        });
    },
    popupProduct: () => {
        jq("#popup-load").load("/_ms/inc/popup_product/popup.html?cate_no=24 #popup-content", function () {
            var review = jq(".popup-slide .owl-carousel").owlCarousel({
                items: 2,
                margin: 10,
                center: true,
                loop: true,
            });
        });

        jq("body").on("click", ".popup-product-contents .thumb", function () {
            var data = jq(this).closest(".item").attr("data-link");
            jq("body").append('<div class="load-popup-content" />');
            jq(".load-popup-content").load("/_ms/inc/popup_product/popup_detail.html" + data + " #popup-product", function () {
                setTimeout(function () {
                    jq(".popup-product-wrap").addClass("active");
                    jq(".popup-product-wrap, #popup-product .mask").addClass("on");
                }, 100);
            });
        });

        jq("body").on("click", ".popup-header i, #popup-product .mask", function () {
            jq(".popup-product-wrap").removeClass("active");
            setTimeout(function () {
                jq(".load-popup-content").remove();
            }, 300);
        });
    },
};
