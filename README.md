## Các bước cần làm sau khi clone source code:
### 1. Cài đặt thư viện: npm i
### 2. Chạy project: npm run dev   

+ tag use client => Component của chúng ta sẽ không hoàn toàn render 100% ở phía client đâu mà nó sẽ nói cho nextjs biết phần nào mà client xử lý nó sẽ giữ nguyên, không đụng tới. Bất cứ khi nào chúng ta sử dụng các event ở phía client hay rằng là chúng ta sử dụng các thư viện ở phía client thì chúng ta phải sử dụng thêm tag use client

+ fetcher: Thực chất là cách chúng ta gọi api . Chúng ta có thể dùng fetch, axios hay là bất cứ thư viện gì thì nó đều gọi là fetcher thôi. 1 cái thư viện mà trả ra 1 cái promise thì nó sẽ gọi là 1 fetcher

+ Metadata chỉ hoạt động bên trong server component mà thôi (Nếu trong file có gọi 'use client' thì sẽ không bao giờ sử dụng được Metadata)


