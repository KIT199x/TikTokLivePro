"use strict";

const I18N = {
  vi: {
    "brand.sub": "Bảng điều khiển",
    "hint.keys": "Space phát · ← → cảnh",
    "nav.stage": "Sân khấu",
    "nav.library": "Thư viện",
    "nav.script": "Kịch bản",
    "nav.interact": "Tương tác",
    "nav.stream": "Luồng",
    "nav.settings": "Cài đặt",
    "nav.about": "Giới thiệu",
    "page.stage": "Sân khấu",
    "page.library": "Thư viện video",
    "page.script": "Kịch bản",
    "page.interact": "Tương tác",
    "page.stream": "Luồng LIVE Studio",
    "page.settings": "Cài đặt",
    "page.about": "Giới thiệu",
    "action.addVideo": "Thêm video",
    "action.newScript": "Kịch bản mới",
    "action.stage": "Sân khấu",
    "action.play": "Phát",
    "action.stop": "Dừng",
    "action.prev": "Trước",
    "action.next": "Sau",
    "action.add": "Thêm",
    "action.copy": "Chép",
    "action.showControls": "Hiện bảng điều khiển",
    "action.delete": "Xóa",
    "action.cancel": "Hủy",
    "confirm.title": "Xác nhận",
    "action.up": "Lên",
    "action.down": "Xuống",
    "stage.region": "Vùng phát",
    "stage.emptyTitle": "Sân khấu trống",
    "stage.emptyBody": "Cảnh 1 là video nền. Video khác chỉ phát khi có luật tương tác, hoặc khi chọn video rồi bấm phát.",
    "library.title": "Thư viện video",
    "library.count": "Thư viện · {n}",
    "library.empty": "Chưa có video trong thư viện.",
    "library.foot": "MP4 H.264 phát ổn định nhất. Link luồng nằm ở menu Luồng.",
    "library.added": "Đã thêm {n} video.",
    "library.confirmDelete": "Xóa {name} khỏi thư viện?",
    "script.none": "Chưa có kịch bản.",
    "script.create": "Tạo kịch bản",
    "script.title": "Kịch bản",
    "script.open": "Đang mở",
    "script.name": "Tên",
    "script.mode": "Chế độ phát",
    "script.continuous": "Phát liên tiếp",
    "script.segments": "Phát theo đoạn",
    "script.helpContinuous": "Cảnh 1 phát lặp làm nền. Cảnh khác chỉ chạy khi chọn rồi bấm phát, hoặc khi đúng luật tương tác.",
    "script.helpSegments": "Cảnh 1 lặp từ mốc vào đến mốc ra. Cảnh khác chỉ chạy khi chọn rồi bấm phát, hoặc khi đúng luật tương tác.",
    "script.loop": "Lặp lại",
    "script.live": "Nhãn LIVE",
    "script.fit": "Khung hình",
    "script.contain": "Vừa khung",
    "script.cover": "Phủ kín",
    "script.addScene": "Thêm cảnh",
    "script.addAll": "Gắn toàn bộ video",
    "script.delete": "Xóa kịch bản",
    "script.order": "Thứ tự phát",
    "script.noScene": "Chưa có cảnh. Thêm cảnh hoặc gắn toàn bộ video.",
    "script.noVideo": "chưa có video",
    "script.end": "hết",
    "script.scene": "Cảnh",
    "script.missing": "(thiếu file)",
    "script.unselected": "(chưa chọn)",
    "videoSearch.empty": "Không có video khớp",
    "videoSearch.searching": "Đang tìm…",
    "script.confirmDelete": "Xóa kịch bản \"{name}\"?",
    "script.sample": "Kịch bản mẫu",
    "script.n": "Kịch bản {n}",
    "script.fallback": "Kịch bản",
    "overlay.shared": "Chữ chung",
    "overlay.add": "Thêm dòng chữ",
    "overlay.none": "Chưa có dòng chữ.",
    "overlay.empty": "(trống)",
    "overlay.content": "Nội dung",
    "overlay.hint": "Các mã trên được thay bằng ngày giờ lúc phát, cập nhật liên tục.",
    "overlay.size": "Cỡ chữ",
    "overlay.color": "Màu",
    "overlay.x": "Vị trí X %",
    "overlay.y": "Vị trí Y %",
    "overlay.align": "Căn",
    "overlay.left": "Trái",
    "overlay.center": "Giữa",
    "overlay.right": "Phải",
    "overlay.bold": "Đậm",
    "overlay.bg": "Nền",
    "overlay.bgDark": "Tối",
    "overlay.bgSoft": "Mờ",
    "overlay.bgNone": "Không nền",
    "overlay.delete": "Xóa dòng chữ",
    "overlay.sceneTitle": "Cảnh đang chọn",
    "overlay.sceneText": "Chữ của cảnh này",
    "overlay.pickScene": "Chọn hoặc thêm một cảnh.",
    "overlay.default": "Dòng chữ",
    "overlay.sample": "Nội dung {time}",
    "scene.title": "Tên cảnh",
    "scene.video": "Video",
    "scene.in": "Mốc vào (giây hoặc phút:giây)",
    "scene.out": "Mốc ra (để trống = hết video)",
    "scene.outPlaceholder": "hết video",
    "scene.markIn": "Lấy mốc vào",
    "scene.markOut": "Lấy mốc ra",
    "scene.preview": "Xem cảnh",
    "scene.delete": "Xóa cảnh",
    "scene.n": "Cảnh {n}",
    "scene.confirmDelete": "Xóa {name}?",
    "queue.title": "Hàng chờ",
    "queue.empty": "Không có video đang chờ.",
    "queue.now": "Đang phát · {name}",
    "queue.gift": "Quà {match}",
    "queue.comment": "“{match}”",
    "room.title": "Tương tác người xem",
    "room.user": "Tài khoản TikTok đang live",
    "room.userPlaceholder": "ten_tai_khoan",
    "room.key": "Signing key",
    "room.keyPlaceholder": "Chỉ cần nếu không vào được phòng",
    "room.keySaved": "Đã lưu — nhập key mới nếu muốn đổi",
    "room.listen": "Nghe live",
    "room.stop": "Dừng nghe",
    "room.idle": "Chưa nghe phòng live.",
    "room.hint": "Comment có từ khóa, hoặc quà trùng tên, sẽ phát video đã chọn. Người mới vào phòng được đọc tên và cảm ơn bằng tiếng nói.",
    "room.connecting": "Đang vào phòng live…",
    "room.listening": "Đang nghe bình luận, quà và người vào phòng.",
    "room.stopped": "Đã dừng nghe.",
    "room.lost": "Mất kết nối phòng live.",
    "room.ended": "Phiên live đã kết thúc.",
    "room.notlive": "Tài khoản này chưa lên live, hoặc tên đăng nhập chưa đúng.",
    "room.fail": "Không vào được phòng live. {detail}",
    "room.unreachable": "Không vào được phòng live.",
    "room.stopping": "Đang dừng…",
    "room.needuser": "Hãy nhập tài khoản TikTok đang live.",
    "room.preview": "Bản xem trước không vào được phòng TikTok.",
    "trigger.add": "Thêm luật phát",
    "trigger.empty": "Chưa có luật. Thêm từ khóa hoặc tên quà, rồi chọn video.",
    "trigger.gift": "Quà",
    "trigger.comment": "Comment",
    "trigger.giftPlaceholder": "Tên quà, ví dụ Rose",
    "trigger.keyword": "Từ khóa trong comment",
    "stream.title": "Luồng cho LIVE Studio",
    "stream.help": "LIVE Studio không nhận địa chỉ 127.0.0.1. Dán link dưới đây, bật Độ phân giải tùy chỉnh, nhập W {w} và H {h}, rồi giữ Bật âm thanh.",
    "stream.opening": "Đang mở cổng…",
    "stream.openingStatus": "Đang mở cổng phát…",
    "stream.ready": "Dán link này vào LIVE Studio. Bật Độ phân giải tùy chỉnh: W {w}, H {h}. Giữ Bật âm thanh.",
    "settings.title": "Cá nhân hóa",
    "settings.theme": "Nền",
    "settings.dark": "Tối",
    "settings.light": "Sáng",
    "settings.lang": "Ngôn ngữ",
    "settings.playback": "Phát kịch bản",
    "settings.ratio": "Tỷ lệ khung",
    "settings.comments": "Comment trên luồng",
    "settings.commentsOn": "Hiện comment",
    "settings.viewers": "Mắt xem trên luồng",
    "settings.viewersOn": "Hiện mắt xem",
    "settings.likes": "Tim trên luồng",
    "settings.likesOn": "Hiện tim khi có lượt thích",
    "settings.randomHearts": "Random tim",
    "settings.randomHeartsHint": "Chỉ là hiệu ứng trên hình.",
    "settings.heartRate": "Số lượng tim",
    "settings.heartRateHint": "Random tim bay đúng số này mỗi giây, rồi nghỉ một nhịp. Lượt thích thật không hiện nhiều hơn số này.",
    "layout.left": "Trái %",
    "layout.bottom": "Đáy %",
    "layout.top": "Trên %",
    "layout.width": "Rộng %",
    "layout.height": "Cao %",
    "layout.scale": "Cỡ chữ %",
    "layout.hint": "Kéo khung trên sân khấu để đặt vị trí. Số này áp lên luồng stream.",
    "layout.hintViewer": "Kéo số mắt xem trên sân khấu để đặt vị trí.",
    "layout.sampleName": "Bình luận",
    "layout.drag": "Kéo để đổi vị trí",
    "layout.viewers": "Mắt xem",
    "layout.resizePanes": "Kéo để đổi bề rộng vùng phát và bảng bên cạnh",
    "layout.resizeStage": "Kéo để đổi kích thước vùng phát",
    "room.viewers": "Đang xem: {n}",
    "settings.hint": "Lựa chọn được lưu trên máy này. Lời cảm ơn người vào phòng và thứ trong ngày cũng đổi theo ngôn ngữ.",
    "toast.noVideo": "Thư viện chưa có video.",
    "toast.openFail": "Không mở được video này.",
    "toast.sceneVideoFail": "Không mở được video của cảnh này.",
    "toast.needScene": "Hãy thêm ít nhất một cảnh có video.",
    "toast.nonePlayable": "Không có cảnh nào phát được.",
    "toast.playFail": "Không phát được video. Hãy dùng MP4 H.264.",
    "toast.pickScene": "Hãy chọn một cảnh.",
    "toast.pickText": "Hãy chọn một dòng chữ trước.",
    "toast.markFirst": "Hãy bấm Xem cảnh, tua video, rồi lấy mốc.",
    "toast.copied": "Đã chép link.",
    "toast.error": "Có lỗi.",
    "mute.on": "Bật tiếng",
    "mute.off": "Tắt tiếng",
    "log.gift": "{user} tặng {gift} ×{amount}",
    "log.join": "{user} đã vào phòng",
    "log.chat": "{user}: {text}",
    "speech.thanks": "Cảm ơn {name} đã tham gia phiên live.",
    "speech.thanksGuest": "Cảm ơn bạn đã tham gia phiên live.",
    "speech.guestName": "Khán giả",
    "about.kicker": "TikTok Live Pro",
    "about.title": "Sân khấu cho phiên live của bạn",
    "about.lead": "Dựng kịch bản video trên máy, phủ ngày giờ và tương tác từ phòng live của bạn, rồi đưa khung hình sang TikTok LIVE Studio.",
    "about.step1Title": "Dựng kịch bản",
    "about.step1": "Thêm video và xếp cảnh. Cảnh 1 phát nền, các cảnh sau chỉ chạy khi được chọn hoặc khi có tương tác.",
    "about.step2Title": "Gắn tương tác",
    "about.step2": "Nghe phòng live. Comment đúng từ khóa hoặc quà trùng tên sẽ phát video đã chọn.",
    "about.step3Title": "Phát trên Studio",
    "about.step3": "Dán link luồng vào LIVE Studio, chọn đúng khổ khung và giữ bật âm thanh.",
    "about.scriptTitle": "Kịch bản",
    "about.scriptBody": "Cảnh 1 là video nền và lặp lại. Chọn một cảnh khác rồi bấm phát nếu muốn chiếu video đó.",
    "about.textTitle": "Chữ trên hình",
    "about.textBody": "Gắn dòng chữ riêng cho từng cảnh hoặc dùng chung. Ngày, giờ và thứ cập nhật theo thời gian thực.",
    "about.roomTitle": "Phòng live của bạn",
    "about.roomBody": "Đọc comment, quà, người mới vào, lượt thích và số người đang xem từ phòng live công khai của chính bạn.",
    "about.triggerTitle": "Phát theo tương tác",
    "about.triggerBody": "Một comment chứa từ khóa, hoặc một quà trùng tên, sẽ chen video đã chọn rồi quay lại cảnh 1.",
    "about.speechTitle": "Lời cảm ơn",
    "about.speechBody": "Khi có người vào phòng, ứng dụng đọc tên và nói lời cảm ơn đã tham gia phiên live.",
    "about.overlayTitle": "Lớp trên luồng",
    "about.overlayBody": "Hiện comment, số mắt xem và tim bay. Kéo để đặt vị trí, rồi chọn khung 9:16, 16:9 hoặc 1:1.",
    "about.studioTitle": "Link cho LIVE Studio",
    "about.studioBody": "Menu Luồng có địa chỉ để thêm nguồn liên kết. Bật độ phân giải tùy chỉnh đúng khổ đã chọn: 1080×1920, 1920×1080 hoặc 1080×1080.",
    "about.fine": "Ứng dụng chỉ đọc phòng live công khai của bạn để hiện tương tác thật. Không đăng nhập hộ và không tạo comment hay mắt xem giả."
  },
  en: {
    "brand.sub": "Control room",
    "hint.keys": "Space play · ← → scene",
    "nav.stage": "Stage",
    "nav.library": "Library",
    "nav.script": "Script",
    "nav.interact": "Interact",
    "nav.stream": "Stream",
    "nav.settings": "Settings",
    "nav.about": "About",
    "page.stage": "Stage",
    "page.library": "Video library",
    "page.script": "Script",
    "page.interact": "Interact",
    "page.stream": "LIVE Studio stream",
    "page.settings": "Settings",
    "page.about": "About",
    "action.addVideo": "Add video",
    "action.newScript": "New script",
    "action.stage": "Stage",
    "action.play": "Play",
    "action.stop": "Stop",
    "action.prev": "Previous",
    "action.next": "Next",
    "action.add": "Add",
    "action.copy": "Copy",
    "action.showControls": "Show controls",
    "action.delete": "Delete",
    "action.cancel": "Cancel",
    "confirm.title": "Please confirm",
    "action.up": "Up",
    "action.down": "Down",
    "stage.region": "Playback",
    "stage.emptyTitle": "Empty stage",
    "stage.emptyBody": "Scene 1 is the background video. Other videos play only from an interaction rule, or when you select one and press play.",
    "library.title": "Video library",
    "library.count": "Library · {n}",
    "library.empty": "No videos in the library yet.",
    "library.foot": "MP4 H.264 plays most reliably. The stream link is under Stream.",
    "library.added": "Added {n} videos.",
    "library.confirmDelete": "Remove {name} from the library?",
    "script.none": "No script yet.",
    "script.create": "Create script",
    "script.title": "Script",
    "script.open": "Open",
    "script.name": "Name",
    "script.mode": "Playback mode",
    "script.continuous": "Play through",
    "script.segments": "Play segments",
    "script.helpContinuous": "Scene 1 loops as the background. Other scenes play only if you select one and press play, or when an interaction rule matches.",
    "script.helpSegments": "Scene 1 loops between its in and out points. Other scenes play only if you select one and press play, or when an interaction rule matches.",
    "script.loop": "Loop",
    "script.live": "LIVE badge",
    "script.fit": "Frame",
    "script.contain": "Fit",
    "script.cover": "Fill",
    "script.addScene": "Add scene",
    "script.addAll": "Attach all videos",
    "script.delete": "Delete script",
    "script.order": "Play order",
    "script.noScene": "No scenes yet. Add a scene or attach every video.",
    "script.noVideo": "no video",
    "script.end": "end",
    "script.scene": "Scene",
    "script.missing": "(file missing)",
    "script.unselected": "(not selected)",
    "videoSearch.empty": "No matching video",
    "videoSearch.searching": "Searching…",
    "script.confirmDelete": "Delete script \"{name}\"?",
    "script.sample": "Sample script",
    "script.n": "Script {n}",
    "script.fallback": "Script",
    "overlay.shared": "Shared text",
    "overlay.add": "Add text",
    "overlay.none": "No text yet.",
    "overlay.empty": "(empty)",
    "overlay.content": "Content",
    "overlay.hint": "These tokens become the current date and time while playing.",
    "overlay.size": "Size",
    "overlay.color": "Color",
    "overlay.x": "Position X %",
    "overlay.y": "Position Y %",
    "overlay.align": "Align",
    "overlay.left": "Left",
    "overlay.center": "Center",
    "overlay.right": "Right",
    "overlay.bold": "Bold",
    "overlay.bg": "Background",
    "overlay.bgDark": "Dark",
    "overlay.bgSoft": "Soft",
    "overlay.bgNone": "None",
    "overlay.delete": "Delete text",
    "overlay.sceneTitle": "Selected scene",
    "overlay.sceneText": "Text on this scene",
    "overlay.pickScene": "Select or add a scene.",
    "overlay.default": "Text",
    "overlay.sample": "Caption {time}",
    "scene.title": "Scene name",
    "scene.video": "Video",
    "scene.in": "In point (seconds or min:sec)",
    "scene.out": "Out point (blank = end of video)",
    "scene.outPlaceholder": "end of video",
    "scene.markIn": "Set in point",
    "scene.markOut": "Set out point",
    "scene.preview": "Preview scene",
    "scene.delete": "Delete scene",
    "scene.n": "Scene {n}",
    "scene.confirmDelete": "Delete {name}?",
    "queue.title": "Queue",
    "queue.empty": "Nothing is waiting.",
    "queue.now": "Playing · {name}",
    "queue.gift": "Gift {match}",
    "queue.comment": "“{match}”",
    "room.title": "Viewer interaction",
    "room.user": "TikTok account that is live",
    "room.userPlaceholder": "username",
    "room.key": "Signing key",
    "room.keyPlaceholder": "Only if the room cannot be opened",
    "room.keySaved": "Saved — enter a new key to replace it",
    "room.listen": "Listen",
    "room.stop": "Stop listening",
    "room.idle": "Not listening to a live room.",
    "room.hint": "A keyword in a comment, or a matching gift, plays the chosen video. New viewers are thanked by name.",
    "room.connecting": "Joining the live room…",
    "room.listening": "Listening for comments, gifts, and joins.",
    "room.stopped": "Stopped listening.",
    "room.lost": "Lost the live room connection.",
    "room.ended": "The live session has ended.",
    "room.notlive": "This account is not live, or the username is wrong.",
    "room.fail": "Could not join the live room. {detail}",
    "room.unreachable": "Could not join the live room.",
    "room.stopping": "Stopping…",
    "room.needuser": "Enter the TikTok account that is live.",
    "room.preview": "The preview cannot join a TikTok room.",
    "trigger.add": "Add playback rule",
    "trigger.empty": "No rules yet. Add a keyword or gift name, then choose a video.",
    "trigger.gift": "Gift",
    "trigger.comment": "Comment",
    "trigger.giftPlaceholder": "Gift name, for example Rose",
    "trigger.keyword": "Keyword in a comment",
    "stream.title": "Stream for LIVE Studio",
    "stream.help": "LIVE Studio rejects 127.0.0.1. Paste the link below, turn on custom resolution, set W {w} and H {h}, and leave audio on.",
    "stream.opening": "Opening port…",
    "stream.openingStatus": "Opening the stream port…",
    "stream.ready": "Paste this link into LIVE Studio. Turn on custom resolution: W {w}, H {h}. Leave audio on.",
    "settings.title": "Personalization",
    "settings.theme": "Appearance",
    "settings.dark": "Dark",
    "settings.light": "Light",
    "settings.lang": "Language",
    "settings.playback": "Script playback",
    "settings.ratio": "Frame ratio",
    "settings.comments": "Comments on stream",
    "settings.commentsOn": "Show comments",
    "settings.viewers": "Viewers on stream",
    "settings.viewersOn": "Show viewers",
    "settings.likes": "Hearts on stream",
    "settings.likesOn": "Show hearts for likes",
    "settings.randomHearts": "Random hearts",
    "settings.randomHeartsHint": "Visual only.",
    "settings.heartRate": "Heart count",
    "settings.heartRateHint": "Random hearts use this many each second, then pause. Real likes never show more than this.",
    "layout.left": "Left %",
    "layout.bottom": "Bottom %",
    "layout.top": "Top %",
    "layout.width": "Width %",
    "layout.height": "Height %",
    "layout.scale": "Text size %",
    "layout.hint": "Drag the frame on the stage to place it. These numbers are used on the stream.",
    "layout.hintViewer": "Drag the viewer count on the stage to place it.",
    "layout.sampleName": "Comment",
    "layout.drag": "Drag to move",
    "layout.viewers": "Viewers",
    "layout.resizePanes": "Drag to resize the stage and the panel beside it",
    "layout.resizeStage": "Drag to resize the stage",
    "room.viewers": "Watching: {n}",
    "settings.hint": "This choice stays on this PC. Join thank-yous and weekday text follow the language too.",
    "toast.noVideo": "The library has no videos yet.",
    "toast.openFail": "This video could not be opened.",
    "toast.sceneVideoFail": "This scene's video could not be opened.",
    "toast.needScene": "Add at least one scene with a video.",
    "toast.nonePlayable": "No scene can be played.",
    "toast.playFail": "Playback failed. Use an MP4 H.264 file.",
    "toast.pickScene": "Select a scene first.",
    "toast.pickText": "Select a text line first.",
    "toast.markFirst": "Preview the scene, seek, then set the point.",
    "toast.copied": "Link copied.",
    "toast.error": "Something went wrong.",
    "mute.on": "Unmute",
    "mute.off": "Mute",
    "log.gift": "{user} sent {gift} ×{amount}",
    "log.join": "{user} joined",
    "log.chat": "{user}: {text}",
    "speech.thanks": "Thank you {name} for joining the live.",
    "speech.thanksGuest": "Thank you for joining the live.",
    "speech.guestName": "Viewer",
    "about.kicker": "TikTok Live Pro",
    "about.title": "A stage for your own live",
    "about.lead": "Build a video script on this PC, overlay the live clock and activity from your room, then send the frame to TikTok LIVE Studio.",
    "about.step1Title": "Build the script",
    "about.step1": "Add videos and arrange scenes. Scene 1 stays on as the background. Later scenes play only when selected or when someone interacts.",
    "about.step2Title": "Wire up interaction",
    "about.step2": "Listen to the live room. A comment with your keyword, or a matching gift, plays the video you chose.",
    "about.step3Title": "Play in Studio",
    "about.step3": "Paste the stream link into LIVE Studio, match the frame size, and leave audio on.",
    "about.scriptTitle": "Script",
    "about.scriptBody": "Scene 1 is the background and loops. Select another scene and press play to show that video.",
    "about.textTitle": "Text on the picture",
    "about.textBody": "Add text for one scene or for every scene. The date, time, and weekday stay current.",
    "about.roomTitle": "Your live room",
    "about.roomBody": "Read comments, gifts, new viewers, likes, and the viewer count from your own public live room.",
    "about.triggerTitle": "Play from interaction",
    "about.triggerBody": "A comment that contains a keyword, or a gift with the matching name, cuts in the chosen video and then returns to scene 1.",
    "about.speechTitle": "Thank-you",
    "about.speechBody": "When someone joins, the app says their name and thanks them for joining the live.",
    "about.overlayTitle": "On the stream",
    "about.overlayBody": "Show comments, the viewer count, and floating hearts. Drag them into place, then pick 9:16, 16:9, or 1:1.",
    "about.studioTitle": "Link for LIVE Studio",
    "about.studioBody": "The Stream menu has the address for a link source. Turn on a custom resolution that matches the frame: 1080×1920, 1920×1080, or 1080×1080.",
    "about.fine": "The app only reads your public live room so real interaction can appear. It does not sign in for you, and it does not invent comments or viewers."
  }
};

const FRAMES = {
  "9:16": { w: 1080, h: 1920 },
  "16:9": { w: 1920, h: 1080 },
  "1:1": { w: 1080, h: 1080 }
};

let theme = "dark";
let lang = "vi";
let ratio = "9:16";
let showComments = true;
let showViewers = true;
let showLikes = true;
let randomHearts = false;
let heartRate = 20;
const widgetLayout = {
  comment: { x: 4, y: 4, width: 78, height: 46, scale: 100 },
  viewer: { x: 4, y: 3.2, scale: 100 }
};
let viewerCount = null;
let roomStatusKey = "room.idle";
let roomHasKey = false;

function clampHeartRate(value) {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return 20;
  return Math.max(1, Math.min(80, n));
}

function t(key, vars) {
  const pack = I18N[lang] || I18N.vi;
  let text = pack[key] ?? I18N.vi[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, String(value));
    });
  }
  return text;
}

function loadLocalPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem("livescript.prefs") || "null");
    if (saved?.theme === "light" || saved?.theme === "dark") theme = saved.theme;
    if (saved?.lang === "en" || saved?.lang === "vi") lang = saved.lang;
    if (FRAMES[saved?.ratio]) ratio = saved.ratio;
    if (typeof saved?.showComments === "boolean") showComments = saved.showComments;
    if (typeof saved?.showViewers === "boolean") showViewers = saved.showViewers;
    if (typeof saved?.showLikes === "boolean") showLikes = saved.showLikes;
    if (typeof saved?.randomHearts === "boolean") randomHearts = saved.randomHearts;
    if (saved?.heartRate != null) heartRate = clampHeartRate(saved.heartRate);
    if (saved?.commentLayout) widgetLayout.comment = normalizeCommentLayout(saved.commentLayout);
    if (saved?.viewerLayout) widgetLayout.viewer = normalizeViewerLayout(saved.viewerLayout);
  } catch {
  }
}

function saveLocalPrefs() {
  localStorage.setItem("livescript.prefs", JSON.stringify({
    theme, lang, ratio, showComments, showViewers, showLikes, randomHearts, heartRate,
    commentLayout: widgetLayout.comment,
    viewerLayout: widgetLayout.viewer
  }));
}

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll("[data-theme-value]").forEach((button) => {
    const on = button.dataset.themeValue === theme;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function translateStatus(message) {
  if (!message) return "";
  if (message.startsWith("room.")) {
    const cut = message.indexOf("|");
    if (cut > 0) return t(message.slice(0, cut), { detail: message.slice(cut + 1) });
    return t(message);
  }
  return message;
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang-value]").forEach((button) => {
    const on = button.dataset.langValue === lang;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-pressed", on ? "true" : "false");
  });
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    if (el.id === "roomKey" && roomHasKey) el.placeholder = t("room.keySaved");
    else el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-tip]").forEach((el) => {
    const label = t(el.dataset.i18nTip);
    el.dataset.tip = label;
    el.setAttribute("aria-label", label);
  });
  setTab(document.body.dataset.tab || "stage");
  setPlayUi();
  setMuteUi();
  setRoomUi(roomMode, roomStatusKey);
  renderEventLog();
  applyFrame();
}

function frameOf(value) {
  return FRAMES[value] || FRAMES["9:16"];
}

function commentLines() {
  return liveEvents
    .filter((event) => event.kind === "comment")
    .slice(0, 5)
    .reverse()
    .map((event) => ({
      id: event.id,
      user: eventUser(event),
      text: String(event.text || "").replace(/\s+/g, " ").trim().slice(0, 140)
    }))
    .filter((line) => line.text);
}

function layoutNum(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return clamp(Math.round(n * 10) / 10, min, max);
}

function normalizeCommentLayout(raw) {
  return {
    x: layoutNum(raw?.x, 0, 90, 4),
    y: layoutNum(raw?.y, 0, 80, 4),
    width: layoutNum(raw?.width, 18, 100, 78),
    height: layoutNum(raw?.height, 12, 80, 46),
    scale: layoutNum(raw?.scale, 40, 250, 100)
  };
}

function normalizeViewerLayout(raw) {
  return {
    x: layoutNum(raw?.x, 0, 90, 4),
    y: layoutNum(raw?.y, 0, 90, 3.2),
    scale: layoutNum(raw?.scale, 40, 250, 100)
  };
}

function placeWidgets() {
  const feed = document.getElementById("commentFeed");
  const badge = document.getElementById("viewerBadge");
  const stage = document.getElementById("stage");
  const width = stage?.clientWidth || 360;
  if (feed) {
    const box = widgetLayout.comment;
    feed.style.left = `${box.x}%`;
    feed.style.bottom = `${box.y}%`;
    feed.style.right = "auto";
    feed.style.top = "auto";
    feed.style.width = `${box.width}%`;
    feed.style.maxHeight = `${box.height}%`;
    feed.style.fontSize = `${Math.max(12, Math.round(Math.max(14, width / 28) * box.scale / 100))}px`;
  }
  if (badge) {
    const box = widgetLayout.viewer;
    badge.style.left = `${box.x}%`;
    badge.style.top = `${box.y}%`;
    badge.style.fontSize = `${Math.max(12, Math.round(Math.max(16, width / 32) * box.scale / 100))}px`;
  }
}

function syncLayoutInputs() {
  const values = {
    commentX: widgetLayout.comment.x,
    commentY: widgetLayout.comment.y,
    commentW: widgetLayout.comment.width,
    commentH: widgetLayout.comment.height,
    commentScale: widgetLayout.comment.scale,
    viewerX: widgetLayout.viewer.x,
    viewerY: widgetLayout.viewer.y,
    viewerScale: widgetLayout.viewer.scale
  };
  Object.entries(values).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input && document.activeElement !== input) input.value = String(value);
  });
}

function readLayoutInputs() {
  widgetLayout.comment = normalizeCommentLayout({
    x: document.getElementById("commentX")?.value,
    y: document.getElementById("commentY")?.value,
    width: document.getElementById("commentW")?.value,
    height: document.getElementById("commentH")?.value,
    scale: document.getElementById("commentScale")?.value
  });
  widgetLayout.viewer = normalizeViewerLayout({
    x: document.getElementById("viewerX")?.value,
    y: document.getElementById("viewerY")?.value,
    scale: document.getElementById("viewerScale")?.value
  });
}

function saveLayoutPrefs() {
  saveLocalPrefs();
  if (!outputMode) post({
    type: "savePrefs",
    theme, lang, ratio, showComments, showViewers, showLikes, randomHearts, heartRate,
    commentLayout: widgetLayout.comment,
    viewerLayout: widgetLayout.viewer
  });
}

function bindWidgetDrag(element, kind) {
  if (!element) return;
  element.addEventListener("pointerdown", (event) => {
    if (outputMode || event.button !== 0) return;
    const stage = document.getElementById("stage");
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const box = widgetLayout[kind];
    const origin = { ...box };
    const startX = event.clientX;
    const startY = event.clientY;
    const move = (ev) => {
      const dx = ((ev.clientX - startX) / rect.width) * 100;
      const dy = ((ev.clientY - startY) / rect.height) * 100;
      if (kind === "comment") {
        box.x = layoutNum(origin.x + dx, 0, 90, origin.x);
        box.y = layoutNum(origin.y - dy, 0, 80, origin.y);
      } else {
        box.x = layoutNum(origin.x + dx, 0, 90, origin.x);
        box.y = layoutNum(origin.y + dy, 0, 90, origin.y);
      }
      placeWidgets();
      syncLayoutInputs();
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      saveLayoutPrefs();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    event.preventDefault();
  });
}

function paintCommentFeed(lines, enabled) {
  const feed = document.getElementById("commentFeed");
  if (!feed) return;
  placeWidgets();
  const visible = !!enabled && lines.length > 0;
  feed.hidden = !visible;
  if (!visible) {
    feed.dataset.key = "";
    feed.innerHTML = "";
    return;
  }
  const key = lines.map((line) => `${line.id}:${line.user}:${line.text}`).join("|");
  if (key === feed.dataset.key) return;
  feed.dataset.key = key;
  feed.innerHTML = lines.map((line) => `
    <div class="comment-line">
      <strong>${esc(line.user)}</strong>
      <span>${esc(line.text)}</span>
    </div>`).join("");
}

function paintLocalComments() {
  if (outputMode) return;
  const lines = commentLines();
  const feed = document.getElementById("commentFeed");
  if (showComments && !lines.length) {
    paintCommentFeed([{ id: "layout-preview", user: t("layout.sampleName"), text: t("layout.drag") }], true);
    feed?.classList.add("is-preview");
    return;
  }
  feed?.classList.remove("is-preview");
  paintCommentFeed(lines, showComments);
}

function formatViewers(count) {
  const n = Math.round(Number(count));
  if (!Number.isFinite(n) || n < 0) return "";
  return n.toLocaleString(lang === "en" ? "en-US" : "vi-VN");
}

function paintViewerBadge(count, enabled, preview) {
  const badge = document.getElementById("viewerBadge");
  if (!badge) return;
  placeWidgets();
  const n = Number(count);
  const visible = !!enabled && (preview || (count != null && count !== "" && Number.isFinite(n) && n >= 0));
  badge.hidden = !visible;
  badge.classList.toggle("is-preview", !!preview && visible);
  if (!visible) return;
  const label = badge.querySelector("span");
  const text = preview ? t("layout.viewers") : formatViewers(n);
  if (label && label.textContent !== text) label.textContent = text;
}

function paintViewerReadout() {
  const readout = document.getElementById("viewerReadout");
  if (!readout || outputMode) return;
  if (viewerCount == null) {
    readout.hidden = true;
    readout.textContent = "";
    return;
  }
  readout.hidden = false;
  readout.textContent = t("room.viewers", { n: formatViewers(viewerCount) });
}

function paintLocalViewers() {
  paintViewerReadout();
  if (outputMode) return;
  if (showViewers && viewerCount == null) paintViewerBadge(0, true, true);
  else paintViewerBadge(viewerCount, showViewers, false);
}

function setViewerCount(count) {
  if (count == null || count === "") viewerCount = null;
  else {
    const n = Number(count);
    viewerCount = Number.isFinite(n) && n >= 0 ? Math.round(n) : null;
  }
  paintLocalViewers();
}

const likeBursts = [];
const seenLikes = new Set();
const heartColors = ["#ff4d6a", "#ff2d55", "#ff8fab", "#ff6b8a", "#ffe4ec", "#ff3355"];

function spawnHearts(count, spreadMs) {
  const layer = document.getElementById("likeLayer");
  if (!layer) return;
  const n = Math.max(1, Math.min(80, Math.round(Number(count) || 1)));
  const spread = Math.max(0, Number(spreadMs) || 0);
  const windowMs = spread > 0 ? spread : Math.max(420, n * 110);
  const width = layer.clientWidth || 360;
  const rise = Math.round((layer.clientHeight || 640) * 0.72);
  const base = Math.max(22, Math.round(width / 26));
  for (let i = 0; i < n; i++) {
    if (layer.childElementCount >= 100) break;
    const heart = document.createElement("span");
    heart.className = "like-heart";
    heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.fontSize = `${Math.round(base * (0.55 + Math.random() * 0.7))}px`;
    heart.style.right = `${8 + Math.random() * 10}%`;
    heart.style.bottom = `${10 + Math.random() * 8}%`;
    heart.style.animationDelay = `${Math.round(Math.random() * windowMs)}ms`;
    heart.style.animationDuration = `${2.8 + Math.random() * 1.1}s`;
    heart.style.setProperty("--amp", `${Math.round(16 + Math.random() * 34)}px`);
    heart.style.setProperty("--sway-dur", `${(0.85 + Math.random() * 0.7).toFixed(2)}s`);
    heart.style.setProperty("--sway-delay", `-${Math.random().toFixed(2)}s`);
    heart.style.setProperty("--rot", `${Math.round(8 + Math.random() * 18)}deg`);
    heart.style.setProperty("--rise", `-${Math.round(rise * (0.62 + Math.random() * 0.34))}px`);
    heart.innerHTML = `<span class="like-heart-sway"><i class="fa-solid fa-heart" aria-hidden="true"></i></span>`;
    heart.addEventListener("animationend", (event) => {
      if (event.target !== heart || event.animationName !== "heart-rise") return;
      heart.remove();
    });
    layer.appendChild(heart);
  }
}

function clearHearts() {
  document.getElementById("likeLayer")?.replaceChildren();
}

function onLikes(message) {
  const id = String(message?.id || "");
  if (!id) return;
  const random = !!message.random;
  const count = random
    ? Math.max(1, Math.min(80, Math.round(Number(message.count) || 1)))
    : Math.max(1, Math.min(clampHeartRate(heartRate), Math.round(Number(message.count) || 1)));
  const spreadMs = random ? Math.max(400, Math.min(2000, Math.round(Number(message.spreadMs) || 1000))) : 0;
  likeBursts.push({ id, count, spreadMs, random, at: Date.now() });
  if (likeBursts.length > 40) likeBursts.shift();
  if (!outputMode && (random ? randomHearts : showLikes)) spawnHearts(count, spreadMs);
}

function recentLikes() {
  const now = Date.now();
  while (likeBursts.length) {
    const age = now - likeBursts[0].at;
    const keep = Math.max(3000, (likeBursts[0].spreadMs || 0) + 800);
    if (age <= keep) break;
    likeBursts.shift();
  }
  return likeBursts
    .filter((burst) => burst.random ? randomHearts : showLikes)
    .map(({ id, count, spreadMs }) => ({ id, count, spreadMs }));
}

let heartLoop = false;
let heartTimer = 0;

function scheduleRandomHearts() {
  if (!heartLoop) return;
  const rate = clampHeartRate(heartRate);
  const windowMs = 700 + Math.round(Math.random() * 800);
  const count = Math.max(1, Math.min(80, Math.round(rate * windowMs / 1000)));
  onLikes({
    id: `rand-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
    count,
    spreadMs: windowMs,
    random: true
  });
  const pause = 500 + Math.round(Math.random() * 2500);
  heartTimer = window.setTimeout(scheduleRandomHearts, windowMs + pause);
}

function syncHeartMode() {
  const box = document.getElementById("randomHearts");
  if (box) box.checked = randomHearts;
  if (outputMode) return;
  if (!randomHearts) {
    heartLoop = false;
    window.clearTimeout(heartTimer);
    heartTimer = 0;
    if (!showLikes) clearHearts();
    return;
  }
  if (!heartLoop) {
    heartLoop = true;
    scheduleRandomHearts();
  }
}

function playIncomingLikes(bursts, enabled) {
  if (!outputMode) return;
  const list = Array.isArray(bursts) ? bursts : [];
  if (!enabled) {
    list.forEach((burst) => burst?.id && seenLikes.add(burst.id));
    clearHearts();
    return;
  }
  list.forEach((burst) => {
    if (!burst?.id || seenLikes.has(burst.id)) return;
    seenLikes.add(burst.id);
    spawnHearts(burst.count, burst.spreadMs);
  });
  if (seenLikes.size > 120) {
    const keep = new Set(list.map((burst) => burst?.id).filter(Boolean));
    seenLikes.forEach((id) => { if (!keep.has(id)) seenLikes.delete(id); });
  }
}

function applyFrame() {
  if (!FRAMES[ratio]) ratio = "9:16";
  document.documentElement.dataset.ratio = ratio;
  document.querySelectorAll("[data-ratio-value]").forEach((button) => {
    const on = button.dataset.ratioValue === ratio;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-pressed", on ? "true" : "false");
  });
  const label = document.getElementById("ratioLabel");
  if (label) label.textContent = ratio;
  const frame = frameOf(ratio);
  const size = document.getElementById("ratioSize");
  if (size) size.textContent = `${frame.w} × ${frame.h}`;
  const help = document.querySelector('[data-i18n="stream.help"]');
  if (help) help.textContent = t("stream.help", frame);
  const box = document.getElementById("showComments");
  if (box) box.checked = showComments;
  const viewers = document.getElementById("showViewers");
  if (viewers) viewers.checked = showViewers;
  const likes = document.getElementById("showLikes");
  if (likes) likes.checked = showLikes;
  const rate = document.getElementById("heartRate");
  if (rate && document.activeElement !== rate) rate.value = String(heartRate);
  if (!showLikes && !randomHearts) clearHearts();
  syncHeartMode();
  syncLayoutInputs();
  placeWidgets();
  paintLocalComments();
  paintLocalViewers();
  const link = document.getElementById("outputLink");
  if (link?.value) applyOutputLink(link.value);
}

function setPreference(next) {
  if (next.theme === "light" || next.theme === "dark") theme = next.theme;
  if (next.lang === "en" || next.lang === "vi") lang = next.lang;
  if (FRAMES[next.ratio]) ratio = next.ratio;
  if (typeof next.showComments === "boolean") showComments = next.showComments;
  if (typeof next.showViewers === "boolean") showViewers = next.showViewers;
  if (typeof next.showLikes === "boolean") showLikes = next.showLikes;
  if (typeof next.randomHearts === "boolean") randomHearts = next.randomHearts;
  if (next.heartRate != null) heartRate = clampHeartRate(next.heartRate);
  saveLocalPrefs();
  applyTheme();
  applyLang();
  if (state.ready) renderAll();
  if (!outputMode) post({
    type: "savePrefs",
    theme, lang, ratio, showComments, showViewers, showLikes, randomHearts, heartRate,
    commentLayout: widgetLayout.comment,
    viewerLayout: widgetLayout.viewer
  });
}

function adoptHostPrefs(prefs) {
  if (!prefs) return;
  const nextTheme = prefs.theme === "light" || prefs.theme === "dark" ? prefs.theme : theme;
  const nextLang = prefs.language === "en" || prefs.language === "vi" ? prefs.language : lang;
  const nextRatio = FRAMES[prefs.ratio] ? prefs.ratio : ratio;
  const nextComments = typeof prefs.showComments === "boolean" ? prefs.showComments : showComments;
  const nextViewers = typeof prefs.showViewers === "boolean" ? prefs.showViewers : showViewers;
  const nextLikes = typeof prefs.showLikes === "boolean" ? prefs.showLikes : showLikes;
  const nextRandom = typeof prefs.randomHearts === "boolean" ? prefs.randomHearts : randomHearts;
  const nextRate = prefs.heartRate != null ? clampHeartRate(prefs.heartRate) : heartRate;
  const nextComment = prefs.commentLayout ? normalizeCommentLayout(prefs.commentLayout) : widgetLayout.comment;
  const nextViewer = prefs.viewerLayout ? normalizeViewerLayout(prefs.viewerLayout) : widgetLayout.viewer;
  theme = nextTheme;
  lang = nextLang;
  ratio = nextRatio;
  showComments = nextComments;
  showViewers = nextViewers;
  showLikes = nextLikes;
  randomHearts = nextRandom;
  heartRate = nextRate;
  widgetLayout.comment = nextComment;
  widgetLayout.viewer = nextViewer;
  saveLocalPrefs();
  applyTheme();
  applyLang();
}

const state = {
  ready: false,
  videos: [],
  scripts: [],
  activeScriptId: null,
  selectedSceneId: null,
  selectedOverlayKey: null,
  playing: false,
  switching: false,
  sceneIndex: -1,
  capture: false
};

let persistTimer = 0;
let toastTimer = 0;
let epoch = 0;
let navLock = false;
let focusedPlayId = null;

const player = document.getElementById("player");

function uid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "id-" + Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[ch]);
}

function tokenText(text) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date = lang === "en"
    ? `${pad(now.getMonth() + 1)}/${pad(now.getDate())}/${now.getFullYear()}`
    : `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
  const weekdays = lang === "en"
    ? ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    : ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  return String(text ?? "")
    .replaceAll("{datetime}", `${date} ${time}`)
    .replaceAll("{date}", date)
    .replaceAll("{time}", time)
    .replaceAll("{weekday}", weekdays[now.getDay()]);
}

function parseTime(value) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  if (text.includes(":")) {
    const parts = text.split(":").map((part) => Number(part));
    if (parts.some((n) => !Number.isFinite(n) || n < 0)) return null;
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return null;
  }
  const n = Number(text);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const whole = Math.floor(sec);
  const s = whole % 60;
  const m = Math.floor(whole / 60) % 60;
  const h = Math.floor(whole / 3600);
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function currentScript() {
  return state.scripts.find((script) => script.id === state.activeScriptId) || null;
}

function selectedScene() {
  const script = currentScript();
  if (!script) return null;
  return script.scenes.find((scene) => scene.id === state.selectedSceneId) || null;
}

function stageScene() {
  const script = currentScript();
  if (!script) return null;
  if (state.playing) return script.scenes[state.sceneIndex] || null;
  return selectedScene();
}

function mediaUrl(fileName) {
  return state.videos.find((video) => video.fileName === fileName)?.url || "";
}

function makeOverlay(partial = {}) {
  return {
    id: uid(),
    text: t("overlay.default"),
    x: 5,
    y: 8,
    fontSize: 28,
    color: "#FFFFFF",
    align: "left",
    bold: true,
    bg: "rgba(0,0,0,0.45)",
    ...partial
  };
}

function makeScene(partial = {}) {
  return {
    id: uid(),
    title: t("script.scene"),
    videoFile: "",
    startSec: 0,
    endSec: null,
    overlays: [],
    ...partial
  };
}

function makeScript() {
  return {
    id: uid(),
    name: t("script.n", { n: state.scripts.length + 1 }),
    mode: "segments",
    loop: true,
    fit: "contain",
    showLiveBadge: true,
    overlays: [
      makeOverlay({ text: "{weekday}, {date}", x: 5, y: 8, fontSize: 22 }),
      makeOverlay({ text: "{time}", x: 5, y: 16, fontSize: 40, color: "#FFE08A" })
    ],
    scenes: [],
    triggers: []
  };
}

function overlayLocation(key) {
  const script = currentScript();
  if (!script || !key) return null;
  const parts = key.split(":");
  if (parts[0] === "g") return { list: script.overlays, id: parts[1] };
  if (parts[0] === "s") {
    const scene = script.scenes.find((item) => item.id === parts[1]);
    if (!scene) return null;
    return { list: scene.overlays, id: parts[2] };
  }
  return null;
}

function selectedOverlay() {
  const loc = overlayLocation(state.selectedOverlayKey);
  return loc?.list.find((item) => item.id === loc.id) || null;
}

function post(message) {
  if (window.chrome?.webview) {
    window.chrome.webview.postMessage(message);
    return;
  }
  mockHost(message);
}

function persistSoon() {
  clearTimeout(persistTimer);
  persistTimer = setTimeout(persistNow, 250);
}

function persistNow() {
  clearTimeout(persistTimer);
  if (!state.ready) return;
  const script = currentScript();
  if (!script) return;
  post({ type: "saveScript", script, activeScriptId: script.id });
}

function toast(message, icon = "info") {
  if (!message) return;
  if (window.Swal) {
    Swal.fire({
      toast: true,
      position: "bottom",
      icon,
      title: message,
      showConfirmButton: false,
      timer: 3400,
      timerProgressBar: true,
      heightAuto: false
    });
    return;
  }
  const el = document.getElementById("toast");
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 3400);
}

async function askConfirm(message) {
  if (!window.Swal) return confirm(message);
  const result = await Swal.fire({
    title: t("confirm.title"),
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: t("action.delete"),
    cancelButtonText: t("action.cancel"),
    reverseButtons: true,
    focusCancel: true,
    heightAuto: false,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#3c4352"
  });
  return !!result.isConfirmed;
}

function onHost(raw) {
  const message = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!message || typeof message !== "object") return;
  if (message.type === "state") {
    if (message.prefs) adoptHostPrefs(message.prefs);
    state.videos = message.videos || [];
    state.scripts = message.scripts || [];
    state.activeScriptId = message.activeScriptId || state.scripts[0]?.id || null;
    state.ready = true;
    ensureSelection();
    renderAll();
    applyRoomForm(message.room);
    applyOutputLink(message.outputUrl);
  } else if (message.type === "videos") {
    state.videos = message.videos || [];
    renderLibrary();
    renderSceneList();
    renderInspector();
    renderTriggers();
    if (message.notice) toast(message.notice, "success");
  } else if (message.type === "status") {
    toast(message.message || "");
  } else if (message.type === "error") {
    toast(translateStatus(message.message) || t("toast.error"), "error");
  } else if (message.type === "room") {
    setRoomUi(message.state || "idle", message.message || "");
    if (message.state === "error") toast(translateStatus(message.message) || t("room.unreachable"), "error");
  } else if (message.type === "liveEvent") {
    onLiveEvent(message);
  } else if (message.type === "viewers") {
    setViewerCount(message.count);
  } else if (message.type === "likes") {
    onLikes(message);
  } else if (message.type === "license") {
    renderLicense(message);
  }
}

const fallbackPlans = [
  { code: "free", name: "Free", detail: "Dùng thử 1 giờ trên máy này.", priceVnd: 0 },
  { code: "pro", name: "Pro", detail: "390.000đ / tháng.", priceVnd: 390000 },
  { code: "vip", name: "VIP", detail: "490.000đ / tháng.", priceVnd: 490000 }
];
let licensePlan = "free";
let licenseExpiryTimer = 0;
let licenseWatch = null;

function licenseMoney(value) {
  const amount = Number(value) || 0;
  return amount ? `${amount.toLocaleString("vi-VN")}đ / tháng` : "Miễn phí · 1 giờ";
}

function showLicensePanel(screen) {
  const plans = document.getElementById("licensePlans");
  const submit = document.getElementById("licenseSubmit");
  const pay = document.getElementById("licensePay");
  const expired = document.getElementById("licenseExpired");
  const title = document.getElementById("licenseTitle");
  if (plans) plans.hidden = screen !== "plans";
  if (submit) submit.hidden = screen !== "plans";
  if (pay) pay.hidden = screen !== "pay";
  if (expired) expired.hidden = screen !== "expired";
  if (title) {
    title.hidden = screen === "expired";
    if (screen !== "expired") title.textContent = screen === "pay" ? "Thanh toán" : "Chọn gói";
  }
}

function planLabel(code) {
  if (code === "vip") return "VIP";
  if (code === "pro") return "Pro";
  if (code === "free") return "Free";
  return code ? String(code) : "—";
}

function licenseInstant(value) {
  if (!value) return NaN;
  const text = String(value).trim();
  const normalized = /(?:z|[+-]\d{2}:?\d{2})$/i.test(text) ? text : `${text}Z`;
  return new Date(normalized).getTime();
}

function formatRemain(endsAt) {
  const ms = licenseInstant(endsAt) - Date.now();
  if (!Number.isFinite(ms)) return "Đang hoạt động";
  if (ms <= 0) return "Đã hết hạn";
  const days = Math.floor(ms / 86400000);
  if (days >= 1) return `Còn ${days} ngày`;
  const hours = Math.floor(ms / 3600000);
  if (hours >= 1) return `Còn ${hours} giờ`;
  const minutes = Math.floor(ms / 60000);
  if (minutes >= 1) return `Còn ${minutes} phút`;
  return `Còn ${Math.max(1, Math.floor(ms / 1000))} giây`;
}

function paintBrandPlan() {
  const el = document.getElementById("brandPlan");
  if (!el || outputMode) return;
  const plan = licenseWatch?.plan;
  const next = plan ? planLabel(plan) : "";
  if (el.textContent !== next) el.textContent = next;
}

function paintLicenseDock() {
  paintBrandPlan();
  const dock = document.getElementById("licenseDock");
  if (!dock || outputMode) return;
  const watch = licenseWatch;
  if (!watch?.allowed || !watch.licenseKey) {
    dock.hidden = true;
    return;
  }
  dock.hidden = false;
  const next = `${watch.licenseKey} - ${formatRemain(watch.endsAt)}`;
  if (dock.textContent !== next) dock.textContent = next;
}

let licenseExpiryNoted = false;
let licenseChoosing = false;

function setExpireStatus(text) {
  const status = document.getElementById("expireStatus");
  if (!status) return;
  status.textContent = text || "";
  status.hidden = !text;
}

function applyPlanTheme(message) {
  const vip = !outputMode && message?.allowed && message?.plan === "vip" && message?.screen === "app";
  if (vip) document.documentElement.dataset.plan = "vip";
  else delete document.documentElement.dataset.plan;
}

function lockExpiredLicense() {
  if (outputMode || licenseExpiryNoted) return;
  licenseExpiryNoted = true;
  try { stopPlayback(); } catch (e) {}
  if (window.Swal?.isVisible()) Swal.close();
  delete document.documentElement.dataset.plan;
  document.documentElement.classList.add("needs-license");
  document.documentElement.classList.remove("license-ok");
  showLicensePanel("expired");
  const note = document.getElementById("licenseMessage");
  if (note) note.textContent = "Key này đã hết hạn trên máy hiện tại.";
  post({ type: "licenseRefresh" });
}

function watchLicenseClock() {
  if (outputMode || !licenseWatch?.allowed || !licenseWatch.endsAt || licenseExpiryNoted) return;
  const end = licenseInstant(licenseWatch.endsAt);
  if (Number.isFinite(end) && end <= Date.now()) lockExpiredLicense();
}

function armLicenseExpiry(message) {
  clearTimeout(licenseExpiryTimer);
  if (!message?.allowed || !message.endsAt) return;
  const ms = licenseInstant(message.endsAt) - Date.now();
  const wait = Number.isFinite(ms) ? ms + 500 : 0;
  licenseExpiryTimer = setTimeout(() => post({ type: "licenseRefresh" }), Math.max(0, Math.min(wait, 2147483647)));
}

function renderLicense(message) {
  const plans = Array.isArray(message?.plans) && message.plans.length ? message.plans : fallbackPlans;
  if (!plans.some((plan) => plan.code === licensePlan)) licensePlan = plans[0].code;
  const host = document.getElementById("licensePlans");
  if (host) {
    host.innerHTML = plans.map((plan) => `
      <button type="button" class="license-plan ${plan.code === licensePlan ? "is-on" : ""}" data-plan="${esc(plan.code)}">
        <strong>${esc(plan.name || plan.code)}</strong>
        <span class="price">${esc(licenseMoney(plan.priceVnd))}</span>
        <span class="muted">${esc(plan.detail || "")}</span>
      </button>`).join("");
  }
  const key = document.getElementById("licenseKeyValue");
  if (key && message?.licenseKey) key.textContent = message.licenseKey;
  const payment = message?.payment;
  const qr = document.getElementById("licenseQr");
  if (qr) qr.src = payment?.qrImageUrl || "";
  const amount = document.getElementById("licensePayAmount");
  if (amount) amount.textContent = payment ? `${Number(payment.amount || 0).toLocaleString("vi-VN")}đ` : "";
  const bank = document.getElementById("licensePayBank");
  if (bank) bank.textContent = payment?.bankName || "";
  const account = document.getElementById("licensePayAccount");
  if (account) account.textContent = payment?.accountNumber || "";
  const name = document.getElementById("licensePayName");
  if (name) name.textContent = payment?.accountName || "";
  const ref = document.getElementById("licensePayRef");
  if (ref) ref.textContent = payment?.reference || "";
  const status = document.getElementById("licenseStatus");
  if (status) status.textContent = "";
  const note = document.getElementById("licenseMessage");
  const screen = message?.screen || (message?.allowed ? "app" : "plans");
  const end = licenseInstant(message?.endsAt);
  const stillValid = !Number.isFinite(end) || end > Date.now();
  const expiryNote = /hết hạn/i.test(message?.message || "");
  const paying = screen === "pay" && !!payment;
  if (licenseChoosing && !paying && (screen === "expired" || message?.status === "het_han") && expiryNote) return;
  licenseChoosing = false;
  licenseWatch = message || null;
  const expiredView = !paying && (screen === "expired" || message?.status === "het_han");
  if (note) note.textContent = paying && message?.message ? message.message : "";
  if (expiredView) setExpireStatus(expiryNote ? "" : (message?.message || ""));
  else setExpireStatus("");
  showLicensePanel(paying ? "pay" : screen);
  paintLicenseDock();
  const root = document.documentElement;
  const openApp = message?.allowed && screen === "app" && stillValid;
  applyPlanTheme(openApp ? message : null);
  if (window.Swal?.isVisible() && !paying && (screen === "expired" || message?.status === "het_han" || (message?.allowed && !stillValid))) Swal.close();
  if (openApp) {
    licenseExpiryNoted = false;
    root.classList.remove("needs-license");
    root.classList.add("license-ok");
    armLicenseExpiry(message);
  } else if (!outputMode && window.chrome?.webview) {
    clearTimeout(licenseExpiryTimer);
    root.classList.add("needs-license");
    root.classList.remove("license-ok");
    if (!paying && (screen === "expired" || message?.status === "het_han" || (message?.allowed && !stillValid))) {
      try { stopPlayback(); } catch (e) {}
      showLicensePanel("expired");
      licenseExpiryNoted = true;
    }
  }
}

function ensureSelection() {
  if (!currentScript() && state.scripts.length)
    state.activeScriptId = state.scripts[0].id;
  const script = currentScript();
  if (!script) {
    state.selectedSceneId = null;
    state.selectedOverlayKey = null;
    return;
  }
  if (!Array.isArray(script.triggers)) script.triggers = [];
  if (!script.scenes.some((scene) => scene.id === state.selectedSceneId))
    state.selectedSceneId = script.scenes[0]?.id ?? null;
  if (state.selectedOverlayKey && !overlayLocation(state.selectedOverlayKey))
    state.selectedOverlayKey = null;
}

function renderAll() {
  renderLibrary();
  renderScriptBar();
  renderSceneList();
  renderInspector();
  renderTriggers();
  renderQueue();
  renderOverlays();
  applyFit();
  applyBadge();
  setPlayUi();
}

function renderLibrary() {
  const list = document.getElementById("videoList");
  const title = document.querySelector(".library .panel-title");
  if (title) title.textContent = state.videos.length ? t("library.count", { n: state.videos.length }) : t("library.title");
  if (!state.videos.length) {
    list.innerHTML = `<li class="empty"><span>${esc(t("library.empty"))}</span><button type="button" data-action="pick-videos">${esc(t("action.addVideo"))}</button></li>`;
    return;
  }
  list.innerHTML = state.videos.map((video, index) => `
    <li class="video-item">
      <button type="button" class="video-main" data-action="preview-video" data-index="${index}">
        <span class="name">${esc(video.displayName)}</span>
        <span class="meta">${formatSize(video.sizeBytes || 0)}</span>
      </button>
      <div class="video-ops">
        <button type="button" class="danger" data-action="delete-video" data-index="${index}">${esc(t("action.delete"))}</button>
      </div>
    </li>`).join("");
}

function renderScriptBar() {
  const host = document.getElementById("scriptBar");
  const script = currentScript();
  if (!script) {
    host.innerHTML = `<p class="muted">${esc(t("script.none"))}</p>
      <button type="button" data-action="new-script">${esc(t("script.create"))}</button>`;
    renderPlaybackSettings();
    return;
  }
  const options = state.scripts.map((item) =>
    `<option value="${esc(item.id)}" ${item.id === script.id ? "selected" : ""}>${esc(item.name)}</option>`).join("");
  host.innerHTML = `
    <h3>${esc(t("script.title"))}</h3>
    <label class="field">${esc(t("script.open"))}
      <select data-field="active-script">${options}</select>
    </label>
    <label class="field">${esc(t("script.name"))}
      <input data-field="script-name" value="${esc(script.name)}" />
    </label>
    <div class="actions">
      <button type="button" data-action="add-scene">${esc(t("script.addScene"))}</button>
      <button type="button" data-action="add-all">${esc(t("script.addAll"))}</button>
      <button type="button" class="danger" data-action="delete-script">${esc(t("script.delete"))}</button>
    </div>`;
  renderPlaybackSettings();
}

function renderPlaybackSettings() {
  const host = document.getElementById("playbackSettings");
  if (!host) return;
  const script = currentScript();
  if (!script) {
    host.innerHTML = `<p class="muted">${esc(t("script.none"))}</p>`;
    return;
  }
  host.innerHTML = `
    <label class="field">${esc(t("script.mode"))}
      <select data-field="mode">
        <option value="continuous" ${script.mode === "continuous" ? "selected" : ""}>${esc(t("script.continuous"))}</option>
        <option value="segments" ${script.mode === "segments" ? "selected" : ""}>${esc(t("script.segments"))}</option>
      </select>
    </label>
    <p class="muted" id="modeHelp">${esc(t(script.mode === "continuous" ? "script.helpContinuous" : "script.helpSegments"))}</p>
    <div class="checks">
      <label><input data-field="loop" type="checkbox" ${script.loop ? "checked" : ""} /> ${esc(t("script.loop"))}</label>
      <label><input data-field="live" type="checkbox" ${script.showLiveBadge ? "checked" : ""} /> ${esc(t("script.live"))}</label>
    </div>
    <label class="field">${esc(t("script.fit"))}
      <select data-field="fit">
        <option value="contain" ${script.fit !== "cover" ? "selected" : ""}>${esc(t("script.contain"))}</option>
        <option value="cover" ${script.fit === "cover" ? "selected" : ""}>${esc(t("script.cover"))}</option>
      </select>
    </label>`;
}

function sceneMeta(scene, mode) {
  const file = scene.videoFile || t("script.noVideo");
  if (mode !== "segments") return file;
  const end = scene.endSec == null ? t("script.end") : formatTime(Number(scene.endSec));
  return `${file} · ${formatTime(Number(scene.startSec) || 0)}–${end}`;
}

function renderSceneList() {
  const host = document.getElementById("sceneList");
  const script = currentScript();
  if (!script) {
    host.innerHTML = "";
    return;
  }
  const rows = script.scenes.length
    ? script.scenes.map((scene, index) => `
      <article class="scene ${scene.id === state.selectedSceneId ? "is-selected" : ""} ${state.playing && index === state.sceneIndex ? "is-playing" : ""}" data-scene-id="${esc(scene.id)}">
        <button type="button" class="scene-main" data-action="select-scene" data-id="${esc(scene.id)}">
          <span class="name">${String(index + 1).padStart(2, "0")} · ${esc(scene.title || t("script.scene"))}</span>
          <span class="meta">${esc(sceneMeta(scene, script.mode))}</span>
        </button>
        <div class="scene-ops">
          <button type="button" class="icon-btn" data-action="scene-up" data-id="${esc(scene.id)}" data-tip="${esc(t("action.up"))}" aria-label="${esc(t("action.up"))}"><i class="fa-solid fa-chevron-up" aria-hidden="true"></i></button>
          <button type="button" class="icon-btn" data-action="scene-down" data-id="${esc(scene.id)}" data-tip="${esc(t("action.down"))}" aria-label="${esc(t("action.down"))}"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
        </div>
      </article>`).join("")
    : `<p class="empty">${esc(t("script.noScene"))}</p>`;
  host.innerHTML = `<h3>${esc(t("script.order"))}</h3>${rows}`;
}

function markSceneList() {
  const script = currentScript();
  if (state.playing && script?.scenes[state.sceneIndex]) {
    const playing = script.scenes[state.sceneIndex];
    if (playing.id !== state.selectedSceneId) {
      state.selectedSceneId = playing.id;
      const tag = document.activeElement?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (!typing) renderInspector();
    }
  }
  let playingEl = null;
  document.querySelectorAll("[data-scene-id]").forEach((el) => {
    const id = el.dataset.sceneId;
    const index = script?.scenes.findIndex((scene) => scene.id === id) ?? -1;
    const playing = state.playing && index === state.sceneIndex;
    el.classList.toggle("is-selected", id === state.selectedSceneId);
    el.classList.toggle("is-playing", playing);
    if (playing) playingEl = el;
  });
  if (!playingEl) {
    focusedPlayId = null;
    renderQueue();
    return;
  }
  if (playingEl.dataset.sceneId === focusedPlayId) {
    renderQueue();
    return;
  }
  focusedPlayId = playingEl.dataset.sceneId;
  scrollSceneIntoView(playingEl);
  renderQueue();
}

function scrollSceneIntoView(el) {
  let node = el.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    const canScroll = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 4;
    if (canScroll) {
      const delta = el.getBoundingClientRect().top - node.getBoundingClientRect().top - (node.clientHeight - el.offsetHeight) / 2;
      node.scrollTo({ top: Math.max(0, node.scrollTop + delta), behavior: "smooth" });
      return;
    }
    node = node.parentElement;
  }
  el.scrollIntoView({ block: "center", behavior: "smooth" });
}

function videoOptions(selected) {
  const known = new Set(state.videos.map((video) => video.fileName));
  const options = [`<option value="">${esc(t("script.unselected"))}</option>`];
  state.videos.forEach((video) => {
    options.push(`<option value="${esc(video.fileName)}" ${video.fileName === selected ? "selected" : ""}>${esc(video.displayName)}</option>`);
  });
  if (selected && !known.has(selected))
    options.push(`<option value="${esc(selected)}" selected>${esc(selected)} ${esc(t("script.missing"))}</option>`);
  return options.join("");
}

function videoMatcher(params, data) {
  const term = foldText(params.term || "").trim();
  if (!term) return data;
  if (foldText(data.text || "").includes(term)) return data;
  return null;
}

function releaseVideoSearch(root) {
  if (!root || !window.jQuery?.fn?.select2) return;
  window.jQuery(root).find("select.select2-hidden-accessible").each(function () {
    window.jQuery(this).select2("destroy");
  });
}

function mountVideoSearch(root) {
  if (!root || !window.jQuery?.fn?.select2) return;
  window.jQuery(root).find("select[data-field='scene-video'], select[data-field='trigger-video']").each(function () {
    const box = window.jQuery(this);
    if (box.hasClass("select2-hidden-accessible")) box.select2("destroy");
    box.off("change.videoSearch");
    box.select2({
      width: "100%",
      dropdownParent: window.jQuery(document.body),
      minimumResultsForSearch: 0,
      matcher: videoMatcher,
      language: {
        noResults: () => t("videoSearch.empty"),
        searching: () => t("videoSearch.searching")
      }
    });
    box.on("change.videoSearch", function () {
      const field = this.dataset.field;
      if (!field) return;
      const skip = applyField(field, this);
      if (skip !== "skip") persistSoon();
    });
  });
}

function chips(overlays, scope, sceneId) {
  if (!overlays?.length) return `<p class="muted">${esc(t("overlay.none"))}</p>`;
  return `<div class="chips">${overlays.map((overlay) => {
    const key = scope === "g" ? `g:${overlay.id}` : `s:${sceneId}:${overlay.id}`;
    const preview = tokenText(overlay.text).replace(/\s+/g, " ").slice(0, 42) || t("overlay.empty");
    return `<button type="button" class="chip ${key === state.selectedOverlayKey ? "is-on" : ""}" data-action="select-overlay" data-key="${esc(key)}">${esc(preview)}</button>`;
  }).join("")}</div>`;
}

function hexColor(value) {
  return /^#[0-9a-fA-F]{6}$/.test(value || "") ? value : "#ffffff";
}

function overlayForm(overlay) {
  return `
    <div class="ov-form">
      <label class="field">${esc(t("overlay.content"))}
        <textarea id="overlayText" data-field="overlay-text">${esc(overlay.text)}</textarea>
      </label>
      <div class="tokens">
        <button type="button" data-action="insert-token" data-token="{time}">{time}</button>
        <button type="button" data-action="insert-token" data-token="{date}">{date}</button>
        <button type="button" data-action="insert-token" data-token="{datetime}">{datetime}</button>
        <button type="button" data-action="insert-token" data-token="{weekday}">{weekday}</button>
      </div>
      <p class="muted">${esc(t("overlay.hint"))}</p>
      <div class="grid2">
        <label class="field">${esc(t("overlay.size"))}
          <input data-field="font-size" type="number" min="12" max="160" value="${overlay.fontSize}" />
        </label>
        <label class="field">${esc(t("overlay.color"))}
          <input data-field="color" type="color" value="${esc(hexColor(overlay.color))}" />
        </label>
        <label class="field">${esc(t("overlay.x"))}
          <input data-field="x" type="number" min="0" max="100" step="0.1" value="${overlay.x}" />
        </label>
        <label class="field">${esc(t("overlay.y"))}
          <input data-field="y" type="number" min="0" max="100" step="0.1" value="${overlay.y}" />
        </label>
      </div>
      <label class="field">${esc(t("overlay.align"))}
        <select data-field="align">
          <option value="left" ${overlay.align === "left" ? "selected" : ""}>${esc(t("overlay.left"))}</option>
          <option value="center" ${overlay.align === "center" ? "selected" : ""}>${esc(t("overlay.center"))}</option>
          <option value="right" ${overlay.align === "right" ? "selected" : ""}>${esc(t("overlay.right"))}</option>
        </select>
      </label>
      <div class="checks">
        <label><input data-field="bold" type="checkbox" ${overlay.bold ? "checked" : ""} /> ${esc(t("overlay.bold"))}</label>
      </div>
      <label class="field">${esc(t("overlay.bg"))}
        <select data-field="bg">
          <option value="rgba(0,0,0,0.45)" ${overlay.bg === "rgba(0,0,0,0.45)" ? "selected" : ""}>${esc(t("overlay.bgDark"))}</option>
          <option value="rgba(0,0,0,0.28)" ${overlay.bg === "rgba(0,0,0,0.28)" ? "selected" : ""}>${esc(t("overlay.bgSoft"))}</option>
          <option value="transparent" ${overlay.bg === "transparent" ? "selected" : ""}>${esc(t("overlay.bgNone"))}</option>
        </select>
      </label>
      <button type="button" class="danger" data-action="delete-overlay">${esc(t("overlay.delete"))}</button>
    </div>`;
}

function renderSharedText() {
  const host = document.getElementById("sharedText");
  if (!host) return;
  const script = currentScript();
  if (!script) {
    host.innerHTML = `<p class="muted">${esc(t("script.none"))}</p>`;
    return;
  }
  const overlay = selectedOverlay();
  host.innerHTML = `
    ${chips(script.overlays, "g")}
    <button type="button" data-action="add-overlay" data-scope="g">${esc(t("overlay.add"))}</button>
    ${overlay && state.selectedOverlayKey?.startsWith("g:") ? overlayForm(overlay) : ""}`;
}

function renderInspector() {
  const host = document.getElementById("inspector");
  const script = currentScript();
  renderSharedText();
  releaseVideoSearch(host);
  if (!script) {
    host.innerHTML = "";
    return;
  }
  const scene = selectedScene();
  const overlay = selectedOverlay();
  const lockInOut = script.mode !== "segments";
  host.innerHTML = `
    <section class="block">
      <h3>${esc(t("overlay.sceneTitle"))}</h3>
      ${scene ? `
        <label class="field">${esc(t("scene.title"))}
          <input data-field="scene-title" value="${esc(scene.title)}" />
        </label>
        <label class="field">${esc(t("scene.video"))}
          <select data-field="scene-video">${videoOptions(scene.videoFile)}</select>
        </label>
        <div class="grid2">
          <label class="field">${esc(t("scene.in"))}
            <input data-field="scene-start" value="${esc(formatTime(Number(scene.startSec) || 0))}" ${lockInOut ? "disabled" : ""} />
          </label>
          <label class="field">${esc(t("scene.out"))}
            <input data-field="scene-end" value="${scene.endSec == null ? "" : esc(formatTime(Number(scene.endSec)))}" placeholder="${esc(t("scene.outPlaceholder"))}" ${lockInOut ? "disabled" : ""} />
          </label>
        </div>
        <div class="actions">
          <button type="button" data-action="mark-start" ${lockInOut ? "disabled" : ""}>${esc(t("scene.markIn"))}</button>
          <button type="button" data-action="mark-end" ${lockInOut ? "disabled" : ""}>${esc(t("scene.markOut"))}</button>
          <button type="button" data-action="preview-scene">${esc(t("scene.preview"))}</button>
          <button type="button" class="danger" data-action="delete-scene">${esc(t("scene.delete"))}</button>
        </div>
        <h3>${esc(t("overlay.sceneText"))}</h3>
        ${chips(scene.overlays, "s", scene.id)}
        <button type="button" data-action="add-overlay" data-scope="s">${esc(t("overlay.add"))}</button>
        ${overlay && state.selectedOverlayKey?.startsWith("s:") ? overlayForm(overlay) : ""}
      ` : `<p class="muted">${esc(t("overlay.pickScene"))}</p>`}
    </section>`;
  mountVideoSearch(host);
}

function overlayAnchor(align) {
  if (align === "center") return "translateX(-50%)";
  if (align === "right") return "translateX(-100%)";
  return "none";
}

function paintOverlay(el, overlay) {
  el.dataset.raw = overlay.text || "";
  el.style.left = `${overlay.x ?? 0}%`;
  el.style.top = `${overlay.y ?? 0}%`;
  el.style.transform = overlayAnchor(overlay.align);
  el.style.color = overlay.color || "#fff";
  el.style.fontSize = `${overlay.fontSize || 28}px`;
  el.style.fontWeight = overlay.bold ? "700" : "500";
  el.style.textAlign = overlay.align || "left";
  el.style.background = overlay.bg || "transparent";
  el.querySelector("span").textContent = tokenText(overlay.text || "");
  el.classList.toggle("is-selected", el.dataset.key === state.selectedOverlayKey && !state.playing && !state.capture);
}

function renderOverlays() {
  const layer = document.getElementById("overlayLayer");
  const script = currentScript();
  layer.innerHTML = "";
  if (!script) return;
  const items = script.overlays.map((overlay) => ({ overlay, key: `g:${overlay.id}` }));
  const scene = stageScene();
  if (scene)
    scene.overlays.forEach((overlay) => items.push({ overlay, key: `s:${scene.id}:${overlay.id}` }));

  items.forEach(({ overlay, key }) => {
    const el = document.createElement("div");
    el.className = "overlay";
    el.dataset.key = key;
    el.appendChild(document.createElement("span"));
    paintOverlay(el, overlay);
    el.addEventListener("pointerdown", (event) => {
      if (state.playing || state.capture || event.button !== 0) return;
      event.preventDefault();
      if (state.selectedOverlayKey !== key) {
        state.selectedOverlayKey = key;
        markSelectedOverlay();
        renderInspector();
      }
      startDrag(event, overlay);
    });
    layer.appendChild(el);
  });
}

function markSelectedOverlay() {
  document.querySelectorAll(".overlay").forEach((el) => {
    el.classList.toggle("is-selected", el.dataset.key === state.selectedOverlayKey && !state.playing && !state.capture);
  });
}

function refreshOverlay(key) {
  const overlay = overlayLocation(key)?.list.find((item) => item.id === key.split(":").pop());
  const el = [...document.querySelectorAll(".overlay")].find((node) => node.dataset.key === key);
  if (!overlay || !el) return;
  paintOverlay(el, overlay);
}

function startDrag(event, overlay) {
  const rect = document.getElementById("stage").getBoundingClientRect();
  const originX = event.clientX;
  const originY = event.clientY;
  const startX = overlay.x;
  const startY = overlay.y;
  const key = state.selectedOverlayKey;
  const move = (ev) => {
    const dx = ((ev.clientX - originX) / rect.width) * 100;
    const dy = ((ev.clientY - originY) / rect.height) * 100;
    overlay.x = clamp(Math.round((startX + dx) * 10) / 10, 0, 100);
    overlay.y = clamp(Math.round((startY + dy) * 10) / 10, 0, 100);
    refreshOverlay(key);
    const xInput = document.querySelector('[data-field="x"]');
    const yInput = document.querySelector('[data-field="y"]');
    if (xInput) xInput.value = overlay.x;
    if (yInput) yInput.value = overlay.y;
  };
  const up = () => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    persistSoon();
  };
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
}

function applyFit() {
  const script = currentScript();
  player.style.objectFit = script?.fit === "cover" ? "cover" : "contain";
}

function applyBadge() {
  const script = currentScript();
  document.getElementById("liveBadge").hidden = !script?.showLiveBadge;
}

function showPlaceholder(show) {
  document.getElementById("placeholder").hidden = !show;
}

function setMuteUi() {
  const button = document.getElementById("btnMute");
  const muted = player.muted;
  const label = muted ? t("mute.on") : t("mute.off");
  button.classList.toggle("is-muted", muted);
  button.dataset.tip = label;
  button.setAttribute("aria-label", label);
  const icon = button.querySelector("i");
  if (icon) icon.className = muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
}

function setPlayUi() {
  const playing = state.playing || triggerPlaying;
  const label = playing ? t("action.stop") : t("action.play");
  document.querySelectorAll("#btnPlay, #btnPlay2").forEach((el) => {
    el.dataset.tip = label;
    el.setAttribute("aria-label", label);
    const icon = el.querySelector("i");
    if (icon) icon.className = playing ? "fa-solid fa-stop" : "fa-solid fa-play";
  });
  document.querySelector(".stage-frame")?.classList.toggle("is-playing", playing);
}

function updateTimecode() {
  const current = formatTime(player.currentTime || 0);
  const duration = Number.isFinite(player.duration) ? formatTime(player.duration) : "0:00";
  document.getElementById("timecode").textContent = `${current} / ${duration}`;
}

function tickTokens() {
  watchLicenseClock();
  paintLicenseDock();
  document.querySelectorAll(".overlay").forEach((el) => {
    const span = el.querySelector("span");
    const next = tokenText(el.dataset.raw || "");
    if (span && span.textContent !== next) span.textContent = next;
  });
}

function applyField(field, el) {
  const script = currentScript();
  if (!script) return;
  if (field === "active-script") {
    persistNow();
    state.activeScriptId = el.value;
    state.selectedSceneId = null;
    state.selectedOverlayKey = null;
    stopPlayback();
    ensureSelection();
    post({ type: "setActive", id: state.activeScriptId });
    renderAll();
    return "skip";
  }
  if (field === "script-name") {
    script.name = el.value;
    const option = document.querySelector('[data-field="active-script"]')?.selectedOptions?.[0];
    if (option) option.textContent = script.name || t("script.fallback");
  }
  if (field === "mode") {
    script.mode = el.value === "continuous" ? "continuous" : "segments";
    const help = document.getElementById("modeHelp");
    if (help) help.textContent = t(script.mode === "continuous" ? "script.helpContinuous" : "script.helpSegments");
    renderSceneList();
    renderInspector();
  }
  if (field === "loop") script.loop = el.checked;
  if (field === "live") {
    script.showLiveBadge = el.checked;
    applyBadge();
  }
  if (field === "fit") {
    script.fit = el.value === "cover" ? "cover" : "contain";
    applyFit();
  }
  if (field === "trigger-match" || field === "trigger-kind" || field === "trigger-video") {
    const rule = (script.triggers || []).find((item) => item.id === el.dataset.id);
    if (!rule) return;
    if (field === "trigger-match") rule.match = el.value;
    if (field === "trigger-kind") {
      rule.kind = el.value === "gift" ? "gift" : "comment";
      const input = el.parentElement?.querySelector("[data-field='trigger-match']");
      if (input) input.placeholder = rule.kind === "gift" ? t("trigger.giftPlaceholder") : t("trigger.keyword");
    }
    if (field === "trigger-video") rule.videoFile = el.value;
    return;
  }
  const scene = selectedScene();
  if (scene && field === "scene-title") {
    scene.title = el.value;
    renderSceneList();
  }
  if (scene && field === "scene-video") {
    scene.videoFile = el.value;
    renderSceneList();
  }
  if (scene && field === "scene-start") scene.startSec = parseTime(el.value) ?? 0;
  if (scene && field === "scene-end") scene.endSec = parseTime(el.value);
  const overlay = selectedOverlay();
  if (overlay) {
    if (field === "overlay-text") overlay.text = el.value;
    if (field === "font-size") overlay.fontSize = clamp(Number(el.value) || 28, 12, 160);
    if (field === "color") overlay.color = el.value;
    if (field === "align") overlay.align = el.value;
    if (field === "bold") overlay.bold = el.checked;
    if (field === "bg") overlay.bg = el.value;
    if (field === "x") overlay.x = clamp(Number(el.value) || 0, 0, 100);
    if (field === "y") overlay.y = clamp(Number(el.value) || 0, 0, 100);
    if (["overlay-text", "font-size", "color", "align", "bold", "bg", "x", "y"].includes(field))
      refreshOverlay(state.selectedOverlayKey);
  }
}

function addScript() {
  persistNow();
  const script = makeScript();
  state.scripts.push(script);
  state.activeScriptId = script.id;
  state.selectedSceneId = null;
  state.selectedOverlayKey = null;
  stopPlayback();
  state.ready = true;
  persistNow();
  renderAll();
}

async function deleteCurrentScript() {
  const script = currentScript();
  if (!script) return;
  if (!await askConfirm(t("script.confirmDelete", { name: script.name }))) return;
  const id = script.id;
  state.scripts = state.scripts.filter((item) => item.id !== id);
  state.activeScriptId = state.scripts[0]?.id ?? null;
  state.selectedSceneId = null;
  state.selectedOverlayKey = null;
  stopPlayback();
  post({ type: "deleteScript", id });
  if (state.activeScriptId) post({ type: "setActive", id: state.activeScriptId });
  ensureSelection();
  renderAll();
}

function addScene(videoFile) {
  const script = currentScript();
  if (!script) return;
  const scene = makeScene({
    title: t("scene.n", { n: script.scenes.length + 1 }),
    videoFile: videoFile || state.videos[0]?.fileName || ""
  });
  script.scenes.push(scene);
  state.selectedSceneId = scene.id;
  renderSceneList();
  renderInspector();
  if (!state.playing) renderOverlays();
  persistSoon();
}

function addAllVideos() {
  const script = currentScript();
  if (!script) return;
  if (!state.videos.length) {
    toast(t("toast.noVideo"), "warning");
    return;
  }
  state.videos.forEach((video) => {
    script.scenes.push(makeScene({
      title: t("scene.n", { n: script.scenes.length + 1 }),
      videoFile: video.fileName
    }));
  });
  state.selectedSceneId = script.scenes.at(-1).id;
  renderSceneList();
  renderInspector();
  if (!state.playing) renderOverlays();
  persistSoon();
}

function moveScene(id, delta) {
  const script = currentScript();
  if (!script) return;
  const index = script.scenes.findIndex((scene) => scene.id === id);
  const target = index + delta;
  if (index < 0 || target < 0 || target >= script.scenes.length) return;
  const [item] = script.scenes.splice(index, 1);
  script.scenes.splice(target, 0, item);
  renderSceneList();
  persistSoon();
}

async function deleteSelectedScene() {
  const script = currentScript();
  const scene = selectedScene();
  if (!script || !scene) return;
  if (!await askConfirm(t("scene.confirmDelete", { name: scene.title }))) return;
  script.scenes = script.scenes.filter((item) => item.id !== scene.id);
  if (state.selectedOverlayKey?.includes(scene.id)) state.selectedOverlayKey = null;
  state.selectedSceneId = script.scenes[0]?.id ?? null;
  renderSceneList();
  renderInspector();
  renderOverlays();
  persistSoon();
}

function selectScene(id) {
  state.selectedSceneId = id;
  armedVideo = "";
  const script = currentScript();
  const index = script?.scenes.findIndex((scene) => scene.id === id) ?? -1;
  armedSceneIndex = index > 0 ? index : null;
  if (state.selectedOverlayKey?.startsWith("s:")) state.selectedOverlayKey = null;
  markSceneList();
  renderInspector();
  if (!state.playing) {
    renderOverlays();
    const scene = selectedScene();
    if (scene) previewScene(scene);
  }
}

function selectOverlay(key) {
  state.selectedOverlayKey = key;
  markSelectedOverlay();
  renderInspector();
}

function addOverlay(scope) {
  const script = currentScript();
  if (!script) return;
  const overlay = makeOverlay({ text: t("overlay.sample"), y: scope === "g" ? 8 : 72 });
  if (scope === "g") {
    script.overlays.push(overlay);
    state.selectedOverlayKey = `g:${overlay.id}`;
  } else {
    const scene = selectedScene();
    if (!scene) {
      toast(t("toast.pickScene"), "warning");
      return;
    }
    scene.overlays.push(overlay);
    state.selectedOverlayKey = `s:${scene.id}:${overlay.id}`;
  }
  renderInspector();
  renderOverlays();
  persistSoon();
}

function deleteSelectedOverlay() {
  const loc = overlayLocation(state.selectedOverlayKey);
  if (!loc) return;
  const index = loc.list.findIndex((item) => item.id === loc.id);
  if (index >= 0) loc.list.splice(index, 1);
  state.selectedOverlayKey = null;
  renderInspector();
  renderOverlays();
  persistSoon();
}

function insertToken(token) {
  const area = document.getElementById("overlayText");
  const overlay = selectedOverlay();
  if (!area || !overlay) {
    toast(t("toast.pickText"), "warning");
    return;
  }
  const start = area.selectionStart ?? area.value.length;
  const end = area.selectionEnd ?? start;
  area.value = area.value.slice(0, start) + token + area.value.slice(end);
  overlay.text = area.value;
  const pos = start + token.length;
  area.focus();
  area.setSelectionRange(pos, pos);
  refreshOverlay(state.selectedOverlayKey);
  persistSoon();
}

function takeMark(which) {
  const scene = selectedScene();
  if (!scene) return;
  if (!scene.videoFile || player.dataset.file !== scene.videoFile) {
    toast(t("toast.markFirst"), "warning");
    return;
  }
  const mark = Math.round((player.currentTime || 0) * 10) / 10;
  if (which === "start") scene.startSec = mark;
  else scene.endSec = mark;
  renderSceneList();
  renderInspector();
  persistSoon();
}

function runAction(action, el) {
  if (action === "new-script") addScript();
  if (action === "delete-script") deleteCurrentScript();
  if (action === "add-scene") addScene();
  if (action === "add-all") addAllVideos();
  if (action === "scene-up") moveScene(el.dataset.id, -1);
  if (action === "scene-down") moveScene(el.dataset.id, 1);
  if (action === "select-scene") selectScene(el.dataset.id);
  if (action === "delete-scene") deleteSelectedScene();
  if (action === "preview-scene") {
    const scene = selectedScene();
    if (scene) previewScene(scene);
  }
  if (action === "mark-start") takeMark("start");
  if (action === "mark-end") takeMark("end");
  if (action === "add-overlay") addOverlay(el.dataset.scope);
  if (action === "select-overlay") selectOverlay(el.dataset.key);
  if (action === "delete-overlay") deleteSelectedOverlay();
  if (action === "insert-token") insertToken(el.dataset.token);
  if (action === "preview-video") previewVideo(Number(el.dataset.index));
  if (action === "delete-video") deleteVideo(Number(el.dataset.index));
  if (action === "pick-videos") post({ type: "pickVideos" });
  if (action === "add-trigger") addTrigger();
  if (action === "delete-trigger") deleteTrigger(el.dataset.id);
}

function seekTo(seconds) {
  const duration = Number.isFinite(player.duration) ? player.duration : seconds;
  const target = clamp(seconds, 0, Math.max(0, duration - 0.001));
  if (Math.abs((player.currentTime || 0) - target) <= 0.05) return Promise.resolve();
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      player.removeEventListener("seeked", finish);
      resolve();
    };
    const timer = setTimeout(finish, 800);
    player.addEventListener("seeked", finish);
    try { player.currentTime = target; }
    catch { finish(); }
  });
}

function loadSrc(url) {
  return new Promise((resolve, reject) => {
    const onReady = () => { cleanup(); resolve(); };
    const onError = () => { cleanup(); reject(new Error("media")); };
    const cleanup = () => {
      player.removeEventListener("loadedmetadata", onReady);
      player.removeEventListener("error", onError);
    };
    player.addEventListener("loadedmetadata", onReady);
    player.addEventListener("error", onError);
    player.src = url;
  });
}

async function previewVideo(index) {
  const video = state.videos[index];
  if (!video) return;
  const bed = currentScript()?.scenes[0]?.videoFile;
  armedVideo = video.fileName && video.fileName !== bed ? video.fileName : "";
  armedSceneIndex = null;
  stopPlayback();
  try {
    player.dataset.file = video.fileName;
    await loadSrc(video.url);
    player.currentTime = 0;
    showPlaceholder(false);
    player.pause();
    updateTimecode();
  } catch {
    toast(t("toast.openFail"), "error");
  }
}

async function deleteVideo(index) {
  const video = state.videos[index];
  if (!video) return;
  if (!await askConfirm(t("library.confirmDelete", { name: video.displayName }))) return;
  if (player.dataset.file === video.fileName) {
    player.removeAttribute("src");
    player.dataset.file = "";
    showPlaceholder(true);
  }
  post({ type: "deleteVideo", fileName: video.fileName });
}

async function previewScene(scene) {
  const url = mediaUrl(scene.videoFile);
  if (!url) {
    player.removeAttribute("src");
    player.dataset.file = "";
    showPlaceholder(true);
    updateTimecode();
    return;
  }
  try {
    if (player.dataset.file !== scene.videoFile) {
      player.dataset.file = scene.videoFile;
      await loadSrc(url);
    }
    const script = currentScript();
    const start = script?.mode === "segments" ? Math.max(0, Number(scene.startSec) || 0) : 0;
    player.currentTime = start;
    showPlaceholder(false);
    player.pause();
    updateTimecode();
  } catch {
    toast(t("toast.sceneVideoFail"), "error");
  }
}

function nextIndex(script, index) {
  const next = index + 1;
  if (next < script.scenes.length) return next;
  return script.loop ? 0 : script.scenes.length;
}

async function playFrom(index, hops = 0, ticket = epoch) {
  const script = currentScript();
  if (!script?.scenes.length) {
    toast(t("toast.needScene"), "warning");
    stopPlayback();
    return;
  }
  if (ticket !== epoch) return;
  if (hops > script.scenes.length) {
    stopPlayback();
    toast(t("toast.nonePlayable"), "warning");
    return;
  }
  if (index >= script.scenes.length) {
    if (script.loop) index = 0;
    else {
      stopPlayback();
      return;
    }
  }

  const scene = script.scenes[index];
  state.sceneIndex = index;
  state.playing = true;
  state.switching = true;
  setPlayUi();
  markSceneList();
  renderOverlays();

  const url = mediaUrl(scene.videoFile);
  if (!url) {
    state.switching = false;
    if (playMode === "clip" && index !== 0) {
      playMode = "bed";
      return await playFrom(0, 0, ticket);
    }
    stopPlayback();
    toast(t("toast.needScene"), "warning");
    return;
  }

  try {
    if (player.dataset.file !== scene.videoFile) {
      player.dataset.file = scene.videoFile;
      await loadSrc(url);
    }
    if (ticket !== epoch) return;
    const start = script.mode === "segments" ? Math.max(0, Number(scene.startSec) || 0) : 0;
    if (Number.isFinite(player.duration) && start >= Math.max(0, player.duration - 0.05)) {
      state.switching = false;
      if (playMode === "clip" && index !== 0) {
        playMode = "bed";
        return await playFrom(0, 0, ticket);
      }
      stopPlayback();
      return;
    }
    await seekTo(start);
    showPlaceholder(false);
    await player.play();
    if (ticket !== epoch) {
      player.pause();
      return;
    }
  } catch {
    if (ticket === epoch) {
      stopPlayback();
      toast(t("toast.playFail"), "error");
    }
  } finally {
    if (ticket === epoch) state.switching = false;
  }
}

function beginPlay(index) {
  if (navLock) return;
  navLock = true;
  playFrom(index).finally(() => { navLock = false; });
}

let playMode = "bed";
let armedSceneIndex = null;
let armedVideo = "";
let clipFile = "";
let resumeMode = "bed";
let resumeFile = "";

function startPlayback() {
  const script = currentScript();
  if (!script) return;
  if (armedVideo) {
    const file = armedVideo;
    armedVideo = "";
    armedSceneIndex = null;
    if (file === script.scenes[0]?.videoFile) {
      playMode = "bed";
      beginPlay(0);
      return;
    }
    playMode = "clip";
    beginFile(file);
    return;
  }
  if (armedSceneIndex > 0) {
    const index = armedSceneIndex;
    armedSceneIndex = null;
    playMode = "clip";
    beginPlay(index);
    return;
  }
  playMode = "bed";
  beginPlay(0);
}

function beginFile(file) {
  if (navLock) return;
  navLock = true;
  clipFile = file;
  playMode = "clip";
  playFile(file).finally(() => { navLock = false; });
}

async function playFile(file, ticket = epoch) {
  const url = mediaUrl(file);
  if (!url || ticket !== epoch) {
    playMode = "bed";
    if (ticket === epoch) await playFrom(0, 0, ticket);
    return;
  }
  state.sceneIndex = -1;
  state.playing = true;
  state.switching = true;
  setPlayUi();
  markSceneList();
  renderOverlays();
  try {
    if (player.dataset.file !== file) {
      player.dataset.file = file;
      await loadSrc(url);
    }
    if (ticket !== epoch) return;
    await seekTo(0);
    showPlaceholder(false);
    await player.play();
    if (ticket !== epoch) {
      player.pause();
      return;
    }
  } catch {
    if (ticket === epoch) {
      stopPlayback();
      toast(t("toast.playFail"), "error");
    }
  } finally {
    if (ticket === epoch) state.switching = false;
  }
}

function stopPlayback() {
  epoch += 1;
  triggerToken += 1;
  triggerPlaying = false;
  triggerQueue.length = 0;
  triggerEndsAt = null;
  resumeAfterTrigger = false;
  playMode = "bed";
  clipFile = "";
  state.playing = false;
  state.switching = false;
  player.pause();
  setPlayUi();
  markSceneList();
  renderOverlays();
  renderQueue();
}

function togglePlay() {
  if (triggerPlaying || state.playing) stopPlayback();
  else startPlayback();
}

const triggerQueue = [];
const announceQueue = [];
const heardJoins = new Map();
const spokenIds = new Set();
let announcing = false;
let triggerPlaying = false;
let triggerSwitching = false;
let triggerEndsAt = null;
let triggerToken = 0;
let resumeAfterTrigger = false;
let resumeSceneIndex = 0;

function foldText(value) {
  return String(value ?? "").normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

function renderTriggers() {
  const host = document.getElementById("triggerHost");
  if (!host) return;
  releaseVideoSearch(host);
  const script = currentScript();
  const rules = script?.triggers || [];
  if (!rules.length) {
    host.innerHTML = `<p class="muted">${esc(t("trigger.empty"))}</p>`;
    return;
  }
  host.innerHTML = rules.map((rule) => `
    <div class="trigger-row">
      <select data-field="trigger-kind" data-id="${esc(rule.id)}">
        <option value="comment" ${rule.kind !== "gift" ? "selected" : ""}>${esc(t("trigger.comment"))}</option>
        <option value="gift" ${rule.kind === "gift" ? "selected" : ""}>${esc(t("trigger.gift"))}</option>
      </select>
      <input data-field="trigger-match" data-id="${esc(rule.id)}" value="${esc(rule.match || "")}" placeholder="${esc(rule.kind === "gift" ? t("trigger.giftPlaceholder") : t("trigger.keyword"))}" />
      <select data-field="trigger-video" data-id="${esc(rule.id)}">${videoOptions(rule.videoFile)}</select>
      <button type="button" data-action="delete-trigger" data-id="${esc(rule.id)}">${esc(t("action.delete"))}</button>
    </div>`).join("");
  mountVideoSearch(host);
}

function addTrigger() {
  const script = currentScript();
  if (!script) return;
  script.triggers = script.triggers || [];
  script.triggers.push({ id: uid(), kind: "comment", match: "", videoFile: "", startSec: 0, endSec: null });
  renderTriggers();
  persistSoon();
}

function deleteTrigger(id) {
  const script = currentScript();
  if (!script?.triggers) return;
  script.triggers = script.triggers.filter((rule) => rule.id !== id);
  renderTriggers();
  persistSoon();
}

const liveEvents = [];

function eventUser(event) {
  return event.user || t("speech.guestName");
}

function eventLine(event) {
  const user = eventUser(event);
  if (event.kind === "gift") return t("log.gift", { user, gift: event.gift, amount: event.amount || 1 });
  if (event.kind === "join") return t("log.join", { user });
  return t("log.chat", { user, text: event.text });
}

function renderEventLog() {
  const list = document.getElementById("eventLog");
  if (!list) return;
  list.innerHTML = liveEvents.map((event) => `<li>${esc(eventLine(event))}</li>`).join("");
}

let liveEventSeq = 0;

function onLiveEvent(event) {
  event.id = ++liveEventSeq;
  liveEvents.unshift(event);
  if (liveEvents.length > 30) liveEvents.pop();
  renderEventLog();
  paintLocalComments();
  const script = currentScript();
  if (event.kind === "join") {
    thankJoin(event.user);
    return;
  }
  const hit = (script?.triggers || []).find((rule) => ruleMatches(rule, event));
  if (!hit) return;
  if (!hit.videoFile || !mediaUrl(hit.videoFile)) return;
  if (triggerQueue.length >= 12) return;
  triggerQueue.push(hit);
  renderQueue();
  if (!triggerPlaying) runNextTrigger();
}

function ruleMatches(rule, event) {
  const needle = foldText(rule.match).trim();
  if (needle.length < 2) return false;
  if (rule.kind === "gift") {
    if (event.kind !== "gift") return false;
    if (String(event.giftId || "") === String(rule.match || "").trim()) return true;
    const name = foldText(event.gift);
    return name === needle || name.includes(needle);
  }
  if (event.kind !== "comment") return false;
  return foldText(event.text).includes(needle);
}

function finishTriggerClip() {
  if (!triggerPlaying || triggerSwitching) return;
  runNextTrigger();
}

function spokenName(name) {
  const clean = String(name || "").replace(/[^\p{L}\p{N} ]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 32);
  if (!clean || clean === "Khán giả" || clean === "Viewer") return "";
  return clean;
}

function speechCode(which) {
  return (which || lang) === "en" ? "en-US" : "vi-VN";
}

function preferredVoice(which) {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  const prefix = (which || lang) === "en" ? "en" : "vi";
  return voices.find((voice) => String(voice.lang || "").toLowerCase().startsWith(prefix)) || null;
}

function thankJoin(name) {
  const who = spokenName(name);
  const phrase = who ? t("speech.thanks", { name: who }) : t("speech.thanksGuest");
  const now = Date.now();
  if (now - (heardJoins.get(phrase) || 0) < 25000) return;
  heardJoins.set(phrase, now);
  if (announceQueue.length >= 6) announceQueue.shift();
  announceQueue.push({ id: uid(), text: phrase });
  renderQueue();
  pumpAnnounce();
}

function pumpAnnounce() {
  if (announcing || outputMode || !announceQueue.length || !window.speechSynthesis) return;
  const item = announceQueue[0];
  announcing = true;
  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    if (announceQueue[0] === item) announceQueue.shift();
    announcing = false;
    renderQueue();
    pumpAnnounce();
  };
  const utter = new SpeechSynthesisUtterance(item.text);
  utter.lang = speechCode();
  utter.rate = 1;
  const voice = preferredVoice();
  if (voice) utter.voice = voice;
  utter.onend = done;
  utter.onerror = done;
  setTimeout(done, 12000);
  window.speechSynthesis.speak(utter);
}

function speakIncoming(list, spokenLang) {
  if (!outputMode || !window.speechSynthesis) return;
  (list || []).forEach((item) => {
    if (!item?.id || !item.text || spokenIds.has(item.id)) return;
    spokenIds.add(item.id);
    const utter = new SpeechSynthesisUtterance(item.text);
    utter.lang = speechCode(spokenLang);
    utter.rate = 1;
    const voice = preferredVoice(spokenLang);
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  });
}

async function runNextTrigger() {
  const token = ++triggerToken;
  const rule = triggerQueue.shift();
  if (!rule) {
    triggerPlaying = false;
    triggerEndsAt = null;
    triggerSwitching = false;
    player.pause();
    setPlayUi();
    renderQueue();
    if (resumeAfterTrigger) {
      resumeAfterTrigger = false;
      playMode = resumeMode === "clip" ? "clip" : "bed";
      if (resumeFile) beginFile(resumeFile);
      else beginPlay(Math.max(0, resumeSceneIndex));
    }
    return;
  }
  if (!triggerPlaying) {
    resumeAfterTrigger = state.playing;
    resumeMode = playMode;
    resumeSceneIndex = state.sceneIndex;
    resumeFile = playMode === "clip" && state.sceneIndex < 0 ? (clipFile || player.dataset.file || "") : "";
    epoch += 1;
    state.playing = false;
    state.switching = false;
    player.pause();
  }
  triggerPlaying = true;
  triggerSwitching = true;
  renderQueue();
  setPlayUi();
  const url = mediaUrl(rule.videoFile);
  if (!url) {
    triggerSwitching = false;
    if (token === triggerToken) runNextTrigger();
    return;
  }
  try {
    if (player.dataset.file !== rule.videoFile) {
      player.dataset.file = rule.videoFile;
      await loadSrc(url);
    }
    if (token !== triggerToken) return;
    const start = Math.max(0, Number(rule.startSec) || 0);
    await seekTo(start);
    const end = rule.endSec == null ? null : Number(rule.endSec);
    triggerEndsAt = Number.isFinite(end) && end > start ? end : null;
    showPlaceholder(false);
    await player.play();
  } catch {
    if (token !== triggerToken) return;
    triggerSwitching = false;
    runNextTrigger();
    return;
  }
  if (token === triggerToken) triggerSwitching = false;
}

function toggleRoom() {
  if (roomMode === "live" || roomMode === "connecting") {
    post({ type: "stopRoom" });
    setRoomUi("idle", "room.stopping");
    return;
  }
  const user = document.getElementById("roomUser").value.trim().replace(/^@/, "");
  if (!user) {
    toast(t("room.needuser"), "warning");
    setTab("interact");
    document.getElementById("roomUser").focus();
    return;
  }
  const signingKey = document.getElementById("roomKey").value;
  if (!window.chrome?.webview) {
    setRoomUi("error", "room.preview");
    return;
  }
  setRoomUi("connecting", "room.connecting");
  post({ type: "startRoom", user, signingKey });
}

let roomMode = "idle";

function applyRoomForm(room) {
  if (!room) return;
  const user = document.getElementById("roomUser");
  const key = document.getElementById("roomKey");
  if (user && document.activeElement !== user) user.value = room.user || "";
  roomHasKey = !!room.hasKey;
  if (key) key.placeholder = roomHasKey ? t("room.keySaved") : t("room.keyPlaceholder");
  if (room.running) setRoomUi("live", "room.listening");
}

function setRoomUi(mode, message) {
  if (mode === "live" || mode === "connecting") roomMode = mode;
  else {
    roomMode = "idle";
    setViewerCount(null);
  }
  if (message) roomStatusKey = message;
  const button = document.getElementById("btnRoom");
  if (button) {
    const label = roomMode === "idle" ? t("room.listen") : t("room.stop");
    const icon = button.querySelector("i");
    button.dataset.tip = label;
    button.setAttribute("aria-label", label);
    if (icon) icon.className = roomMode === "idle" ? "fa-solid fa-headphones" : "fa-solid fa-stop";
    button.classList.toggle("is-live", roomMode === "live");
    button.disabled = roomMode === "connecting";
  }
  const status = document.getElementById("roomStatus");
  if (status && roomStatusKey) status.textContent = translateStatus(roomStatusKey);
}

function advance() {
  const script = currentScript();
  if (!script || state.switching || navLock) return;
  if (playMode === "clip") {
    playMode = "bed";
    beginPlay(0);
    return;
  }
  if (!script.loop) {
    stopPlayback();
    return;
  }
  beginPlay(0);
}

function step(delta) {
  const script = currentScript();
  if (!script?.scenes.length || state.playing || triggerPlaying) return;
  const base = Math.max(0, script.scenes.findIndex((scene) => scene.id === state.selectedSceneId));
  const index = clamp(base + delta, 0, script.scenes.length - 1);
  selectScene(script.scenes[index].id);
}

function onTime() {
  updateTimecode();
  if (triggerPlaying) {
    if (triggerEndsAt != null && player.currentTime >= triggerEndsAt - 0.08) finishTriggerClip();
    return;
  }
  if (!state.playing || state.switching) return;
  const script = currentScript();
  const scene = script?.scenes[state.sceneIndex];
  if (!script || !scene || script.mode !== "segments") return;
  const start = Number(scene.startSec) || 0;
  const end = Number(scene.endSec);
  if (scene.endSec == null || !Number.isFinite(end) || end <= start) return;
  if (player.currentTime >= end - 0.08) advance();
}

function onEnded() {
  if (triggerSwitching) return;
  if (triggerPlaying) {
    finishTriggerClip();
    return;
  }
  if (!state.playing || state.switching) return;
  advance();
}

function setCapture(on) {
  state.capture = on;
  document.body.classList.toggle("capture", on);
  markSelectedOverlay();
  post({ type: "setCapture", on });
}

function mockHost(message) {
  if (message.type === "saveScript") {
    const index = state.scripts.findIndex((script) => script.id === message.script.id);
    if (index >= 0) state.scripts[index] = message.script;
    else state.scripts.push(message.script);
    state.activeScriptId = message.activeScriptId || message.script.id;
    localStorage.setItem("livescript.v1", JSON.stringify({
      scripts: state.scripts,
      activeScriptId: state.activeScriptId
    }));
  } else if (message.type === "deleteScript") {
    state.scripts = state.scripts.filter((script) => script.id !== message.id);
    localStorage.setItem("livescript.v1", JSON.stringify({
      scripts: state.scripts,
      activeScriptId: state.activeScriptId
    }));
  } else if (message.type === "setActive") {
    state.activeScriptId = message.id;
    localStorage.setItem("livescript.v1", JSON.stringify({
      scripts: state.scripts,
      activeScriptId: state.activeScriptId
    }));
  } else if (message.type === "pickVideos") {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/mp4,video/webm,video/quicktime,.mkv,.m4v";
    input.multiple = true;
    input.onchange = () => {
      [...input.files].forEach((file) => {
        state.videos.push({
          fileName: file.name,
          displayName: file.name,
          sizeBytes: file.size,
          url: URL.createObjectURL(file)
        });
      });
      renderLibrary();
      renderInspector();
      toast(t("library.added", { n: input.files.length }), "success");
    };
    input.click();
  } else if (message.type === "deleteVideo") {
    const video = state.videos.find((item) => item.fileName === message.fileName);
    if (video?.url?.startsWith("blob:")) URL.revokeObjectURL(video.url);
    state.videos = state.videos.filter((item) => item.fileName !== message.fileName);
    renderLibrary();
    renderSceneList();
    renderInspector();
  }
}

function bootMock() {
  try {
    const saved = JSON.parse(localStorage.getItem("livescript.v1") || "null");
    if (saved?.scripts?.length) {
      state.scripts = saved.scripts;
      state.activeScriptId = saved.activeScriptId || saved.scripts[0].id;
    }
  } catch {
    state.scripts = [];
  }
  if (!state.scripts.length) {
    const sample = makeScript();
    sample.name = t("script.sample");
    state.scripts = [sample];
    state.activeScriptId = sample.id;
  }
  state.ready = true;
  ensureSelection();
  renderAll();
}

const outputMode = new URLSearchParams(location.search).get("output") === "1";
let remoteOverlayKey = "";
let followBusy = false;

function videoLabel(fileName) {
  return state.videos.find((video) => video.fileName === fileName)?.displayName || fileName || "Video";
}

function renderQueue() {
  const list = document.getElementById("queueList");
  const count = document.getElementById("queueCount");
  if (!list) return;
  const items = [];
  if (triggerPlaying && player.dataset.file) {
    items.push({ state: "now", text: t("queue.now", { name: videoLabel(player.dataset.file) }) });
  } else if (state.playing) {
    const scene = currentScript()?.scenes[state.sceneIndex];
    if (scene) items.push({ state: "now", text: t("queue.now", { name: scene.title || videoLabel(scene.videoFile) }) });
  }
  triggerQueue.forEach((rule, index) => {
    const why = rule.kind === "gift" ? t("queue.gift", { match: rule.match }) : t("queue.comment", { match: rule.match });
    items.push({ state: "wait", text: `${index + 1}. ${why} → ${videoLabel(rule.videoFile)}` });
  });
  announceQueue.forEach((item) => {
    items.push({ state: item === announceQueue[0] && announcing ? "now" : "wait", text: item.text });
  });
  const waiting = triggerQueue.length + announceQueue.length;
  if (count) count.textContent = String(waiting);
  const badge = document.getElementById("navQueue");
  if (badge) {
    badge.textContent = String(waiting);
    badge.hidden = waiting === 0;
  }
  if (!items.length) {
    list.innerHTML = `<li class="muted">${esc(t("queue.empty"))}</li>`;
    return;
  }
  list.innerHTML = items.map((item) => `<li class="${item.state}">${esc(item.text)}</li>`).join("");
}

function applyOutputLink(url) {
  const input = document.getElementById("outputLink");
  const status = document.getElementById("outputLinkStatus");
  if (!input || !url) return;
  input.value = url;
  if (status) status.textContent = t("stream.ready", frameOf(ratio));
}

function programSnapshot() {
  const script = currentScript();
  const scene = stageScene();
  const overlays = [];
  if (script) {
    script.overlays.forEach((overlay) => overlays.push(overlay));
    if (scene) scene.overlays.forEach((overlay) => overlays.push(overlay));
  }
  const frame = frameOf(ratio);
  return {
    file: player.dataset.file || "",
    time: player.currentTime || 0,
    playing: !player.paused && !player.ended && !!player.dataset.file,
    fit: script?.fit || "contain",
    badge: !!script?.showLiveBadge,
    stageWidth: document.getElementById("stage")?.clientWidth || frame.w,
    overlays,
    queue: queueItems(),
    announcements: announceQueue.map((item) => ({ id: item.id, text: item.text })),
    comments: commentLines(),
    showComments,
    viewers: viewerCount,
    showViewers,
    likes: recentLikes(),
    showLikes,
    randomHearts,
    commentLayout: widgetLayout.comment,
    viewerLayout: widgetLayout.viewer,
    ratio,
    frameWidth: frame.w,
    frameHeight: frame.h,
    lang
  };
}

function queueItems() {
  const items = [];
  if (triggerPlaying && player.dataset.file)
    items.push({ label: t("action.play"), text: videoLabel(player.dataset.file) });
  else if (state.playing) {
    const scene = currentScript()?.scenes[state.sceneIndex];
    if (scene) items.push({ label: t("action.play"), text: scene.title || videoLabel(scene.videoFile) });
  }
  triggerQueue.forEach((rule) => {
    const why = rule.kind === "gift" ? t("queue.gift", { match: rule.match }) : t("queue.comment", { match: rule.match });
    items.push({ label: t("action.next"), text: `${why} → ${videoLabel(rule.videoFile)}` });
  });
  return items;
}

function publishProgram() {
  if (outputMode) return;
  fetch("/api/program", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(programSnapshot())
  }).catch(() => {});
}

function paintRemoteOverlays(data) {
  const overlays = data.overlays || [];
  const targetWidth = data.frameWidth > 0 ? data.frameWidth : 1080;
  const scale = data.stageWidth > 0 ? targetWidth / data.stageWidth : 1;
  const key = JSON.stringify({ overlays, scale: Math.round(scale * 100) });
  if (key === remoteOverlayKey) return;
  remoteOverlayKey = key;
  const layer = document.getElementById("overlayLayer");
  layer.innerHTML = "";
  overlays.forEach((overlay) => {
    const el = document.createElement("div");
    el.className = "overlay";
    el.appendChild(document.createElement("span"));
    paintOverlay(el, {
      ...overlay,
      fontSize: Math.max(12, Math.round((overlay.fontSize || 28) * scale))
    });
    layer.appendChild(el);
  });
}

let outputScaleKey = "";

function fitOutputFrame() {
  if (!outputMode) return;
  const shell = document.querySelector(".shell");
  if (!shell) return;
  const w = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--frame-w")) || 1080;
  const h = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--frame-h")) || 1920;
  if (!(w > 0) || !(h > 0)) return;
  const scale = Math.min(window.innerWidth / w, window.innerHeight / h);
  const x = (window.innerWidth - w * scale) / 2;
  const y = (window.innerHeight - h * scale) / 2;
  const fitted = Math.abs(scale - 1) > 0.001 || Math.abs(x) > 0.5 || Math.abs(y) > 0.5;
  const key = fitted ? `${w}x${h}:${scale.toFixed(4)}:${x.toFixed(1)}:${y.toFixed(1)}` : "1";
  if (key === outputScaleKey) return;
  outputScaleKey = key;
  shell.style.transform = fitted ? `translate(${x}px, ${y}px) scale(${scale})` : "";
}

async function followProgram() {
  if (followBusy) return;
  let data;
  try {
    data = await (await fetch("/api/program", { cache: "no-store" })).json();
  } catch {
    return;
  }
  if (!data || typeof data !== "object") return;
  speakIncoming(data.announcements, data.lang);
  document.getElementById("liveBadge").hidden = !data.badge;
  player.style.objectFit = data.fit === "cover" ? "cover" : "contain";
  if (FRAMES[data.ratio])
    document.documentElement.dataset.ratio = data.ratio;
  fitOutputFrame();
  if (data.commentLayout) widgetLayout.comment = normalizeCommentLayout(data.commentLayout);
  if (data.viewerLayout) widgetLayout.viewer = normalizeViewerLayout(data.viewerLayout);
  placeWidgets();
  paintRemoteOverlays(data);
  paintCommentFeed(Array.isArray(data.comments) ? data.comments : [], data.showComments !== false);
  paintViewerBadge(data.viewers, data.showViewers !== false);
  playIncomingLikes(data.likes, data.showLikes !== false || data.randomHearts === true);
  const file = data.file || "";
  if (!file) {
    if (player.dataset.file) {
      player.removeAttribute("src");
      player.dataset.file = "";
      showPlaceholder(true);
    }
    return;
  }
  try {
    if (player.dataset.file !== file) {
      followBusy = true;
      player.dataset.file = file;
      await loadSrc(`media/${encodeURIComponent(file)}`);
      followBusy = false;
    }
    if (Number.isFinite(data.time) && Math.abs((player.currentTime || 0) - data.time) > 0.4)
      player.currentTime = data.time;
    showPlaceholder(false);
    if (data.playing && player.paused) await player.play();
    if (!data.playing && !player.paused) player.pause();
  } catch {
    followBusy = false;
  }
}

function setTab(tab) {
  const names = {
    stage: t("page.stage"),
    library: t("page.library"),
    script: t("page.script"),
    interact: t("page.interact"),
    stream: t("page.stream"),
    settings: t("page.settings"),
    about: t("page.about")
  };
  if (!names[tab]) tab = "stage";
  document.body.dataset.tab = tab;
  document.querySelectorAll("#viewTabs [data-tab]").forEach((button) => {
    const on = button.dataset.tab === tab;
    button.classList.toggle("is-on", on);
    if (on) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  const title = document.getElementById("pageTitle");
  if (title) title.textContent = names[tab];
  applyPaneLayout();
}

let paneWork = null;
let paneSettings = null;
const stageCard = { w: null, h: null };

function loadPanes() {
  try {
    const saved = JSON.parse(localStorage.getItem("livescript.panes") || "null");
    if (!saved) return;
    if (Number.isFinite(saved.paneWork)) paneWork = saved.paneWork;
    if (Number.isFinite(saved.paneSettings)) paneSettings = saved.paneSettings;
    if (Number.isFinite(saved.stageW)) stageCard.w = saved.stageW;
    if (Number.isFinite(saved.stageH)) stageCard.h = saved.stageH;
  } catch {
  }
}

function savePanes() {
  localStorage.setItem("livescript.panes", JSON.stringify({
    paneWork, paneSettings, stageW: stageCard.w, stageH: stageCard.h
  }));
}

function panesActive() {
  return !outputMode && document.body.dataset.tab !== "stage" && document.body.dataset.tab !== "about" && window.innerWidth > 1040;
}

function applyStageCard() {
  const root = document.documentElement;
  if (outputMode || document.body.dataset.tab !== "stage") {
    root.style.removeProperty("--stage-card-w");
    root.style.removeProperty("--stage-card-h");
    return;
  }
  if (stageCard.w) root.style.setProperty("--stage-card-w", `${Math.round(stageCard.w)}px`);
  else root.style.removeProperty("--stage-card-w");
  if (stageCard.h) root.style.setProperty("--stage-card-h", `${Math.round(stageCard.h)}px`);
  else root.style.removeProperty("--stage-card-h");
}

function applyPaneLayout() {
  const main = document.querySelector("main");
  if (!main) return;
  const split = document.getElementById("paneSplit");
  const stageHandle = document.getElementById("stageResize");
  if (split) {
    split.title = t("layout.resizePanes");
    split.setAttribute("aria-label", t("layout.resizePanes"));
  }
  if (stageHandle) {
    stageHandle.title = t("layout.resizeStage");
    stageHandle.setAttribute("aria-label", t("layout.resizeStage"));
  }
  applyStageCard();
  if (!panesActive()) {
    main.style.gridTemplateColumns = "";
    return;
  }
  const fraction = document.body.dataset.tab === "settings" ? paneSettings : paneWork;
  if (!Number.isFinite(fraction)) {
    main.style.gridTemplateColumns = "";
    return;
  }
  const left = clamp(fraction, 0.18, 0.82);
  main.style.gridTemplateColumns = `minmax(240px, ${left}fr) minmax(280px, ${1 - left}fr)`;
}

function bindPaneResize() {
  const split = document.getElementById("paneSplit");
  const stageHandle = document.getElementById("stageResize");
  if (split) {
    split.addEventListener("pointerdown", (event) => {
      if (!panesActive() || event.button !== 0) return;
      event.preventDefault();
      const main = document.querySelector("main");
      const stage = document.querySelector(".stage-col");
      const box = main.getBoundingClientRect();
      const style = getComputedStyle(main);
      const usable = Math.max(1, box.width - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0) - (parseFloat(style.columnGap) || 0));
      const startLeft = stage.getBoundingClientRect().width;
      const startX = event.clientX;
      split.classList.add("is-drag");
      split.setPointerCapture(event.pointerId);
      const move = (ev) => {
        const left = clamp(startLeft + (ev.clientX - startX), 240, usable - 280);
        const fraction = left / usable;
        if (document.body.dataset.tab === "settings") paneSettings = fraction;
        else paneWork = fraction;
        applyPaneLayout();
        placeWidgets();
      };
      const up = () => {
        split.classList.remove("is-drag");
        split.removeEventListener("pointermove", move);
        split.removeEventListener("pointerup", up);
        split.removeEventListener("pointercancel", up);
        savePanes();
      };
      split.addEventListener("pointermove", move);
      split.addEventListener("pointerup", up);
      split.addEventListener("pointercancel", up);
    });
    split.addEventListener("dblclick", () => {
      if (document.body.dataset.tab === "settings") paneSettings = null;
      else paneWork = null;
      applyPaneLayout();
      savePanes();
    });
    split.addEventListener("keydown", (event) => {
      if (!panesActive() || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
      event.preventDefault();
      const main = document.querySelector("main");
      const stage = document.querySelector(".stage-col");
      const box = main.getBoundingClientRect();
      const style = getComputedStyle(main);
      const usable = Math.max(1, box.width - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0) - (parseFloat(style.columnGap) || 0));
      const current = stage.getBoundingClientRect().width / usable;
      const next = clamp(current + (event.key === "ArrowRight" ? 0.02 : -0.02), 240 / usable, (usable - 280) / usable);
      if (document.body.dataset.tab === "settings") paneSettings = next;
      else paneWork = next;
      applyPaneLayout();
      savePanes();
    });
  }
  if (stageHandle) {
    stageHandle.addEventListener("pointerdown", (event) => {
      if (outputMode || document.body.dataset.tab !== "stage" || event.button !== 0) return;
      event.preventDefault();
      const col = document.querySelector(".stage-col");
      const main = document.querySelector("main");
      const rect = col.getBoundingClientRect();
      const mainRect = main.getBoundingClientRect();
      const style = getComputedStyle(main);
      const maxW = mainRect.width - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0);
      const maxH = mainRect.height - (parseFloat(style.paddingTop) || 0) - (parseFloat(style.paddingBottom) || 0);
      const startW = rect.width;
      const startH = rect.height;
      const startX = event.clientX;
      const startY = event.clientY;
      stageHandle.classList.add("is-drag");
      stageHandle.setPointerCapture(event.pointerId);
      const move = (ev) => {
        stageCard.w = clamp(startW + (ev.clientX - startX) * 2, 280, maxW);
        stageCard.h = clamp(startH + (ev.clientY - startY) * 2, 320, maxH);
        applyStageCard();
        placeWidgets();
      };
      const up = () => {
        stageHandle.classList.remove("is-drag");
        stageHandle.removeEventListener("pointermove", move);
        stageHandle.removeEventListener("pointerup", up);
        stageHandle.removeEventListener("pointercancel", up);
        savePanes();
      };
      stageHandle.addEventListener("pointermove", move);
      stageHandle.addEventListener("pointerup", up);
      stageHandle.addEventListener("pointercancel", up);
    });
    stageHandle.addEventListener("dblclick", () => {
      stageCard.w = null;
      stageCard.h = null;
      applyStageCard();
      savePanes();
    });
  }
  window.addEventListener("resize", () => {
    applyPaneLayout();
    fitOutputFrame();
  });
  applyPaneLayout();
}

function bindHoverTips() {
  const tip = document.getElementById("hoverTip");
  if (!tip) return;
  let current = null;

  const hide = () => {
    tip.hidden = true;
    current = null;
  };

  const labelShown = (el) => {
    const span = el.querySelector(":scope > span");
    if (!span) return false;
    return getComputedStyle(span).display !== "none";
  };

  const place = (el) => {
    const text = el?.dataset?.tip;
    if (!text || outputMode || labelShown(el)) {
      hide();
      return;
    }
    current = el;
    tip.textContent = text;
    tip.hidden = false;
    const rect = el.getBoundingClientRect();
    const margin = 8;
    const width = tip.offsetWidth;
    const height = tip.offsetHeight;
    const sidebar = el.closest(".sidebar");
    const rail = sidebar && getComputedStyle(sidebar).flexDirection === "column";
    let left = rail ? rect.right + margin : rect.left + rect.width / 2 - width / 2;
    let top = rail ? rect.top + rect.height / 2 - height / 2 : rect.bottom + margin;
    if (!rail && top + height > window.innerHeight - 8)
      top = rect.top - height - margin;
    if (left + width > window.innerWidth - 8)
      left = window.innerWidth - width - 8;
    tip.style.left = `${Math.max(8, left)}px`;
    tip.style.top = `${Math.max(8, top)}px`;
  };

  document.addEventListener("pointerover", (event) => {
    const el = event.target.closest?.("[data-tip]");
    if (el) place(el);
  });
  document.addEventListener("pointerout", (event) => {
    if (!current) return;
    if (event.relatedTarget && current.contains(event.relatedTarget)) return;
    hide();
  });
  document.addEventListener("focusin", (event) => {
    const el = event.target.closest?.("[data-tip]");
    if (el) place(el);
  });
  document.addEventListener("focusout", hide);
  document.addEventListener("pointerdown", hide);
  window.addEventListener("scroll", hide, true);
  window.addEventListener("resize", hide);
}

function bindStatic() {
  bindHoverTips();
  const pick = () => post({ type: "pickVideos" });
  document.getElementById("btnAdd").addEventListener("click", pick);
  document.getElementById("btnAddSide").addEventListener("click", pick);
  document.getElementById("viewTabs").addEventListener("click", (event) => {
    const tab = event.target.closest("[data-tab]");
    if (!tab) return;
    setTab(tab.dataset.tab);
  });
  document.getElementById("btnNewScript").addEventListener("click", addScript);
  document.getElementById("btnExitCapture").addEventListener("click", () => setCapture(false));
  document.getElementById("btnRoom").addEventListener("click", toggleRoom);
  document.getElementById("themeSwitch").addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-value]");
    if (!button) return;
    setPreference({ theme: button.dataset.themeValue });
  });
  document.getElementById("langSwitch").addEventListener("click", (event) => {
    const button = event.target.closest("[data-lang-value]");
    if (!button) return;
    setPreference({ lang: button.dataset.langValue });
  });
  document.getElementById("ratioSwitch").addEventListener("click", (event) => {
    const button = event.target.closest("[data-ratio-value]");
    if (!button) return;
    setPreference({ ratio: button.dataset.ratioValue });
  });
  document.getElementById("showComments").addEventListener("change", (event) => {
    setPreference({ showComments: event.target.checked });
  });
  document.getElementById("showViewers").addEventListener("change", (event) => {
    setPreference({ showViewers: event.target.checked });
  });
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  bindWidgetDrag(document.getElementById("commentFeed"), "comment");
  bindWidgetDrag(document.getElementById("viewerBadge"), "viewer");
  ["commentX", "commentY", "commentW", "commentH", "commentScale", "viewerX", "viewerY", "viewerScale"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", () => {
      readLayoutInputs();
      placeWidgets();
      saveLayoutPrefs();
    });
  });
  document.getElementById("showLikes").addEventListener("change", (event) => {
    setPreference({ showLikes: event.target.checked });
  });
  document.getElementById("randomHearts").addEventListener("change", (event) => {
    setPreference({ randomHearts: event.target.checked });
  });
  document.getElementById("heartRate").addEventListener("input", (event) => {
    if (String(event.target.value).trim() === "") return;
    setPreference({ heartRate: clampHeartRate(event.target.value) });
  });
  document.getElementById("heartRate").addEventListener("change", (event) => {
    const n = clampHeartRate(event.target.value);
    event.target.value = String(n);
    setPreference({ heartRate: n });
  });
  document.getElementById("btnCopyLink").addEventListener("click", async () => {
    const input = document.getElementById("outputLink");
    const value = input.value.trim();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      input.focus();
      input.select();
      document.execCommand("copy");
    }
    toast(t("toast.copied"), "success");
  });
  ["roomUser", "roomKey"].forEach((id) => {
    document.getElementById(id).addEventListener("change", () => {
      post({
        type: "saveRoom",
        user: document.getElementById("roomUser").value.trim().replace(/^@/, ""),
        signingKey: document.getElementById("roomKey").value
      });
    });
  });
  document.getElementById("licensePlans")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-plan]");
    if (!button) return;
    licensePlan = button.dataset.plan || "free";
    document.querySelectorAll(".license-plan").forEach((item) => item.classList.toggle("is-on", item.dataset.plan === licensePlan));
  });
  document.getElementById("licenseSubmit")?.addEventListener("click", () => {
    post({ type: "licenseChoose", plan: licensePlan });
  });
  document.getElementById("licenseBack")?.addEventListener("click", () => {
    post({ type: "licenseBack" });
  });
  document.getElementById("licensePay")?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    const id = button.dataset.copy === "account" ? "licensePayAccount" : "licensePayRef";
    const value = document.getElementById(id)?.textContent?.trim() || "";
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    toast(button.dataset.copy === "account" ? "Đã sao chép số tài khoản" : "Đã sao chép nội dung", "success");
  });
  document.getElementById("licenseExpired")?.addEventListener("click", (event) => {
    const button = event.target.closest(".expire-plan");
    if (!button || licenseChoosing) return;
    licenseChoosing = true;
    document.querySelectorAll(".expire-plan").forEach((item) => item.classList.toggle("is-on", item === button));
    setExpireStatus("Đang tạo mã thanh toán…");
    post({ type: "licenseChoose", plan: button.dataset.plan });
  });
  document.getElementById("licenseCopy")?.addEventListener("click", async () => {
    const value = document.getElementById("licenseKeyValue")?.textContent?.trim() || "";
    if (!value || value.includes("…")) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    toast("Đã sao chép key", "success");
  });
  document.getElementById("btnPlay").addEventListener("click", togglePlay);
  document.getElementById("btnPlay2").addEventListener("click", togglePlay);
  document.getElementById("btnPrev").addEventListener("click", () => step(-1));
  document.getElementById("btnNext").addEventListener("click", () => step(1));
  document.getElementById("btnMute").addEventListener("click", () => {
    player.muted = !player.muted;
    setMuteUi();
  });
  setMuteUi();

  [document.getElementById("editor"), document.getElementById("settingsPanel")].forEach((root) => {
    root.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button || !root.contains(button)) return;
      runAction(button.dataset.action, button);
    });
    root.addEventListener("input", (event) => {
      const field = event.target.dataset?.field;
      if (!field || event.target.tagName === "SELECT" || event.target.type === "checkbox") return;
      const skip = applyField(field, event.target);
      if (skip !== "skip") persistSoon();
    });
    root.addEventListener("change", (event) => {
      const field = event.target.dataset?.field;
      if (!field) return;
      if (event.target.tagName !== "SELECT" && event.target.type !== "checkbox") return;
      const skip = applyField(field, event.target);
      if (skip !== "skip") persistSoon();
    });
  });

  document.getElementById("videoList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    runAction(button.dataset.action, button);
  });

  window.addEventListener("keydown", (event) => {
    if (document.documentElement.classList.contains("needs-license")) return;
    const tag = document.activeElement?.tagName;
    const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || !!document.activeElement?.closest?.(".select2-container, .select2-dropdown");
    if (event.key === "Escape") {
      if (typing) document.activeElement.blur();
      else if (state.capture) setCapture(false);
      return;
    }
    if (typing) return;
    if (event.key === " ") {
      event.preventDefault();
      togglePlay();
    } else if (event.key === "ArrowRight") {
      step(1);
    } else if (event.key === "ArrowLeft") {
      step(-1);
    }
  });

  player.addEventListener("timeupdate", onTime);
  player.addEventListener("ended", onEnded);
  player.addEventListener("loadedmetadata", updateTimecode);
  bindPaneResize();
}

loadLocalPrefs();
loadPanes();
applyTheme();
if (!outputMode) applyLang();
bindStatic();
setInterval(tickTokens, 200);

if (outputMode || !window.chrome?.webview) {
  document.documentElement.classList.remove("needs-license");
  document.documentElement.classList.add("license-ok");
} else {
  renderLicense(null);
}

if (outputMode) {
  document.body.classList.add("output");
  fitOutputFrame();
  setInterval(() => { void followProgram(); }, 200);
} else if (window.chrome?.webview) {
  window.chrome.webview.addEventListener("message", (event) => onHost(event.data));
  setInterval(publishProgram, 200);
  post({ type: "ready" });
} else {
  bootMock();
  setInterval(renderQueue, 400);
}
