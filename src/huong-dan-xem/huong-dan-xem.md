# Hướng dẫn xem

## Trình phát
Phụ đề của nhóm được làm và test dựa trên [libass](https://github.com/libass/libass), cho nên cực kỳ khuyến nghị xem bằng trình phát có sử dụng libass để render phụ đề giúp đảm bảo mọi người có được trải nghiệm xem chuẩn nhất. 

[mpv](https://mpv.io/), là trình phát mã nguồn mở, gọn, nhẹ, linh hoạt, đã nền tảng. mpv hỗ trợ hầu hết các định dạng video, audio và subtitle, có thể tuỳ biến cực kỳ sâu và nhiều tính năng hữu ích cho Advanced User. Đây sẽ là trình phát được chúng khuyến nghị sử dụng. Tuy nhiên mpv được thiết kế để điều khiển bằng command line nên UI chỉ có những chức năng cơ bản kèm theo với việc khó cài đặt đối với người dùng không chuyên. 

Nhưng không sao chúng mình đã có hương dẫn cài mpv chi tiết kèm theo đó là config tối ưu cho việc xem anime và nhiều tính năng hữu ích nhưng vẫn đảm bảo định tính gọn, nhẹ của player. Các bạn có thể xem [tại đây](mpv.md).

Còn ai lười hơn nữa thì dưới đây là list các phần mềm dựa trên mpv và có GUI:

- Windows:
  - [mpv.net](https://github.com/mpvnet-player/mpv.net/releases) Có GUI đơn giản gần giống với GUI của bản gốc, có thể tuỳ chỉnh các chức năng cơ bản.
  - [mpc-qt](https://github.com/mpc-qt/mpc-qt/releases) Sao chép giao diện giống MPC-HC, sử dụng Qt.
  - [ImPlay](https://github.com/tsl0922/ImPlay)

- Linux:
  - [mpv](https://github.com/mpv-player/mpv) Khuyến nghị sử dụng mpv gốc và tự config cho đúng triết lý của Linux :DD.
  - [ImPlay](https://github.com/tsl0922/ImPlay)

- MacOS:
  - [IINA](https://iina.io/)

mpv gốc không có app dành cho Android và IOS thế nên dưới đây sẽ là app dựa trên libmpv dành cho hai nền tảng này:

- Android:
  - [mpv-android](https://github.com/mpv-android/mpv-android) Là mpv được phát triển dành cho Android.

- IOS:
  - [Outplayer](https://outplayer.app/) Sử dụng libmpv có phiên bản trả phí tuy nhiên bản miễn phí là quá ổn để sử dụng.

Ngoài ra đối với Windows, [MPC-HC](https://codecguide.com/download_k-lite_codec_pack_mega.htm) (K-Lite) kèm với [XySubfilter libass](https://github.com/Masaiki/xy-VSFilter) cũng sẽ là lựa chọn không tồi.

Đối với TV/Android box mình khuyến khích cắm vào Laptop hoặc PC để xuất hình qua TV. CPU của TV/Android box khá yếu, nên có thể không có được trải nghiệm tốt nhất. Nếu bạn vẫn muốn xem trên đây thì có thể sử dụng [Kodi](https://kodi.tv/) hoặc mpv-android (đối với Android TV) tuy nhiên giao diện của mpv-android trên TV không được tối ưu nên khá cùi. Và lưu ý không nên xem Video H264/10bit trên đây thường thi định dạng này không hỗ trợ Hardware Decode nên sẽ phải sử dụng Software Decode mà CPU cùi nên chắc chắn sẽ không thể xem được.