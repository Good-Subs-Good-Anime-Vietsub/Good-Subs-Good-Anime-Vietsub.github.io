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

## Cài đặt config (Khuyến nghị)

Các bạn có thể xem hướng dẫn [tại đây](mpv-config.md).