jq(() => {
    timeSaleJsPkg.init();
});

const timeSaleJsPkg = {
    init: function () {},
    listSaleTimeCast: () => {
        // list
        jq(".spec li[rel='할인 기간']").each(function () {
            const ymd = jq(this).find(".layerDiscountPeriod .content p:nth-child(3)").text().split("~ ")[1].split(" ")[0].split("-");
            const hm = jq(this).find(".layerDiscountPeriod .content p:nth-child(3)").text().split("~ ")[1].split(" ")[1].split(":");
            jq(this).parent().parent().parent().parent().find(".time-count").show();
            timeSaleJsPkg.countDownTimer(jq(this).parent().parent().parent().parent().find(".time-count > div"), `${ymd[0]}/${ymd[1]}/${ymd[2]} ${hm[0]}:${hm[1]}:00`);
        });
    },
    detailSaleTimeCast: () => {
        // detail
        const time = jq(".info_contents ul li[rel='할인 기간']");

        if (time.length !== 0) {
            if (time.find(".period").text() !== "") {
                jq(".time-count").show();
            }
            const ymd = time.find(".period").text().split("~ ")[1].split(" ")[0].split("-");
            const hm = time.find(".period").text().split("~ ")[1].split(" ")[1].split(":");
            timeSaleJsPkg.countDownTimer(jq(".time-count > div"), `${ymd[0]}/${ymd[1]}/${ymd[2]} ${hm[0]}:${hm[1]}:00`);
        }
    },
    countDownTimer: (target, date) => {
        // 전달 받은 일자
        let _vDate = new Date(date);
        let _second = 1000;
        let _minute = _second * 60;
        let _hour = _minute * 60;
        let _day = _hour * 24;
        let timer;

        function showRemaining() {
            let now = new Date();
            let distDt = _vDate - now;
            if (distDt < 0) {
                clearInterval(timer);
                jq(target).text("타임할인 종료");
                return;
            }
            let days = Math.floor(distDt / _day);
            let hours = Math.floor((distDt % _day) / _hour);
            let minutes = Math.floor((distDt % _hour) / _minute);
            let seconds = Math.floor((distDt % _minute) / _second);

            if (String(days).length == 1) {
                days = `0${days}`;
            }

            if (String(hours).length == 1) {
                hours = `0${hours}`;
            }

            if (String(minutes).length == 1) {
                minutes = `0${minutes}`;
            }

            if (String(seconds).length == 1) {
                seconds = `0${seconds}`;
            }

            if (days !== 0) {
                jq(target).html(`
                    <div class="days"><span>${days}</span></div>
                    <span> : </span>
                    <div class="hours"><span>${hours}</span></div>
                    <span> : </span>
                    <div class="minutes"><span>${minutes}</span></div>
                    <span> : </span>
                    <div class="seconds"><span>${seconds}</span></div>
                `);
            } else {
                jq(target).html(`
                    <div class="hours"><span>${hours}</span></div>
                    <span> : </span>
                    <div class="minutes"><span>${minutes}</span></div>
                    <span> : </span>
                    <div class="seconds"><span>${seconds}</span></div>
                `);
            }
        }
        timer = setInterval(showRemaining, 1000);
    },
};
