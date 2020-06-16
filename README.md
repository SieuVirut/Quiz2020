## About Quiz 20

## Cài đặt môi trường
Để chạy đc dự án cần cài đặt 1 số thư viện sau:
##### **1. [PHP7.4.x](https://www.php.net/archive/2020.php#2020-06-11-2)**
##### **2. [Composer](https://getcomposer.org/doc/00-intro.md)**
##### **3. [Nodejs ](https://nodejs.org/en/docs/)**
##### **4. [MySQL](https://www.mysql.com/)**

## Khởi chạy dự án
##### 1. Dowload source tại ``https://github.com/SieuVirut/Quiz2020.git``
##### 2. `cd Quiz2020` để vào thư mục dự án
##### 3. Trong terminal/command line, chạy `composer install ` để cài đặt các chương trình trong `composer.json`
##### 4. Chạy `npm install` để cài đặt thư viện trong `package.json` 
##### 5. Tạo thủ công tên cơ sở dữ liệu trong MySQL
##### 6. Kết nối Database, chỉnh sửa file `.evn` trong thư mục `Quiz2020`. Xem thêm [Config Laravel](https://laravel.com/docs/7.x/configuration).
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE= <tên database mới tạo >
        DB_USERNAME= <username>
        DB_PASSWORD= <password>
##### 7. Chạy `php artisan migrate` để tạo database. Xem thêm [php artisan](https://laravel.com/docs/7.x/artisan#introduction).
##### 8. Chạy `php artisan serve` để chạy serve và Frontend mặc định tại `localhost:8000/` .  
##### 9. Chạy `npm run` hoặc `npm run dev` để chạy Frontend.
