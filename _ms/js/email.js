jq(() => {
    emailJsPkg.init();
});

const emailJsPkg = {
    init: function () {
        // this.emailJs();
    },
    emailJs: () => {
        emailjs.init("#####");
        // user_#####
        jq("input[name=submit]").on("click", () => {
            var templateParams = {
                name: jq("input[name=name]").val(),
                phone: jq("input[name=phone]").val(),
                email: jq("input[name=email]").val(),
                message: jq("textarea[name=message]").val(),
            };

            let empty = 0;
            const keys = Object.keys(templateParams);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = templateParams[key];
                if (value.length == 0) {
                    empty += 1;
                }
            }

            if (empty > 0) {
                alert("모든 내용을 입력해주세요!");
            } else {
                emailjs.send("#####", "#####", templateParams).then(
                    // service_#####
                    // template_#####
                    function (response) {
                        console.log("SUCCESS!", response.status, response.text);
                        alert("메일을 성공적으로 보냈습니다!");
                    },
                    function (error) {
                        console.log("FAILED...", error);
                        alert("메일 전송을 실패했습니다!<br/>고객센터로 문의해주세요.");
                    }
                );
            }
        });
    },
};

// <div class="email">
// 	 <input type="text" name="name" placeholder="성함을 입력해주세요" />
// 	 <input type="text" name="email" placeholder="메일 주소를 입력해주세요" />
// 	 <input type="text" name="phone" placeholder="연락처를 입력해주세요 (생략 가능)" />
// 	 <textarea name="message" rows="5" placeholder="내용을 입력해주세요 "></textarea>
// 	 <input type="button" name="submit" class="btn white" value="메일보내기" />
// </div>
