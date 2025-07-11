
import { login, signup } from './controllers/authController.js'
import { createProduct, deleteProduct, getProducts, getProductById, updateProduct } from './controllers/productController.js'
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart, getAllUsers, deleteUser } from './controllers/userController.js'
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from './controllers/orderController.js'
import auth from './middlware/auth.js'

function router(app) {
    
    app.use((req, res, next) => {

        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // allow access from the frontend
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE,PATCH'); // allowed methods
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept'); // allowed headers
        
        
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }
        
        next();
    });

    // Authentication endpoints
    app.post('/auth/signup', signup);
    app.post('/auth/login', login);

    // Product endpoints
    app.post('/create-product', createProduct);
    app.put('/products/:productId', updateProduct);
    app.delete('/delete-product/:productId', deleteProduct);
    app.get('/products', getProducts);
    app.get('/product/:productId', getProductById);

    // Cart endpoints (protected routes)
    app.post('/cart/add', auth('customer'), addToCart);
    app.get('/cart', auth('customer'), getCart);
    app.put('/cart/update', auth('customer'), updateCartItem);
    app.delete('/cart/remove/:productId', auth('customer'), removeFromCart);
    app.delete('/cart/clear', auth('customer'), clearCart);

    // Order endpoints
    app.post('/orders/checkout', auth('customer'), createOrder);
    app.get('/orders', auth('customer'), getUserOrders);
    app.get('/orders/all', auth('admin'), getAllOrders);
    app.put('/orders/:orderId/status', auth('admin'), updateOrderStatus);
    

    // User endpoints
    app.get('/users/all', auth('admin'), getAllUsers);
    app.delete('/users/:userId', auth('admin'), deleteUser);
}

export default router;


