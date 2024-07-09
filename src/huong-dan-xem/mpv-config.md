

# Cài đặt config cho mpv.

Khi hoàn thành cài đặt thì đã có thể sử dụng mpv, tuy nhiên các tính năng stock của mpv khá ít và không cho giao diện chỉn chu. Đây sẽ là hướng dẫn cài đặt config được dựng sẵn của tụi mình giúp có thêm nhiều tính năng và dễ dàng hơn trong quá trình sử dụng.
Config đã đủ các chức năng dành cho người dùng phổ thông, hãy thử duyệt qua từng Menu trên UI để biết thêm các tính năng, ấn phím **F1** để xem keybind đã được gán.

## Windows

1. Tải config [tại đây](https://github.com/tuilakhanh/mpv-config/archive/refs/heads/master.zip).
2. Giải nén file zip với lựa chọn **Extract here**.
3. Di chuyển folder **mpv-config-master** vào folder chứa **mpv.exe**.
4. Đổi tên folder **mpv-config-master** thành **portable_config**

<div style="text-align: center">
  <video controls>
    <source src="mpv-04.mp4" type="video/mp4" />
  </video>
</div>

## Linux

```bash
git clone https://github.com/tuilakhanh/mpv-config ~/.config/mpv
```

Thay đổi **gpu-api** thành **vulkan** để có hiệu năng tốt hơn. Mở file mở file mpv.conf, comment dòng **gpu-api=d3d11** và uncomment dòng **gpu-api=vulkan**.
Nếu GPU của bạn quá cũ không hỗ trợ **vulkan** thì hãy điều chỉnh thành **gpu-api=opengl**. Khi sử dụng opengl, xem HDR sẽ kém hơn và không xem được Dolby Vision.

## MacOS

Các bước cài đặt sẽ tương tự như Linux.

## Điều chỉnh Profile
Xong các bước trên là bạn đã hoàn thành cài đặt config cho mpv. Tiếp theo bạn cần chỉnh profile tương thích với máy của bạn.

Mở tệp `mpv.conf`, tại dòng **profile=**, sẽ có 3 mức **profile** tương ứng chất lượng hình ảnh và sức mạnh GPU của bạn. 
- Nếu máy sử dụng iGPU từ đời Napoleon hoặc không muón ăn quá nhiều hiệu năng thì hãy chỉnh thành **Fast**.
- Nếu máy bạn iGPU đời mới thì giữ nguyên mức **Balanced**.
- Nếu GPU đủ mạnh thì hãy chỉnh thành **HighQuality** đề tối ưu hết sức mạnh của GPU và chất lượng hình ảnh tốt hơn.
- Profile **HighQuality** chưa thoả mãn với bạn thì có thể sử dụng thêm Shaders tại menu Shader, **ArtCNN** đối với nội dung có độ phân giải cao **NNEDI3** đối với nội dung có độ phân giải thấp.

## Showcase

Dưới đây là demo một số chức năng:

- Xem trực tiếp từ DDL không cần phải tải về.
![mpv-06](mpv-06.webp)

- Xem Youtube qua mpv có thể bắt đc 1080p Premium và có thêm filter deband để xoá banding.
![mpv-05](mpv-05.webp)

Và còn rất nhiều tính năng hữu ích khác như cut video, crop black bar... Hãy tìm hiểu thêm bằng cách sử dụng Menu.