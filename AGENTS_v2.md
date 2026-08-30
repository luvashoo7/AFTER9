AFTER9/AGENTS.md# Build a Production-Ready AFTER 9 Backend API for Web and Mobile Apps

You are a senior Node.js backend architect and engineer.

Build a complete, scalable, production-ready backend API for a night-commerce platform called **AFTER 9**.

The backend must be **platform-independent**.

The same backend API will be consumed by:

1. Customer Website
2. Customer Mobile App
3. Delivery Partner Mobile App
4. Admin Dashboard
5. Future third-party integrations

Do not create website-specific backend logic.

All APIs must be designed as reusable REST APIs that work consistently across:

```text
Web
Android
iOS
React Native
Admin Dashboard
```

---

# 1. TECHNOLOGY STACK

Use:

```text
Node.js
JavaScript
Express.js
PostgreSQL
Prisma ORM
Redis
BullMQ
Socket.IO
JWT Authentication
Docker
Docker Compose
```

Important:

* Use JavaScript only.
* Do NOT use TypeScript.
* Use modern ES Modules.
* Use async/await.
* Use REST APIs.
* Use JSON request and response bodies.

Example:

```js
import express from "express";
```

---

# 2. CLIENT APPLICATION ARCHITECTURE

The system architecture should look like:

```text
                    ┌─────────────────────┐
                    │   Customer Website  │
                    │      Next.js        │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               │
┌──────────────────┐           │
│ Customer Mobile  │───────────┤
│ React Native     │           │
└──────────────────┘           ▼
                       ┌───────────────┐
                       │   AFTER 9 API │
                       │ Node + Express│
                       └───────┬───────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
        PostgreSQL           Redis           Socket.IO
             │                 │                 │
             ▼                 ▼                 ▼
          Prisma            BullMQ        Live Updates
```

The delivery partner application should also connect to the same backend:

```text
Delivery Partner App
        │
        ├── Assigned Orders
        ├── Accept Delivery
        ├── Update Location
        ├── Update Status
        ├── Mark Arrived
        └── Start Open-Box Inspection
```

---

# 3. PLATFORM-INDEPENDENT API DESIGN

Every API must return reusable data.

Example:

```http
GET /api/v1/products
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Lays Small Pack",
      "description": "Small snack pack",
      "price": 10,
      "mrp": 10,
      "imageUrl": "https://cdn.example.com/products/lays.jpg",
      "available": true
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

The same response must work for:

```text
Website
Customer Android App
Customer iOS App
React Native App
```

Do not return HTML from backend APIs.

Do not include frontend-specific UI logic in the backend.

---

# 4. API VERSIONING

All APIs must use:

```text
/api/v1
```

Examples:

```text
/api/v1/auth
/api/v1/users
/api/v1/addresses
/api/v1/products
/api/v1/categories
/api/v1/cart
/api/v1/orders
/api/v1/serviceability
/api/v1/delivery
/api/v1/admin
```

Design the API so future versions can exist:

```text
/api/v2/...
```

without breaking existing mobile apps.

Backward compatibility should be considered.

---

# 5. USER ROLES

Implement RBAC.

Roles:

```text
CUSTOMER
DELIVERY_PARTNER
FULFILLMENT_OPERATOR
ADMIN
SUPER_ADMIN
```

The backend must return only the data and permissions appropriate for the authenticated role.

Example:

```text
Customer
    ↓
Customer APIs

Delivery Partner
    ↓
Delivery APIs

Admin
    ↓
Admin APIs
```

Never rely on the mobile app or frontend to enforce permissions.

All authorization must happen on the backend.

---

# 6. AUTHENTICATION FOR WEB AND MOBILE

Implement phone OTP authentication.

APIs:

```http
POST /api/v1/auth/request-otp

POST /api/v1/auth/verify-otp

POST /api/v1/auth/refresh-token

POST /api/v1/auth/logout
```

Request OTP:

```json
{
  "phone": "+919876543210"
}
```

Verify OTP:

```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "phone": "+919876543210",
      "role": "CUSTOMER"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

The authentication system must work with:

```text
Website
React Native
Android
iOS
```

Use:

* JWT access tokens
* Refresh tokens
* Secure token expiration
* OTP rate limiting
* Redis OTP storage

For mobile applications, document how tokens should be sent:

```http
Authorization: Bearer ACCESS_TOKEN
```

Do not rely on browser cookies as the only authentication mechanism.

---

# 7. CUSTOMER MOBILE APP APIs

The customer app should be able to perform the complete user journey.

## Authentication

```text
Request OTP
Verify OTP
Logout
Refresh Token
```

## Profile

```http
GET   /api/v1/users/me
PATCH /api/v1/users/me
```

## Addresses

```http
GET    /api/v1/addresses
POST   /api/v1/addresses
PATCH  /api/v1/addresses/:id
DELETE /api/v1/addresses/:id
```

## Serviceability

The mobile app sends location coordinates:

```http
POST /api/v1/serviceability/check
```

Request:

```json
{
  "latitude": 28.4744,
  "longitude": 77.5040
}
```

Response:

```json
{
  "success": true,
  "data": {
    "serviceable": true,
    "currentlyOpen": true,
    "serviceZone": {
      "id": "uuid",
      "name": "Greater Noida Zone 1"
    },
    "operatingHours": {
      "start": "21:00",
      "end": "06:00"
    }
  }
}
```

---

# 8. PRODUCT AND DISCOVERY APIs

Customer website and mobile app should use the same APIs.

```http
GET /api/v1/categories

GET /api/v1/products

GET /api/v1/products/:id

GET /api/v1/products/search?q=chips

GET /api/v1/products?category=midnight-cravings

GET /api/v1/products?serviceZoneId=uuid
```

Support:

* Pagination
* Search
* Filtering
* Sorting
* Category filtering
* Product availability

Do not send unavailable products unless specifically requested.

---

# 9. CART APIs

Customer apps use:

```http
GET /api/v1/cart

POST /api/v1/cart/items

PATCH /api/v1/cart/items/:itemId

DELETE /api/v1/cart/items/:itemId

DELETE /api/v1/cart
```

Example:

```json
{
  "productVariantId": "uuid",
  "quantity": 2
}
```

The backend must calculate:

```text
Subtotal
Discount
Delivery Fee
Tax
Final Amount
```

Never trust prices received from mobile or web applications.

---

# 10. CHECKOUT AND ORDER CREATION

Create:

```http
POST /api/v1/orders
```

Request:

```json
{
  "addressId": "uuid",
  "paymentMethod": "ONLINE",
  "couponCode": "AFTER9"
}
```

The backend must:

1. Validate the user.
2. Validate the address.
3. Check serviceability.
4. Check operating hours.
5. Check inventory.
6. Reserve inventory.
7. Calculate prices.
8. Apply coupon.
9. Create the order.
10. Create payment request.
11. Return order details.

Critical:

Use idempotency.

Mobile applications may retry requests due to poor network connectivity.

Support:

```http
Idempotency-Key: unique-uuid
```

A repeated request must not create duplicate orders.

---

# 11. MOBILE PAYMENT SUPPORT

The backend must support payment integration for mobile apps.

Initially support:

```text
Razorpay
Cash on Delivery
Mock Payment
```

Create:

```text
POST /api/v1/payments/create
POST /api/v1/payments/verify
POST /api/v1/webhooks/razorpay
```

Return payment data that can be directly consumed by:

```text
React Native Razorpay SDK
Website Razorpay Checkout
```

Example:

```json
{
  "success": true,
  "data": {
    "paymentOrderId": "order_xyz",
    "amount": 4500,
    "currency": "INR",
    "key": "razorpay_key"
  }
}
```

Amount should be returned in the format required by the payment provider.

Never trust payment success information sent directly from the mobile app without backend verification.

---

# 12. DELIVERY PARTNER MOBILE APP APIs

Create a dedicated set of APIs.

```http
GET /api/v1/delivery/orders

GET /api/v1/delivery/orders/:orderId

POST /api/v1/delivery/orders/:orderId/accept

POST /api/v1/delivery/orders/:orderId/reject

POST /api/v1/delivery/orders/:orderId/status

POST /api/v1/delivery/location
```

Location update request:

```json
{
  "latitude": 28.4744,
  "longitude": 77.5040
}
```

The delivery partner app must only access assigned orders.

---

# 13. REAL-TIME DELIVERY TRACKING

Use:

```text
Socket.IO
```

The customer mobile app and website should receive live updates.

Events:

```text
ORDER_CONFIRMED
ORDER_PACKED
RIDER_ASSIGNED
RIDER_NEARBY
DELIVERY_ARRIVED
INSPECTION_STARTED
ITEM_ACCEPTED
ITEM_REJECTED
ORDER_DELIVERED
```

Example:

```json
{
  "type": "RIDER_LOCATION_UPDATED",
  "orderId": "uuid",
  "latitude": 28.4744,
  "longitude": 77.5040
}
```

The backend must authenticate Socket.IO connections using JWT.

Use rooms:

```text
order:{orderId}
delivery-partner:{partnerId}
```

Do not allow users to subscribe to orders they do not own.

---

# 14. OPEN-BOX DELIVERY FOR MOBILE

This is a core feature.

The customer mobile app should receive:

```text
DELIVERY ARRIVED
```

Then show:

```text
OPEN PACKAGE
```

The customer can inspect each item.

Customer APIs:

```http
GET /api/v1/orders/:orderId/inspection

POST /api/v1/orders/:orderId/inspection/items/:itemId/accept

POST /api/v1/orders/:orderId/inspection/items/:itemId/reject

POST /api/v1/orders/:orderId/inspection/complete
```

Reject request:

```json
{
  "reason": "DAMAGED",
  "notes": "Package was damaged"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "orderItemId": "uuid",
    "status": "REJECTED",
    "refundAmount": 40
  }
}
```

Support:

```text
Full Acceptance
Partial Acceptance
Full Rejection
Instant Return
Partial Refund
Full Refund
COD Adjustment
```

The same APIs must work on both web and mobile.

---

# 15. PUSH NOTIFICATION ARCHITECTURE

Design notification APIs to support mobile push notifications.

The mobile app should register a device:

```http
POST /api/v1/devices
```

Request:

```json
{
  "platform": "ANDROID",
  "pushToken": "device_push_token"
}
```

Support:

```text
ANDROID
IOS
WEB
```

Create Device model:

```text
id
userId
platform
pushToken
isActive
createdAt
updatedAt
```

Notifications should support:

```text
Order confirmed
Order packed
Rider assigned
Rider nearby
Delivery arrived
Inspection started
Refund initiated
Refund completed
```

Use a provider abstraction so Firebase Cloud Messaging or Expo Notifications can be integrated later.

---

# 16. FILE AND IMAGE UPLOADS

Design APIs for mobile and web image uploads.

Use an abstraction for:

```text
AWS S3
Cloudflare R2
Cloudinary
Local development storage
```

Example:

```http
POST /api/v1/uploads
```

Support:

* Product images
* User profile images
* Delivery proof if required
* Inspection/return images if required

Validate:

```text
File type
File size
Authorization
```

Do not store large files directly in PostgreSQL.

---

# 17. API RESPONSE FORMAT

Use the same consistent response structure everywhere.

Success:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "ORDER_INVALID_STATE",
    "message": "Order cannot be inspected in its current state."
  }
}
```

This format must be easy to consume from:

```text
React Native
Next.js
Admin Dashboard
```

---

# 18. NETWORK AND MOBILE EDGE CASES

Design specifically for unreliable mobile networks.

Handle:

```text
Request retries
Duplicate requests
Lost internet
Slow connections
Socket reconnection
Duplicate payment verification
Duplicate inspection actions
Location update retries
```

Critical operations must be idempotent.

Especially:

```text
Create Order
Payment Verification
Refund
Inspection Completion
Delivery Completion
```

Use:

```http
Idempotency-Key
```

where appropriate.

---

# 19. BACKEND ARCHITECTURE

Use:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Prisma
 ↓
PostgreSQL
```

Project structure:

```text
after9-backend/

├── src/
│
├── config/
├── middleware/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── devices/
│   ├── addresses/
│   ├── service-zones/
│   ├── categories/
│   ├── products/
│   ├── inventory/
│   ├── cart/
│   ├── orders/
│   ├── payments/
│   ├── delivery/
│   ├── inspection/
│   ├── returns/
│   ├── notifications/
│   ├── uploads/
│   └── admin/
│
├── jobs/
├── sockets/
├── events/
├── utils/
├── constants/
│
├── app.js
└── server.js

prisma/
├── schema.prisma
└── seed.js

tests/

Dockerfile
docker-compose.yml
package.json
.env.example
README.md
```

---

# 20. SECURITY

Implement:

```text
JWT
Refresh Tokens
RBAC
Rate Limiting
Helmet
CORS
Input Validation
Webhook Verification
OTP Protection
Secure Environment Variables
```

All role and ownership checks must happen on the backend.

Never trust:

```text
Role sent from mobile app
Price sent from frontend
Order status sent from frontend
Payment success sent from frontend
```

---

# 21. DEVELOPMENT PRIORITY

Build the backend in this order:

## Phase 1

```text
Express
PostgreSQL
Prisma
Redis
Docker
Configuration
Error handling
Logging
```

## Phase 2

```text
OTP Authentication
JWT
Users
Roles
Addresses
```

## Phase 3

```text
Cities
Service zones
Operating hours
Serviceability
```

## Phase 4

```text
Categories
Products
Variants
Inventory
```

## Phase 5

```text
Cart
Bundles
Coupons
Night Drops
```

## Phase 6

```text
Orders
Checkout
Payments
Inventory reservation
Order state machine
```

## Phase 7

```text
Delivery partner APIs
Assignment
Location updates
Socket.IO tracking
```

## Phase 8

Implement the complete:

```text
OPEN
↓
CHECK
↓
ACCEPT / REJECT
↓
INSTANT RETURN
```

workflow.

## Phase 9

```text
Push notifications
BullMQ
Admin APIs
Analytics
Testing
Monitoring
```

---

# FINAL INSTRUCTION

Build this as a **platform-independent modular monolith**.

The backend must serve:

```text
Customer Website
+
Customer Mobile App
+
Delivery Partner Mobile App
+
Admin Dashboard
```

The API must not contain UI-specific logic.

All business rules, authorization, pricing, inventory validation, order transitions, payment verification, and open-box inspection logic must live securely in the backend.

Start by generating:

1. Complete project structure
2. `package.json`
3. Docker setup
4. PostgreSQL and Prisma configuration
5. Complete database schema
6. Authentication module

Then continue implementing the modules phase by phase.

Generate actual working code, not only pseudocode or placeholders.

The final backend should be MVP-ready for the AFTER 9 launch in Greater Noida and capable of supporting future web, Android, iOS, React Native, and admin applications from the same API.
