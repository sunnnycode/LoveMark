jq(() => {
    cateJsPkg.init();
});

const cateJsPkg = {
    init: function () {
        $allCateObj = {};

        this.cateCustomJs();
        // this.listPath();
    },
    cateCustomJs: () => {
        const cateCustomObj = {
            get: () => {
                $.ajax({
                    url: "/exec/front/Product/SubCategory",
                    dataType: "json",
                    success: (data) => {
                        for (let i = 0; i < data.length; i++) {
                            $allCateObj["cate" + data[i].cate_no] = [data[i].cate_no, data[i].parent_cate_no, data[i].name, []];
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    },
                });
            },
            pushChildCate: () => {
                const keys = Object.keys($allCateObj);

                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = $allCateObj[key];

                    if ($allCateObj["cate" + value[1]] !== undefined) {
                        if (value[1] != 1) {
                            $allCateObj["cate" + value[1]][3].push(value[0]);
                        }
                    }
                }
            },
            appendSubCate: (li) => {
                const cate = li;
                cate.each(function () {
                    const childNum = $allCateObj["cate" + jq(this).data("cate")][3];
                    if (childNum.length > 0) {
                        jq(this).append(`<span></span><ul></ul>`);
                    }
                    for (let i = 0; i < childNum.length; i++) {
                        jq(this)
                            .find("ul")
                            .append(`<li id="cate${childNum[i]}" data-cate="${childNum[i]}"><a href="/product/list.html?cate_no=${childNum[i]}">${$allCateObj["cate" + childNum[i]][2]}</a></li>`);
                    }
                });
            },
            toggleSubCate: () => {
                jq("#category .position span").on("click", function () {
                    jq(this).parent().find("> ul").slideToggle();
                    jq(this).toggleClass("on");
                });
            },
        };

        cateCustomObj.get();

        setTimeout(() => {
            cateCustomObj.pushChildCate();
            cateCustomObj.appendSubCate(jq("#category .position > ul > li[id*='cate']"));
            cateCustomObj.appendSubCate(jq("#category .position > ul > li[id*='cate'] > ul > li"));
            cateCustomObj.appendSubCate(jq("#category .position > ul > li[id*='cate'] > ul > li > ul > li"));
            cateCustomObj.toggleSubCate();
        }, 300);
    },
    listPath: () => {
        let check_url = window.location.href;
        let cateNumChk;
        cateNumChk = check_url.split("cate_no=")[1];
        if (cateNumChk.indexOf("&") > -1) {
            cateNumChk = cateNumChk.split("&")[0];
            cateNumChk = cateNumChk.replace(/[^0-9]/g, "").trim();
        } else {
            cateNumChk = cateNumChk.replace(/[^0-9]/g, "").trim();
        }

        setTimeout(() => {
            // 카테고리 불러오기
            const cateLi = jq(".side-cate .position > ul > li");
            cateLi.each(function () {
                jq(".all-path ul.cate-depth-01").append(`
                    <li><a href="${jq(this).find("> a").attr("href")}">${jq(this).find("> a").text()}</a></li>
                `);
            });

            // 부모 없을 때
            if ($allCateObj[`cate${cateNumChk}`][1] == 1) {
                // 대분류 텍스트 넣기
                jq(".currnet-path ul li.depth-01 span").text($allCateObj[`cate${cateNumChk}`][2]);

                // 자식 넣기
                let childArr = $allCateObj[`cate${cateNumChk}`][3];

                for (let i = 0; i < childArr.length; i++) {
                    let childCate = `cate${childArr[i]}`;
                    jq(".all-path ul.cate-depth-02").append(`
                        <li><a href="/product/list.html?cate_no=${$allCateObj[childCate][0]}">${$allCateObj[childCate][2]}</a></li>
                    `);
                }
            }

            // 부모 있을 때
            for (let i = 0; i < Object.keys($allCateObj).length; i++) {
                // 부모 텍스트 넣기, '전체' 링크 넣기
                if ($allCateObj[Object.keys($allCateObj)[i]][0] == $allCateObj[`cate${cateNumChk}`][1]) {
                    jq(".currnet-path ul li.depth-01 span").text($allCateObj[Object.keys($allCateObj)[i]][2]);
                    jq(".all-path ul.cate-depth-02 > li:nth-child(1) a").attr("href", `/product/list.html?cate_no=${$allCateObj[Object.keys($allCateObj)[i]][0]}`);
                }

                // 형제 리스트 넣기
                if ($allCateObj[Object.keys($allCateObj)[i]][1] !== 1) {
                    // 자신 텍스트 넣기
                    if ($allCateObj[`cate${cateNumChk}`][1] !== 1) {
                        jq(".currnet-path ul li.depth-02 span").text($allCateObj[`cate${cateNumChk}`][2]);
                    }

                    if ($allCateObj[Object.keys($allCateObj)[i]][1] == $allCateObj[`cate${cateNumChk}`][1]) {
                        jq(".all-path ul.cate-depth-02").append(`
                            <li><a href="/product/list.html?cate_no=${$allCateObj[Object.keys($allCateObj)[i]][0]}">${$allCateObj[Object.keys($allCateObj)[i]][2]}</a></li>
                        `);
                    }
                }
            }

            // 현재 위치 on
            const currentPath1 = jq(".all-path ul.cate-depth-01 > li");
            currentPath1.each(function () {
                if (jq(this).find("> a").text() == jq(".currnet-path ul li.depth-01 span").text()) {
                    jq(this).addClass("on");
                }
            });

            const currentPath2 = jq(".all-path ul.cate-depth-02 > li");
            currentPath2.each(function () {
                if (jq(this).find("> a").text() == jq(".currnet-path ul li.depth-02 span").text()) {
                    jq(this).addClass("on");
                }
            });

            // 영역 오픈
            setTimeout(() => {
                jq(".currnet-path").show();
            }, 50);
        }, 200);

        // click event

        jq(".currnet-path ul li.depth-01").on("click", function () {
            jq(this).toggleClass("on");
            jq(".all-path .cate-depth-01").toggleClass("on");
            if (jq(".currnet-path ul li.depth-02").hasClass("on")) {
                jq(".currnet-path ul li.depth-02").removeClass("on");
                jq(".all-path .cate-depth-02").removeClass("on");
            }
        });

        jq(".currnet-path ul li.depth-02").on("click", function () {
            jq(this).toggleClass("on");
            jq(".all-path .cate-depth-02").toggleClass("on");
            if (jq(".currnet-path ul li.depth-01").hasClass("on")) {
                jq(".currnet-path ul li.depth-01").removeClass("on");
                jq(".all-path .cate-depth-01").removeClass("on");
            }
        });
    },
};
