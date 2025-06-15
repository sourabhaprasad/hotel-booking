# 🏡 StayNest – Premium Homestay Booking Platform

StayNest is a modern, responsive web application for discovering and booking homestays across the country. Whether you're a traveler seeking unique experiences or a host offering a cozy place, StayNest makes the process seamless, secure, and delightful.

---

## 🚀 Features

- 🔍 **Smart Property Search**  
  Filter stays by location, price, amenities, eco-friendly tags, and more.

- 📅 **Real-Time Availability**  
  Live booking availability with instant confirmation.

- 🔐 **Secure Payments & Verified Reviews**  
  Trustworthy bookings with secure payment gateways and real guest reviews.

- 🧑‍💼 **Role-Based Access**  
  Separate experiences for Guests and Hosts.

- 📧 **Booking Notifications**  
  Email confirmations for guests and alerts for property managers.

- 🏷️ **Dynamic Pricing & Discounts**  
  Automatic discounts for long stays (weekly/monthly).

- 📊 **Host Dashboard**  
  Manage your listings, view bookings, and track property performance.

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **React Hot Toast** for notifications

### Backend (API)

- **Node.js**, **Express**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Cloudinary** for image uploads
- **Nodemailer** for email notifications

---

## 📁 Folder Structure

```
/
├── frontend/
│   ├── app/             # Next.js pages and routes
│   ├── components/      # Reusable UI components (e.g., Hero, FeatureCard)
│   ├── lib/api/         # Centralized API handler and modules
│   ├── public/images/   # Static images
│   └── styles/          # Global styles
└── backend/
    ├── models/          # Mongoose schemas
    ├── routes/          # Express API routes
    ├── controllers/     # Business logic
    ├── middlewares/     # Auth, validation, etc.
    └── utils/           # Utility functions (email, price calculation)
```

---

## 🧑‍💻 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/staynest.git
cd staynest
```

### 2. Install Dependencies

**Frontend**

```bash
cd frontend
npm install
```

**Backend**

```bash
cd ../backend
npm install
```

### 3. Environment Variables

Create a `.env` file in both `frontend/` and `backend/` folders.

**Backend `.env`**

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

**Frontend `.env.local` (optional)**

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 4. Run the App

**Backend**

```bash
npm run dev
```

**Frontend**

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Sample User Credentials

**Guest**

```
Email: guest@example.com
Password: 123456
```

**Manager**

```
Email: manager@example.com
Password: 123456
```

---

## ✨ Future Enhancements

- Admin dashboard
- Payment gateway integration (e.g., Stripe)
- Multi-language support
- Host earnings analytics
- Progressive Web App (PWA) support
