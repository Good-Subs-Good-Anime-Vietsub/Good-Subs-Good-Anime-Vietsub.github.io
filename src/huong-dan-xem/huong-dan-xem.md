# Hướng dẫn xem

## Trình phát
Phụ đề của nhóm được làm và test dựa trên [libass](https://github.com/libass/libass), cho nên cực kỳ khuyến nghị xem bằng trình phát có sử dụng libass để render phụ đề giúp đảm bảo mọi người có được trải nghiệm xem chuẩn nhất. 

[mpv](https://mpv.io/), là trình phát, gọn, nhẹ, linh hoạt, đa nền tảng. mpv hỗ trợ hầu hết các định dạng video, audio và subtitle, có thể tuỳ biến cực kỳ sâu và nhiều tính năng hữu ích cho Advanced User. Đây sẽ là trình phát được chúng mình khuyến nghị sử dụng. Tuy nhiên mpv được thiết kế để điều khiển bằng command line và các keybind nên UI chỉ có những chức năng cơ bản kèm theo với việc khó cài đặt đối với người dùng không chuyên.

Nhưng không sao, chúng mình đã có hướng dẫn cài mpv dành cho chi tiết kèm theo đó là config tối ưu cho việc xem anime và nhiều tính năng hữu ích.
- [Windows](mpv-windows.md)
- [Linux]() Tự bơi đê...
- [MacOS](mpv-mac.md)
- [Hướng dẫn cài đặt config](mpv-config.md)

Hoặc dưới đây là list các phần mềm dựa trên mpv và có GUI:

- Windows:
  - [mpv.net](https://github.com/mpvnet-player/mpv.net) Có GUI đơn giản gần giống với GUI của bản gốc, có thể tuỳ chỉnh các chức năng cơ bản.
  - [mpc-qt](https://github.com/mpc-qt/mpc-qt) Sao chép giao diện giống MPC-HC, sử dụng Qt.

- Linux:
  - [celluloid](https://github.com/celluloid-player/celluloid)
  - [haruna](https://invent.kde.org/multimedia/haruna)
  - [mpc-qt](https://github.com/mpc-qt/mpc-qt)

- MacOS:
  - [IINA](https://iina.io/)

mpv gốc không có app dành cho Android và IOS thế nên dưới đây sẽ là app dựa trên libmpv dành cho hai nền tảng này:

- Android:
  - [mpv-android](https://github.com/mpv-android/mpv-android) Là mpv được phát triển dành cho Android.

- IOS:
  - [Outplayer](https://outplayer.app/) Sử dụng libmpv, có phiên bản trả phí tuy nhiên bản miễn phí là quá ổn để sử dụng.

Ngoài ra đối với Windows, [MPC-HC](https://codecguide.com/download_k-lite_codec_pack_mega.htm) (K-Lite) kèm với [XySubfilter libass](https://github.com/Masaiki/xy-VSFilter) cũng sẽ là lựa chọn không tồi.

Đối với TV/Android box mình khuyến khích cắm vào Laptop hoặc PC để xuất hình qua TV. Nếu bạn vẫn muốn xem trên đây thì có thể sử dụng [Kodi](https://kodi.tv/) hoặc mpv-android (đối với Android TV) tuy nhiên giao diện của mpv-android trên TV không được tối ưu. Và lưu ý không nên chọn định dạng H264/10bit hoặc các định dạng mà phần cứng không hỗ trợ Hardware Decode. Do CPU của TV/Android box khá yếu, nên khi sử dụng Software Decode sẽ không có được trải nghiệm tốt nhất.