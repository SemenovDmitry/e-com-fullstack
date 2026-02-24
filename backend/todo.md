# E-Commerce Service - Frontend Pages

## 📱 Public Pages (No Authentication Required)

### 1. **Home Page** - Welcome, promotions, featured products, best sellers
**Required API Methods:**
- `GET /products?featured=true&limit=10` - Get featured products
- `GET /categories` - Get product categories (optional)
- `GET /promotions` - Get active promotions/banners

### 2. **Product Catalog** - Product list with filtering, search, sorting, pagination
**Required API Methods:**
- `GET /products?page=1&limit=20` - Get paginated products
- `GET /products?search=keyword` - Search products by name/description
- `GET /products?category=id` - Filter by category
- `GET /products?minPrice=100&maxPrice=1000` - Filter by price range
- `GET /products?sort=name|price|rating` - Sort products
- `GET /categories` - Get all categories for filters

### 3. **Product Details Page** - Full product info, images/gallery, reviews, recommendations, related products
**Required API Methods:**
- `GET /products/:id` - Get product details
- `GET /products/:id/reviews` - Get product reviews
- `GET /products/:id/related` - Get related products
- `POST /reviews` - Submit product review (if authenticated)
- `GET /products/:id/images` - Get product images/gallery

### 4. **Shopping Cart** - Items list, quantity adjustment, total cost, proceed to checkout
**Required API Methods:**
- `GET /cart` - Get cart items (from localStorage or server)
- `POST /cart` - Add item to cart
- `PATCH /cart/:productId` - Update item quantity
- `DELETE /cart/:productId` - Remove item from cart
- `DELETE /cart` - Clear cart
- `GET /cart/total` - Calculate cart total with tax/shipping

### 5. **Checkout** - Delivery address, shipping method, payment method, order confirmation
**Required API Methods:**
- `GET /shipping-methods` - Get available shipping options
- `GET /payment-methods` - Get available payment options
- `POST /orders` - Create order (requires auth)
- `POST /orders/:id/confirm` - Confirm order and process payment

### 6. **Login/Registration** - User authentication (magic link or email/password)
**Required API Methods:**
- `POST /auth/send-link` - Send magic link to email
- `GET /auth/verify?token=xyz` - Verify magic link and create session


## 🔐 Private Pages (Authentication Required)

### 7. **User Profile** - Personal data, avatar, edit information, linked addresses
**Required API Methods:**
- `GET /me` - Get current user profile (requires auth)
- `PATCH /me` - Update user profile (name, phone, avatar)
- `GET /me/addresses` - Get saved addresses
- `POST /me/addresses` - Add new address

### 8. **My Orders** - Order history, order status, tracking information, order details
**Required API Methods:**
- `GET /orders` - Get user's orders list (requires auth)
- `GET /orders/:id` - Get order details
- `GET /orders/:id/tracking` - Get order tracking info
- `GET /orders/:id/invoice` - Download order invoice (PDF)
- `POST /orders/:id/cancel` - Cancel order (if allowed)

### 9. **Purchase History** - Previous orders, reorder functionality, order statistics
**Required API Methods:**
- `GET /orders?page=1&limit=10` - Get paginated order history
- `GET /orders/statistics` - Get user purchase statistics
- `POST /orders/:id/reorder` - Reorder items from previous order
- `GET /orders?dateFrom=2024-01-01&dateTo=2024-12-31` - Filter orders by date

### 10. **Wishlist/Favorites** - Saved products, share wishlist, add to cart from wishlist
**Required API Methods:**
- `GET /wishlists` - Get user's wishlist
- `POST /wishlists` - Create new wishlist
- `POST /wishlists/:id/items` - Add product to wishlist
- `DELETE /wishlists/:id/items/:productId` - Remove from wishlist
- `DELETE /wishlists/:id` - Delete wishlist
- `GET /wishlists/:id/share` - Get shareable wishlist link
- `POST /wishlists/:id/items/add-to-cart` - Add all items to cart

### 11. **Account Settings** - Password change, email notifications, privacy settings, account deletion
**Required API Methods:**
- `PATCH /me/notifications` - Update notification preferences
- `POST /me/delete` - Request account deletion

## 🛠️ Admin Pages (Administrator Only)

### 12. **Product Management** - Create/Edit/Delete products, bulk upload, inventory management
**Required API Methods:**
- `GET /admin/products` - Get all products (with pagination/filters)
- `POST /admin/products` - Create new product
- `PATCH /admin/products/:id` - Update product
- `DELETE /admin/products/:id` - Delete product
- `PATCH /admin/products/:id/inventory` - Update stock/inventory
- `POST /admin/products/bulk-upload` - Bulk upload products (CSV/Excel)
- `GET /admin/categories` - Get product categories
- `POST /admin/categories` - Create category

### 13. **Order Management** - View all orders, update status, generate shipping labels, handle returns
**Required API Methods:**
- `GET /admin/orders` - Get all orders with filters
- `GET /admin/orders/:id` - Get order details
- `PATCH /admin/orders/:id/status` - Update order status
- `POST /admin/orders/:id/ship` - Mark as shipped
- `GET /admin/orders/:id/shipping-label` - Generate shipping label
- `POST /admin/orders/:id/refund` - Process refund
- `GET /admin/orders/:id/return` - Handle return request

### 14. **User Management** - View users, block/unblock accounts, view customer details
**Required API Methods:**
- `GET /admin/users` - Get all users (with pagination/filters)
- `GET /admin/users/:id` - Get user details and order history
- `PATCH /admin/users/:id/status` - Block/unblock user
- `PATCH /admin/users/:id/role` - Change user role
- `DELETE /admin/users/:id` - Delete user account
- `GET /admin/users/:id/orders` - Get user's orders

### 15. **Analytics/Dashboard** - Sales metrics, popular products, revenue, customer analytics
**Required API Methods:**
- `GET /admin/analytics/dashboard` - Get dashboard metrics (revenue, orders, users)
- `GET /admin/analytics/sales?period=month|year` - Get sales data by period
- `GET /admin/analytics/products/top` - Get top selling products
- `GET /admin/analytics/customers/new` - Get new customer acquisition
- `GET /admin/analytics/revenue` - Get revenue metrics
- `GET /admin/analytics/orders/status` - Get order status distribution
- `GET /admin/reports/export` - Export reports to PDF/Excel

## 📄 Additional Pages

### 16. **About Us** - Company information, mission, team
**Required API Methods:**
- `GET /pages/about` - Get about us page content (CMS)

### 17. **Contact Us** - Contact form, company details, social media links
**Required API Methods:**
- `POST /contact` - Submit contact form message
- `GET /pages/contact` - Get contact information

### 18. **FAQ** - Frequently asked questions and answers
**Required API Methods:**
- `GET /faq` - Get FAQs list
- `GET /faq/:category` - Get FAQs by category

### 19. **Terms & Privacy** - Terms of service, privacy policy, return policy
**Required API Methods:**
- `GET /pages/terms` - Get terms of service
- `GET /pages/privacy` - Get privacy policy
- `GET /pages/returns` - Get return policy

### 20. **404 Error Page** - Custom error page for not found routes
**Required API Methods:** None

### 21. **500 Error Page** - Server error page
**Required API Methods:** None

## 🎯 Phase 1 Priority (MVP)
- Home Page
- Product Catalog
- Product Details
- Shopping Cart
- Checkout (basic)
- Login/Registration
- User Profile (basic)
- My Orders

## 📊 Summary of Required Endpoints

**Authentication:** 5 endpoints
**Products:** 8 endpoints
**Cart:** 6 endpoints
**Orders:** 14 endpoints
**User:** 12 endpoints
**Admin:** 20+ endpoints
**CMS/Static:** 5 endpoints

**Total: ~70+ API endpoints**
