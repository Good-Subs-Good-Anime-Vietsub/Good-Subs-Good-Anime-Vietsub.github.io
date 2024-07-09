# mpv

# Hướng dẫn cài đặt mpv Windows

Đây sẽ là hướng dẫn cho người mới bắt đầu thế nên mình sẽ hướng dẫn đơn giản và dễ hiếu nhất có thể.
Nếu có bước nào không hiểu có thể hỏi tụi mình tại Discord của nhóm.

## Cài đặt mpv

1. Download bản build mới nhất dành cho Windows tại [zhongfly/mpv-winbuild](https://github.com/zhongfly/mpv-winbuild/releases). Tên file có dạng 
**mpv-x86_64-*.7z**, đối với file có thêm hậu tố **v3** thì sẽ dành cho máy có CPU từ đời **Haswell** (Intel) và **Excavator** (AMD) trở lên, nếu máy bạn đáp ứng đủ điều kiện trên thì nên sử dụng file này để có hiệu năng tối ưu nhất. (Cái này các bạn Google hoặc hỏi AI đời CPU đang dùng là biết ngay nó thuộc "vi kiến trúc" nào)
2. Sau khi Download, giải nén toàn bộ dữ liệu trong file nén đến folder tuỳ theo ý bạn chỉ định. (quan trọng)
3. Mở folder chứa dữ liệu mà bạn đã giải nén, có folder **installer** sau đó chạy file **mpv-install.bat** dưới quyền Admin. Sau một lúc thì mpv đã được cài đặt thành công vào máy của bạn, nếu muốn gỡ cài đặt hãy chạy file **mpv-uninstall.bat**.
> **Lưu ý vị trí cũng như tên folder không được thay đổi sau khi đã cài đặt. Nếu bạn muốn di chuyển hay đổi tên thì hãy gỡ cài đặt trước**

<div style="text-align: center">
  <video controls>
    <source src="mpv-01.mp4" type="video/mp4" />
  </video>
</div>

## Cài đặt thêm yt-dlp, ffmpeg và cập nhật mpv.

yt-dlp và ffmpeg là hai phần mềm bổ trợ giúp mpv có thể stream video trực tiếp từ Direct Download Link (VD như DDL từ index mà nhóm sử dụng) hoặc xem Video từ YouTube và một số site yt-dlp hỗ trợ thông qua mpv.

1. Tại folder chứa dữ liệu mà bạn đã giải nén, chạy file **updater.bat**. Và ấn phím theo hướng dẫn của script.
1. Tại bước đầu tiên chọn **2** nếu CPU bạn có hỗ trợ v3 như giải thích ở trên, ngược lại chọn **1**.
1. Tại bước tiếp theo chọn **Y** để xoá file nén sau khi đã giải nén.
1. Tại bước tiếp theo script sẽ tự động tải yt-dlp.
1. Tại bước cuối script sẽ hỏi bạn tài ffmpeg không, chọn **Y** để script cài đặt ffmpeg.

Script **updater.bat** cũng là script dùng để update mpv bạn nên chạy mỗi tuần 1 lần.

<div style="text-align: center">
  <video controls>
    <source src="mpv-02.mp4" type="video/mp4" />
  </video>
</div>

## Thêm mpv vào PATH (Không bắt buộc)

Nếu bạn muốn sử dụng mpv, yt-dlp và ffmpeg từ command line bạn phải thêm vào Windows PATH:

1. Mở **Windows Settings -> System -> About** và chọn **Advanced System Settings** hoặc có thể gõ **Advanced System Settings** vào Windows Search để mở nhanh mục này.
1. Tại Tab **Advanced** chọn **Environment Variables...**. 
1. Tại **User variables for __** chọn dòng **Path** và chọn **Edit**.
1. Chọn **New** và dán đường dẫn tới folder chứa **mpv.exe**, **yt-dlp.exe**.
1. Chọn Ok sau khi hoàn thành.

<div style="text-align: center">
  <video controls>
    <source src="mpv-03.mp4" type="video/mp4" />
  </video>
</div>

## Cài đặt config cho mpv. (Khuyến khích)

Khi hoàn thành bước 1 và 2 thì đã có thể sử dụng mpv, tuy nhiên các tính năng stock của mpv khá ít và không cho giao diện chỉn chu. Đây sẽ là hướng dẫn cài đặt config của tụi mình giúp có thêm nhiều tính năng và dễ dàng hơn trong quá trình sử dụng.

1. Tải config [tại đây](https://github.com/tuilakhanh/mpv-config/archive/refs/heads/master.zip).
2. Giải nén file zip với lựa chọn **Extract here**.
3. Copy folder **mpv-config-master** vào folder chứa **mpv.exe**, **yt-dlp.exe**.
4. Rename folder **mpv-config-master** thành **portable_config**

Xong các bước trên là bạn đã hoàn thành cài đặt config cho mpv. Tiếp theo bạn cần chỉnh profile tương thích với máy của bạn.

Mở tệp `mpv.conf` trong folder `portable_config` vừa xong, tại dòng **profile=**, sẽ có 3 mức **profile** tương ứng chất lượng hình ảnh và sức mạnh GPU của bạn. 
- Nếu máy sử dụng iGPU từ đời Napoleon hoặc không yêu cầu quá nhiều hiệu năng thì hãy chỉnh thành **Fast**.
- Nếu máy bạn từ iGPU đời mới thì giữ nguyên mức **Balanced**.
- Nếu GPU đủ mạnh thì hãy chỉnh thành **HighQuality** đề tối ưu hết sức mạnh của GPU.
- Profile **HighQuality** chưa thoả mãn với bạn thì có thể sử dụng thêm Shaderư tại menu Shader, **ArtCNN** đối với nội dung có độ phân giải cao **NNEDI3** đối với nội dung có độ phân giải thấp.

<div style="text-align: center">
  <video controls>
    <source src="mpv-04.mp4" type="video/mp4" />
  </video>
</div>

Config đã đủ các chức năng dành cho người dùng phổ thông, hãy thử duyệt qua từng Menu trên UI để biết thêm các tính năng cũng như là các keybind đã được gán.

Dưới đây là demo một số chức năng:

- Xem trực tiếp từ DDL không cần phải tải về.
![mpv-06](mpv-06.webp)

- Xem Youtube qua mpv có thể bắt đc 1080p Premium và có thêm filter deband để xoá banding.
![mpv-05](mpv-05.webp)

Và còn rất nhiều tính năng hữu ích khác như cut video, crop black bar...

## Chọn GPU sử dụng để chạy mpv. (Không bắt buộc)

Bước này sẽ hưu ích đối với máy sử dụng 2 GPU giúp lựa chọn GPU mà mpv sử dụng. Mặc định mpv sẽ sử dụng iGPU.

1. Mở Setting.
2. Truy cập **System** > **Display** > **Graphics settings**
3. Tại mục **Graphic performance preference** chọn **Browse**
4. Chọn **mpv.exe** tại folder đã cài đặt mpv.
5. Chọn **Profile** tương ứng với GPU muốn sử dụng.

<div style="text-align: center">
  <video controls>
    <source src="mpv-07.mp4" type="video/mp4" />
  </video>
</div>