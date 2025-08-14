1. Tìm sẵn đến bộ đó trên [AniList](https://anilist.co/), để lấy id, ví dụ: `https://anilist.co/anime/1/Cowboy-Bebop/` thì id là `1`

2. Tạo `project` mới trong `src\content\projects`, tên nào cũng được, khuyến nghị romaji, không viết hoa, có dấu `-` ngăn cách.

3. Điền thông tin cơ bản theo mẫu ở file `GSGA-template-pages.md`, lưu ý có 4 `status` là `Hoàn thành`, `Đang làm`, `Dự kiến`, `Tạm ngưng`.

4. Chạy lệnh `npm run fetch-anilist` để lấy thông tin cho `project`, đồng thời có thể preview ở local.

5. Viết gì thì viết, sử dụng [Markdown](https://www.markdownguide.org/basic-syntax/). (đã thử MDX các kiểu, thêm vào vài cái nhưng thôi, cứ Markdown đi)

