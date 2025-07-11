import User from '../models/user.js';
import Product from '../models/product.js';


export const addToCart = async (req, res) => {
    try {

        // get the product id and the quantity (default to 1) from the request body
        const { productId, quantity = 1 } = req.body;
        const userId = req.user.id; // get the current user's ID

        // check first if the product exists 
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

       // if the product quantity is less than the requested quantity, return an error
        if (quantity > product.productQuantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        // find get the instance of user
        const user = await User.findById(userId);
       

        // search the user's cart array where the productId matches the productId from the request body
        const existingCartItem = user.cart.find(
            item => item.productId.toString() === productId
        );


        // if the product already exists in the cart, just update the quantity
        if (existingCartItem) {
            
            // create a new quantity with the updated (not yet savedd)
            const newQuantity = existingCartItem.quantity + quantity;
            
            // check first if the new quantity exceeds the available stock
            if (newQuantity > product.productQuantity) {
                return res.status(400).json({
                    success: false,
                    message: 'Total quantity exceeds available stock'
                });
            }

            // if there is an available stock, update the quantity in the cart
            existingCartItem.quantity = newQuantity;
        } else {

            // else if the product is not in the cart, add it to the cart instead with the quantity
         
            user.cart.push({
                productId: productId,
                quantity: quantity
            });
        }

        await user.save();
        // save the changes

        

        res.status(200).json({
            success: true,
            message: 'Item added to cart successfully',
        });

    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


export const getCart = async (req, res) => {
    try {

        // get the current userId
        const userId = req.user.id;

        // find the user and then populate the cart with the product details
        const user = await User.findById(userId).populate('cart.productId');
        

        res.status(200).json({
            success: true,
            cart: user.cart
        });

    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


export const updateCartItem = async (req, res) => {
    try {

        // get the productId and quantity from the request body
        const { productId, quantity } = req.body;
        const userId = req.user.id; //get the current users ID

        // just make sure that the input quantity is a positive integer
        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1'
            });
        }


        // get the instance of the product and check if it exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // check if the requested quantity exceeds the available stock
        if (quantity > product.productQuantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        // get the instance of the user
        const user = await User.findById(userId);
        
        // find the item in the user's cart that matches the productId
        const cartItem = user.cart.find(
            item => item.productId.toString() === productId
        );


        // if not found then return an error
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        // if found, update the quantity of the cart item
        cartItem.quantity = quantity;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Cart item updated successfully',
            cart: user.cart
        });

    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


export const removeFromCart = async (req, res) => {
    try {
        // get the productId from the req param as well as the user id
        const { productId } = req.params;
        const userId = req.user.id;

        const user = await User.findById(userId);
        
        // get the instance of user and gets the cart and only keeps the items that do not match the productID
        user.cart = user.cart.filter(
            item => item.productId.toString() !== productId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Item removed from cart successfully',
        });

    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


export const clearCart = async (req, res) => {
    try {
        // get the userid from the req
        const userId = req.user.id;

        // get the instance of user
        const user = await User.findById(userId);
       
        // clear the cart attribute and then save
        user.cart = [];
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Cart cleared successfully',
        });

    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        // get all the users from the database and exclude the password field
        const users = await User.find().select('-password');
        
        res.status(200).json({
            success: true,
            users: users // return the users so that the frontend can display them
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {

        // get the userId from the req
        const { userId } = req.params;
        
        // get instance of the user
        const user = await User.findById(userId);
      
        
        // if admin, cannot delete
        if (user.userType === 'admin') {
            return res.status(403).json({
                success: false,
                message: "Cannot delete admin accounts"
            });
        }
        
        // else delete the user account
        await User.findByIdAndDelete(userId);
        
        res.status(200).json({
            success: true,
            message: "User account deleted successfully"
        });
        
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: "Error deleting user account",
            error: error.message
        });
    }
};