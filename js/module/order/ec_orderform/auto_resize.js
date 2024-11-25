EC$('.wrap').on('keyup', 'textarea', function () {
    EC$(this).height(0);
    EC$(this).height(this.scrollHeight);
});
EC$('.wrap').find('textarea').keyup();

function closePopup() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    var isInstagram = (ua.indexOf('Instagram') > -1) ? true : false;

    if (isInstagram) {
        window.history.go(-1);
    } else {
        self.close();
    }
}