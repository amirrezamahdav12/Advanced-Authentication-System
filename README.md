# 🔐 Advanced Authentication System (Express + SQL Server)

یک سیستم احراز هویت پیشرفته ساخته شده با **Express.js**, **SQL Server**, **JWT**, و امنیت تقویت‌شده با **Helmet** و **CORS**.

این پروژه برای نمایش مهارت‌های بک‌اند طراحی شده و شامل معماری ماژولار، احراز هویت کامل، مدیریت Refresh Token، امنیت پایه، و ساختار حرفه‌ای مناسب نمونه‌کار است.

---

## 🚀 ویژگی‌ها

* ثبت‌نام با Hash امن رمز عبور (bcrypt)
* ورود با JWT Access Token + Refresh Token
* **Refresh Token Rotation** (توکن قدیمی باطل و توکن جدید صادر می‌شود)
* ذخیره Refresh Token در SQL Server
* احراز هویت توکن (JWT Middleware)
* محدودسازی سطح دسترسی (Role Middleware)
* امنیت با Helmet و CORS
* معماری تمیز و قابل توسعه
* آماده برای Docker و Docker Compose

---

## 📁 ساختار پوشه‌ها

```
auth-express-mssql/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── package.json
├── server.js
├── sql/
│   └── init.sql
└── src/
    ├── app.js
    ├── config/db.js
    ├── routes/auth.routes.js
    ├── controllers/auth.controller.js
    ├── services/auth.service.js
    ├── middleware/
    │   ├── auth.middleware.js
    │   └── role.middleware.js
    └── utils/
        ├── jwt.js
        └── hash.js
```

---

## 🛠 نصب و اجرا

### 1. کلون کردن پروژه

```bash
git clone https://github.com/your-username/auth-express-mssql.git
cd auth-express-mssql
```

### 2. نصب پکیج‌ها

```bash
npm install
```

### 3. ساخت فایل `.env`

فایل `.env.example` را کپی کنید:

```bash
cp .env.example .env
```

### 4. اجرای SQL Server با Docker

```bash
docker-compose up -d
```

### 5. اجرای سرور

```bash
npm start
```

سرور روی پورت 3000 بالا می‌آید.

---

## 🗄 دستورات SQL لازم

فایل `sql/init.sql` به صورت خودکار دیتابیس و جداول لازم را می‌سازد.

```sql
CREATE DATABASE AuthDB;
GO
```

(در ادامه ساخت جدول Users و RefreshTokens قرار دارد.)

---

## 🔑 API Endpoints

### ➤ Register

`POST /auth/register`

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

### ➤ Login

`POST /auth/login`

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

### ➤ Refresh Token

`POST /auth/refresh`

```json
{
  "refreshToken": "..."
}
```

---

## 🔐 Middleware ها

### Auth Middleware

* بررسی اعتبار Access Token
* ارسال خطا در صورت عدم احراز هویت

### Role Middleware

* محدود کردن دسترسی براساس نقش کاربر

مثال:

```js
router.get("/admin", role("admin"), controller.adminPanel);
```

---

## 🧪 تست سریع API با cURL

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test@test.com", "password":"123"}'
```

---

## 📦 تکنولوژی‌های استفاده شده

* **Express.js**
* **SQL Server (mssql driver)**
* **JWT (jsonwebtoken)**
* **bcrypt**
* **helmet**
* **cors**
* **Docker** و **docker-compose**

---

## 📄 لایسنس

MIT

---

## 👤 سازنده

ساخته شده توسط **امیررضا** — برای نمایش مهارت‌های بک‌اند در نمونه‌کار.
