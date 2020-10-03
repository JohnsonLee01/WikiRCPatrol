    /**
     * Bắt đầu biên dịch tại đây
     */
    rcpatrol.i18n = {
        reasontorollback: {
            vi: 'Lý do lùi sửa (tuỳ chọn)'
        },
        rollback: {
            vi: 'Lùi sửa'
        },
        rollingback: {
            vi: 'Đang lùi sửa...'
        },
        rollbackfailed: {
            vi: 'Lùi sửa thất bại'
        },
        rollbacksuccess: {
            vi: 'Lùi sửa thành công'
        },
        rollbacksummary: {
            vi: '[[w:en:User:Awesome Aasim/rcpatrol|RCP]] đã lùi lại sửa đổi của [[Special:Contributions/$2|$2]] ([[User_talk:$2|thảo luận]]); quay về phiên bản cuối của [[Special:Contributions/$1|$1]]'
        },
        warnsummary: {
            vi: '[[w:en:User:Awesome Aasim/rcpatrol|RCP]] gửi cảnh báo đến $1 về [[$2]]'
        },
        reportsummary: {
            vi: '[[w:en:User:Awesome Aasim/rcpatrol|RCP]] báo cáo $1'
        },
        rollbacktitle: {
            vi: "Lùi lại sửa đổi của thành viên này",
        },
        previousedit: {
            vi: 'Sửa đổi trước đó'
        },
        previousedittitle: {
            vi: 'Tải các bản sửa đổi trước đó trong danh sách'
        },
        nextedit: {
            vi: 'Sửa đổi tiếp theo'
        },
        nextedittitle: {
            vi: 'Tải các bản sửa đổi tiếp theo trong danh sách'
        },
        refresh: {
            vi: 'Tải lại'
        },
        connectionlost: {
            vi: 'Mất kết nối'
        },
        connectionlostdiffmessage: {
            vi: "Không thể tải bản khác biệt. Xin vui lòng kiểm tra kết nối Internet của bạn. Bản khác biệt sẽ tự động tải lại khi kết nối Internet được thiết lập."
        },
        thank: {
            vi: 'Cảm ơn'
        },
        thanktitle: {
            vi: "Cảm ơn thành viên này vì các sửa đổi của họ"
        },
        rollbackandwarn: {
            vi: 'Lùi sửa và cảnh báo'
        },
        endoflist: {
            vi: 'Đã đến cuối danh sách. Đang tải danh sách tiếp theo...'
        },
        thankssent: {
            vi: 'Đã gửi lời cảm ơn!'
        },
        rcpatroltitle: {
            vi: 'Tuần tra thay đổi gần đây'
        },
        rcpatroltitlewithdiff: {
            vi: 'Tuần tra thay đổi gần đây "$1"'
        },
        delete: {
            vi: 'Xoá'
        },
        protect: {
            vi: 'Khoá'
        },
        block: {
            vi: 'Cấm'
        },
        history: {
            vi: 'Xem lịch sử trang'
        },
        diff: {
            vi: 'Xem khác biệt'
        }
    }
    /**
     * Kết thúc quá trình biên dịch.  KHÔNG ĐƯỢC PHÉP SỬA DÒNG BÊN DƯỚI.
     */
    rcpatrol.msgs = {};
    for (var i in rcpatrol.i18n) {
        rcpatrol.msgs[i] = rcpatrol.i18n[mw.config.get("wgUserLanguage")] ? rcpatrol.i18n[mw.config.get("wgUserLanguage")] : rcpatrol.i18n["en"]; //luôn trở ngôn ngữ lại tiếng Anh nếu bản dịch thư không hoàn chỉnh
    }
