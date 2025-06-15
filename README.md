# 🏡 StayNest – Premium Homestay Booking Platform

StayNest is a full-stack, responsive web application designed to simplify the discovery and booking of homestays. Built with a focus on scalability and user experience, it supports role-based access for guests and property managers, secure JWT-based authentication, real-time availability checks, and robust CRUD operations for listings and bookings. Whether you're implementing features for hosts or enhancing the guest booking flow, StayNest offers a modular, API-driven architecture that makes extension and maintenance straightforward.

---

## Features

- **Smart Property Search**  
  Filter stays by location, price, amenities, eco-friendly tags, and more.

- **Real-Time Availability**  
  Live booking availability with instant confirmation.

- **Secure Payments & Verified Reviews**  
  Trustworthy bookings with secure payment gateways and real guest reviews.

- **Role-Based Access**  
  Separate experiences for Guests and Hosts.

- **Booking Notifications**  
  Email confirmations for guests and alerts for property managers.

- **Dynamic Pricing & Discounts**  
  Automatic discounts for long stays (weekly/monthly).

- **Host Dashboard**  
  Manage your listings, view bookings, and track property performance.

---

## Tech Stack

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

## Folder Structure

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

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/sourabhaprasad/staynest.git
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

## Sample User Credentials

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

## API Endpoints 

* `POST /api/auth/signup` – Register user
* `POST /api/auth/signin` – Login and get token
* `POST /api/properties` – Create property *(Manager only)*
* `GET /api/properties` – List all properties
* `GET /api/properties/:id` – Get property by ID
* `GET /api/bookings/host` – Host’s received bookings
* `POST /api/bookings` – Book property *(Guest only)*
* `GET /api/bookings/guest` – Guest's bookings

---

## Common Extension Patterns

Planning to add more features or scale the project? Follow these proven patterns:

### 1. **Modular API Layers**

Organize API logic into:

* `routes/` – defines endpoints
* `controllers/` – handles logic
* `services/` – reusable business logic
* `utils/` – helpers (e.g. price calculation, email)

> Example: Want to add **wishlist functionality**?

* Create: `routes/wishlist.js`, `controllers/wishlistController.js`, `models/Wishlist.js`

---

### 2. **Role-Based Access Control**

Use middleware to restrict routes:

```js
// checkRole.js
export const checkRole = (allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
```

---

### 3. **Client API Layer (Frontend)**

Centralize all API calls:

```
lib/api/
├── endpoints/   # e.g., bookings.js, auth.js
├── modules/     # exports grouped functionality
├── client.js    # fetch wrapper
└── index.js     # re-exports all modules
```

> To add new endpoints:

* Define in `endpoints/wishlist.js`
* Use in components via `import { createWishlist } from "@lib/api"`

---

### 4. **Component Reusability**

Create shared components like:

* `<Button />`, `<Card />`, `<PropertyCard />`
* `<BookingSection />`, `<DateRangePicker />`

> DRY (Don’t Repeat Yourself) design helps in scaling and maintaining UI logic.

---

## Future Enhancements

- Admin dashboard
- Payment gateway integration (e.g., Stripe)
- Multi-language support
- Host earnings analytics
- Wishlists and Reviews
