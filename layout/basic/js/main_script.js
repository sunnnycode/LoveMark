jQuery(document).ready(function () {
    /* 메인이미지가 1장 이상일때 실행   */
    jQuery(".swiper1 .swiper-wrapper").each(function () {
        var swiperslidelength = jQuery(".swiper-slide", this).length;

        if (swiperslidelength > 1) {
            var swiper1 = new Swiper(".swiper1", {
                spaceBetween: 0,
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: ".swiper-pagination1",
                    clickable: true,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });
        }
    });

    /* 메인배너가 1장 이상일때 실행   */
    jQuery(".swiper2 .swiper-wrapper").each(function () {
        var swiperslidelengtha = jQuery(".swiper-slide", this).length;

        if (swiperslidelengtha > 1) {
            var swiper2 = new Swiper(".swiper2", {
                spaceBetween: 0,
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: ".swiper-pagination2",
                    clickable: true,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });
        }
    });
});
