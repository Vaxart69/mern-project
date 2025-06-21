
// Import Auth Controllers
import { login, signup } from './controllers/authController.js'
import { createProduct } from './controllers/productController.js'
import { deleteProduct } from './controllers/productController.js'
function router(app) {
    // app.use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Credentials', 'true');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH');
    //     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //     next();
    // })

    // Authentication endpoints
    app.post('/auth/signup', signup);
    app.post('/auth/login', login);

    app.post('/create-product', createProduct);
    app.delete('/delete-product/:productId', deleteProduct);

    
}

export default router;


