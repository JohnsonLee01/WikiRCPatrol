    /**
     * Cấu hình cho Wikipedia tiếng Việt 
     * Cuối cùng điều này sẽ được lưu trữ ở nơi khác trên một trang riêng biệt, có thể tại [[:en:Project:RC Patrol Script/config.js]]
     * Ý tưởng là bất kỳ mô-đun cụ thể nào cần được vô hiệu hóa hoặc cấu hình lại có thể được thực hiện như vậy trên cơ sở wiki của wiki bằng cách "lập trình lại" nó tại đây.
     * Tệp cấu hình phải được khóa để chỉ bảo quản viên mới có thể sửa đổi nó.
     */
    rcpatrol.reportpage = "Wikipedia:Tin nhắn cho bảo quản viên#Báo cáo thành viên phá hoại"; //trang mà thành viên sẽ được báo cáo
    rcpatrol.reportstring = "\n\n* {{vandal|1=$1}} - $2"; //mẫu chuỗi để sử dụng cho báo cáo
    rcpatrol.dropdown = [
        {
            keycode: 84, //t
            val: "Sửa đổi thử nghiệm",
            summary: "Sửa đổi thử nghiệm",
            template: "uw-test"
        },
        {
            keycode: 69, //e
            val: "Sửa đổi gây hại",
            summary: "[[Wikipedia:Sửa đổi gây hại|Sửa đổi gây hại]]",
            template: "uw-disruptive"
        },
        {
            keycode: 77, //m
            val: "Vi phạm cẩm nang biên soạn",
            summary: "Vi phạm [[Wikipedia:Cẩm nang biên soạn|cẩm nang biên soạn]]",
            template: "uw-mos"
        },
        {
            keycode: 65, //a
            val: "Tấn công cá nhân",
            summary: "[[WP:NPA|Sửa đổi gây tấn công cá nhân]]",
            template: "uw-npa"
        },
        {
            keycode: 76, //l
            val: "Vi phạm tiểu sử người đang sống",
            summary: "Vi phạm [[Wikipedia:Tiểu sử người đang sống|chính sách về tiểu sử người đang sống]]",
            template: "uw-biog"
        },
        {
            keycode: 78, //n
            val: "Vi phạm thái độ trung lập",
            summary: "Vi phạm [[Wikipedia:Thái độ trung lập|thái độ trung lập]]",
            template: "uw-npov"
        },
        {
            keycode: 85, //u
            val: "Không nguồn",
            summary: "[[Wikipedia:Thông tin kiểm chứng được|Thông tin không nguồn kiểm chứng]]",
            template: "uw-unsourced"
        },
        {
            keycode: 68, //d
            val: "Xoá nội dung không giải thích được",
            summary: "Xoá nội dung không giải thích được",
            template: "uw-delete"
        },
        {
            keycode: 66, //b
            val: "Tẩy trống trang",
            summary: "Tẩy trống trang",
            template: "uw-blank"
        },
        {
            keycode: 86, //v
            val: "Phá hoại",
            summary: "Sửa đổi phá hoại",
            template: "uw-vandalism"
        },
        {
            keycode: 83, //s
            val: "Liên kết spam",
            summary: "Liên kết ngoài không phù hợp",
            template: "uw-spam"
        },
        {
            keycode: 80, //p
            val: "Quảng cáo",
            summary: "Sử dụng ngôn từ quảng bá trong bài viết",
            template: "uw-advert"
        }
    ];
