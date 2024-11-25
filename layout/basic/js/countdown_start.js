jQuery(document).ready(function () {
    sale_percent(); //  타임세일실행.
});

/*  [더보기] 버튼 클릭시 상품로딩되고 0.4초후 재계산 */
jQuery(".typeMoreview").click(function () {
    setTimeout("sale_percent();", 400);
});

function sale_percent() {
    //더보기 클릭시 재실행 위해 감싸줌
    /*  타임세일.  */
    var today = new GetServerTime(); // 현재서버시간 each 밖으로 빼서 한번만 실행.

    jQuery(".layerDiscountPeriod ul li + li").each(function (index) {
        var date_data = jQuery(this).text();
        var date_start_end = date_data.split(" ~ "); // 시작시간 끝시간으로 자름
        var start_time = new Date(date_start_end[0].replace(/-/g, "/")); //앞에 남은시간 텍스트 자름
        var end_time = new Date(date_start_end[1].replace(/-/g, "/"));
        var product_sale = jQuery(this).parents(".spec").find(".price.sale  span > span").hide().text();

        if (today < start_time) {
            // 세일 시작 전
        } else if (start_time <= today && today < end_time) {
            // 타임세일 중
            TimerStart(jQuery(this).parents(".description").find(".saletime"), 1, end_time);
            jQuery(".layerDiscountPeriod").parents(".description").find(".timesale_box").css("display", "block");
            jQuery(this).parents(".description").find(".sale_per").html(product_sale);
        } else {
        }
    });

    //flag = 0 시작전,  flag = 1 마감전
    function TimerStart(obj, flag, end_time, end_time2) {
        if (flag == 0) {
        } else {
            obj.countdown({
                until: end_time,
                serverSync: GetServerTime,
                compact: true,
                padZeroes: true,
                onExpiry: function () {
                    obj.html("SALE END");
                },
                layout: "<div class='untilStart'><span>{dn}</span>day:<span>{hn}</span>:<span>{mn}</span>:<span>{sn}</span></div>",
            });
        }
    }

    /* 서버시간 가져오는 스크립트 */
    function GetServerTime(param, formula) {
        /* All HTTP date/time stamps MUST be represented in Greenwich Mean Time (GMT), without exception
	* 
	* This function returns a Date or String type value
	* 
	* var time = GetServerTime(); // [date] Wed Oct 11 2017 09:48:52 GMT+0900 (대한민국 표준시)
	var time = GetServerTime(""); // "2017-10-11" , can be any string or variable except as provided below 
	var time = GetServerTime("day", -1); // "2017-10-10"
	var time = GetServerTime("week", -1); // "2017-10-04"
	var time = GetServerTime("month", 1); // "2017-11-11" 
	var time = GetServerTime("year", 1); // "2018-11-11"
	*/
        var xmlHttp;
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest(); // upper IE7, Chrome, Firefox
            xmlHttp.open("HEAD", window.location.href.toString(), false);
            xmlHttp.setRequestHeader("Content-Type", "text/html");
            xmlHttp.send("");

            //return xmlHttp.getResponseHeader("Date");
        } else if (window.ActiveXObject) {
            //Old versions of IE supported the ability to use ActiveX controls inside the browser.

            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            xmlHttp.open("HEAD", window.location.href.toString(), false);
            xmlHttp.setRequestHeader("Content-Type", "text/html");
            xmlHttp.send("");
            //return xmlHttp.getResponseHeader("Date");
        }
        //return xmlHttp.getResponseHeader("Date");
        var serverTime = xmlHttp.getResponseHeader("Date");

        if (param != null) {
            var ymd = new Date(serverTime);
            param = param.toLowerCase().trim();

            if (formula != null) {
                if (!typeof formula == "number") {
                    console.log("변수 formula는 number타입이어야 합니다.");
                } else if (param == "day") {
                    ymd.setDate(ymd.getDate() + formula);
                } else if (param == "week") {
                    ymd.setDate(ymd.getDate() + 7 * formula);
                } else if (param == "month") {
                    ymd.setMonth(ymd.getMonth() + formula);
                } else if (param == "year") {
                    ymd.setFullYear(ymd.getFullYear() + formula);
                }
            }
            var month = "" + (ymd.getMonth() + 1),
                day = "" + ymd.getDate(),
                year = ymd.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
        } else {
            return new Date(serverTime);
        }
    }
}
