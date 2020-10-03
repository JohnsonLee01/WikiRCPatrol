    /**
     * Báo cáo bất kỳ người dùng nào về trang dự án được định cấu hình trước
     * Nếu quản trị viên, hãy cấm thành viên trong thời gian đặt trước
     * @param {*} thành viên để báo cáo 
     */
    rcpatrol.report = function (user) {

        if (mw.config.get("wgUserGroups").includes("sysop")) {
            //LÀM:  nhận đề xuất cấm cho những thành viên phá hoại (24 giờ đối với lần cấm đầu tiên, 72 giờ đối với lần cấm thứ hai, 3^(n-1) ngày đối với (lần cấm thứ n))
            //cũng như:  cấm API
            var blockwindow = window.open(mw.config.get("wgArticlePath").replace("$1", "Special:Block/" + user));
            blockwindow.alert("Thành viên đã nhận được cảnh báo cuối cùng trong 24 giờ qua, vì vậy cửa sổ này đã được mở. Khi bạn hoàn tất việc cấm thành viên, bạn có thể đóng tab này và quay trở lại RC patrol.");
        } else {
            if (aivreportuser) {
                var reportinfo = prompt("Nhập thông tin về báo cáo tại đây: ");
                reportinfo = reportinfo ? reportinfo : "Phá hoại sau cảnh báo cuối cùng.";
                $.get(mw.config.get("wgScriptPath") + "/api.php", {
                    "action": "query",
                    "format": "json",
                    "meta": "tokens",
                    "type": "csrf",
                    "uselang": mw.config.get("wgUserLanguage")
                }).done(function (result) {
                    $.post(mw.config.get("wgScriptPath") + "/api.php", {
                        "action": "edit",
                        "format": "json",
                        "title": rcpatrol.reportpage,
                        "summary": "[[User:Awesome Aasim/rcpatrol|RCP]] báo cáo " + user,
                        "appendtext": rcpatrol.reportstring.replace("$1", user).replace("$2", reportinfo) + " ~~" + "~~",
                        "uselang": mw.config.get("wgUserLanguage")
                    }).done(function (result) {
                        if (result.error) {
                            alert(result.error.info);
                        } else {
                            mw.notify("Thành viên đã được báo cáo cho bảo quản viên.");
                        }
                    });
                });
            }
        }
    }
