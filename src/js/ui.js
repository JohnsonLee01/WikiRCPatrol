    /**
     * Tải tất cả các mục OOUI, bao gồm các nút nhấn, v.v...
     */

    rcpatrol.rcpatrolbar = new OO.ui.HorizontalLayout({ align: 'inline' });
    rcpatrol.rcpatrolbox = new OO.ui.TextInputWidget({
        autosize: true,
        placeholder: 'Lý do lùi sửa (tuỳ chọn)',
        icon: 'textSummary',
        align: 'inline'
    });
    rcpatrol.rcpatrolbutton = new OO.ui.ButtonWidget({
        autosize: true,
        label: 'Lùi sửa',
        flags: [
            'primary',
            'progressive'
        ],
        icon: "editUndo",
        align: 'inline'
    });
    rcpatrol.rollbackbar = new OO.ui.ActionFieldLayout(rcpatrol.rcpatrolbox, rcpatrol.rcpatrolbutton, { align: "inline" });
    rcpatrol.previouseditbutton = new OO.ui.ButtonWidget({
        autosize: true,
        label: 'Sửa đổi trước đó',
        icon: "previous",
        align: 'inline'
    });
    rcpatrol.nexteditbutton = new OO.ui.ButtonWidget({
        autosize: true,
        label: 'Sửa đổi tiếp theo',
        icon: "next",
        align: 'inline'
    });
    rcpatrol.fetchbutton = new OO.ui.ButtonWidget({
        autosize: true,
        label: 'Tải lại',
        icon: "reload",
        align: 'inline'
    });
    rcpatrol.thankbutton = new OO.ui.ButtonWidget({
        autosize: true,
        label: 'Cảm ơn',
        icon: "heart",
        align: 'inline'
    });
    rcpatrol.dropdownmenu = new OO.ui.DropdownWidget({
        label: "Lùi sửa và cảnh báo...",
        icon: "speechBubbleAdd",
        menu: {
            items: []
        }
    });
    rcpatrol.rcpatrolbar.addItems([
        rcpatrol.previouseditbutton,
        rcpatrol.nexteditbutton,
        rcpatrol.fetchbutton,
        rcpatrol.thankbutton
    ]);
    rcpatrol.rcpatrolbutton.$element.attr("title", "Lùi lại sửa đổi của thành viên này [ctrl-alt R]");
    rcpatrol.thankbutton.$element.attr("title", "Cảm ơn thành viên này vì các sửa đổi của họ [ctrl-alt =]");
    rcpatrol.nexteditbutton.$element.attr("title", "Tải các bản sửa đổi tiếp theo trong danh sách [ctrl-alt space]");
    rcpatrol.previouseditbutton.$element.attr("title", "Tải các bản sửa đổi trước đó trong danh sách [ctrl-alt ,]");
    for (var i in rcpatrol.dropdown) {
        var temp = new OO.ui.MenuOptionWidget({
            data: rcpatrol.dropdown[i].keycode,
            label: rcpatrol.dropdown[i].val
        });
        temp.$element.attr("title", rcpatrol.dropdown[i].val + (String.fromCharCode(rcpatrol.dropdown[i].keycode) ? " [ctrl-alt " + String.fromCharCode(rcpatrol.dropdown[i].keycode) + "]" : ""));
        rcpatrol.dropdownmenu.getMenu().addItems([temp]);
    }
    /**
     * Huỷ kích hoạt/kích hoạt bộ điều khiển RC patrol
     * @param {*} bool có tắt các điều khiển hay không
     */
    rcpatrol.setDisabled = function (bool) {
        rcpatrol.isDisabled = bool;
        rcpatrol.dropdownmenu.setDisabled(bool);
        rcpatrol.previouseditbutton.setDisabled(bool);
        rcpatrol.nexteditbutton.setDisabled(bool);
        rcpatrol.rcpatrolbutton.setDisabled(bool);
        rcpatrol.rcpatrolbox.setDisabled(bool);
        rcpatrol.thankbutton.setDisabled(bool);
        rcpatrol.fetchbutton.setDisabled(bool);
    };
