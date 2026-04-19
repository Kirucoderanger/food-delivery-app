# The food delivery system
# 🍔 Food Delivery App — Full Stack (React + Node + UploadThing)

<p align="center">
  <b>Production-ready food delivery platform with smart image handling & cloud storage cleanup</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Storage-UploadThing-orange" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel" />
  <img src="https://img.shields.io/badge/Backend%20Host-Render-purple" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey" />
</p>

---

## 🌐 Live Demo

* 🔗 Frontend: *Coming Soon*
* 🔗 Backend API: *Coming Soon*

---

## 📸 Screenshots

> Add your screenshots here after deployment

```id="scr1"
![Home Page](./screenshots/home.png)
```

```id="scr2"
![Add Restaurant Modal](./screenshots/modal.png)
```

```id="scr3"
![Image Upload Preview](./screenshots/upload.png)
```

---

## ✨ Features

### 👨‍💼 Admin Panel

* Create restaurants
* Edit restaurant details
* Upload images (camera + device)
* Replace images (auto delete old images)
* Delete restaurants (auto delete images)

### 👤 User Experience

* Browse restaurants
* View menus
* Smooth navigation

---

## 🧠 Highlight Feature: Smart Image Lifecycle

This app implements **enterprise-level image management**:

### 🔁 Image Replacement

```id="flow1"
Upload new image → Replace DB URL → Delete old image automatically
```

### 🗑️ Deletion Cleanup

```id="flow2"
Delete restaurant → Delete associated image from UploadThing
```

✔ No orphan files
✔ Optimized storage
✔ Production-grade behavior

---

## 🏗️ Architecture

```id="arch"
[ React (Vercel) ]
        ↓
[ Node.js API (Render) ]
        ↓
[ UploadThing Storage ]
        ↓
[ MongoDB Database ]
```

---

## 📁 Project Structure

```id="struct"
client/
 ├── components/
 │    └── ImageUploader.jsx
 ├── pages/
 │    └── Home.jsx
 ├── utils/
 │    └── deleteUploadthingImage.js

server/
 ├── controllers/
 │    └── upload.controller.js
 ├── routes/
 │    └── upload.routes.js
 ├── uploadthing.js
 └── server.js
```

---

## ⚙️ Environment Setup

### 🔹 Backend (.env)

```id="env1"
UPLOADTHING_SECRET=your_secret_key
UPLOADTHING_APP_ID=your_app_id
```

---

### 🔹 Frontend (.env)

```id="env2"
VITE_BACKEND_URL=https://your-render-api.onrender.com
```

---

## 📦 Installation Guide

### 1️⃣ Clone Repository

```bash id="cmd1"
git clone https://github.com/yourusername/food-delivery-app.git
cd food-delivery-app
```

---

### 2️⃣ Setup Backend

```bash id="cmd2"
cd server
npm install
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash id="cmd3"
cd client
npm install
npm run dev
```

---

## 🔌 API Endpoints

### 📤 Upload Image

```id="api1"
POST /api/uploadthing?slug=imageUploader
```

---

### ❌ Delete Image

```id="api2"
POST /api/upload/delete-image
```

**Body:**

```json id="api3"
{
  "imageUrl": "https://utfs.io/f/abc123.jpg"
}
```

---

## 🧩 Core Components

### 📦 ImageUploader.jsx

* Handles image selection
* Uploads to UploadThing
* Shows preview
* Returns image URL

---

### 🏠 Home.jsx

* Restaurant CRUD
* Modal form
* Integrates image uploader

---

### 🧹 deleteUploadthingImage.js

* Sends request to backend
* Deletes image from storage

---

## 🧠 How Image Deletion Works

UploadThing uses **file keys**, not URLs.

Example:

```id="key1"
https://utfs.io/f/abc123.jpg
```

Extracted key:

```id="key2"
abc123.jpg
```

Used for deletion:

```js id="key3"
utapi.deleteFiles(fileKey)
```

---

## 🛡️ Security & Best Practices

* Environment-based config
* Clean component separation
* Safe image replacement logic
* Admin-only actions
* No direct file handling on client

---

## 🧪 Testing Checklist

### ✅ Add Restaurant

* Upload image
* Save → appears in grid

### ✅ Edit Restaurant

* Replace image
* Old image should be deleted

### ✅ Delete Restaurant

* Restaurant removed
* Image removed from UploadThing

---

## 🚀 Deployment

### Frontend

* Deploy using Vercel

### Backend

* Deploy using Render

---

## 📈 Future Enhancements

* 📊 Upload progress bar
* 🖱️ Drag & drop uploader
* 🧠 AI image optimization
* ⚡ Lazy loading images
* 🔄 Background job queue

---

## 👨‍💻 Author

**Kirubel Lemu**

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🛠️ Contribute

---

## 📄 License

MIT License — free to use and modify.

