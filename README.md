## Edu Manabo (ĐALN)

##### Thành viên nhóm:

-   Bùi Văn Công - 21011409
-   Nông Ngọc Huân - 21013192
-   Hồ Thị Hương - 21011200
-   Hà Xuân Tùng - 21011419

##### Dự án sử dụng ReactJS cho FE, dưới đây là một số hướng dẫn về dự án:

1. Cập nhật các gói và thư viện phụ thuộc `npm install` sẽ cập nhật các gói dựa trên file `package.json`.
2. Khởi chạy dự án. `npm start`.
3. Chi tiết một số thư mục quan trọng:

-   `components/`: Chứa các React component được chia thành từng file hoặc thư mục riêng nếu component phức tạp. Các component nên được chia nhỏ, có trách nhiệm rõ ràng.
-   `pages/`: Chứa các trang chính của ứng dụng (ví dụ như HomePage, LoginPage,...).
-   `services/`: Chứa các hàm tương tác với API, thường là các hàm gọi AJAX/FETCH.
-   `utils/`: Chứa các hàm hoặc module tiện ích chung như format dữ liệu, xử lý lỗi,...
-   `assets/`: Chứa hình ảnh, file âm thanh, font chữ,... mà bạn sử dụng trong ứng dụng.
    styles/: Để quản lý file CSS hoặc SCSS giúp việc quản lý giao diện dễ dàng hơn.
-   `hooks`: Thư mục lưu trữ các custom hooks.
-   `context`: Thư mục lưu trữ các file context(ngữ cảnh) của ứng dụng.
-   `styles`: Thư mục chứa các file style của ứng dụng, thông thường là nơi viết styles cho các component sử dụng một số thư viện như styless.

4. Dự án sử dụng sass, những thành viên khác có thể tùy ý sử dụng css thông thường hoặc sass.
5. Dự án sử dụng prettierrc để format code trở nên gọn gàng hơn chi tiết các thiết lập ở trong file `.prettierrc`
6. Để thuận tiện cho việc code trên VS code khuyên nên cài một số extension sau cho dự án(đương nhiên không có cũng không sao) `ES7+ React/Redux/React-Native snippets` `ESLint` `Simple React Snippets` `Prettier - Code formatter`
7. Để hỗ trợ giao tiếp làm việc hiệu quả với nhóm qua Git đề nghị nên tham khảo [Git Workflow](https://youtu.be/vQgcl8VouLU?si=SWPqUCwKNH5foCP1)
8. Trong dự án có cài một số link viết tắt như `~/` tương tự như `./src`
9. Tất cả những css nào được dùng chung cho tất cả các trang trong trang web đều được đưa vào trong file `./src/components/GlobalStyles/GlobalStyles.scss`
   Chúc mọi người làm việc nhóm thuận lợi, nếu còn bất kỳ thắc mắc gì có thể chia sẻ thẳng thắn trong nhóm chat rất hoan nghênh ý kiến đóng góp của mọi người.
