## 甜點店購物車專案介紹
專案名稱: 甜點店購物車

專案周期: 2024年3月 ~ 2024年5月

專案簡介:
此專案為一個全面的購物車系統，涵蓋了一般商品、客製商品以及課程的購買功能。旨在提升用戶在線購物的便利性和體驗。

前端技術棧:

React 函式庫
Next.js 框架

後端技術棧:

Express 框架
Laravel 框架（請下載名為 machi_laravel 的資料夾替換掉 Express，啟動端口為 3005）

第三方支付集成:
LinePay

專案目的:

提高用戶體驗: 提供一個用戶友好的購物車介面，使用戶能夠輕鬆地瀏覽、選擇和購買商品和課程。

多樣化商品類型: 支持一般商品、客製商品和課程的購買，滿足不同用戶的需求。

簡化支付流程: 集成 LinePay 支付方式，簡化用戶的支付過程，提升支付的安全性和便利性。

靈活的技術架構: 前端採用 React 和 Next.js，後端採用 Express 和 Laravel，提供靈活且可擴展的技術架構，以應對未來的功能擴展和性能優化需求。

## 導入模組
在開始使用這個專案之前，你需要先安裝必要的依賴。請在 next 和 express 的資料夾路徑下各自執行以下命令：

先將 .env.template 改成 .env

在終端機輸入 npm i

資料庫建置
在本機的 MySQL 建立一個 machi_big_db 資料庫(非MYSQL請至.env修改預設資料庫)

匯入 Machi 資料夾中的 machi_big_db 檔案

新增權限帳號 admin，密碼 12345

## 開始使用
在前後端各自終端機輸入 npm run dev

