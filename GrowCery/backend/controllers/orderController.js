import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("cart.productId");

    // check if the user has a cart
    if ( !user.cart || user.cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // initialize total amount to 0
    let totalAmount = 0;

    // initialize order items array as empty
    const orderItems = [];

    // iterate through the user's cart
    for (const cartItem of user.cart) {
      const product = cartItem.productId;

      // check if the product exists in the database
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not found in cart",
        });
      }

      // check if the product has insufficient stocks
      if (product.productQuantity < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.productName}. Available: ${product.productQuantity}, Requested: ${cartItem.quantity}`,
        });
      }

      // else, push the product details to the order items array
      orderItems.push({
        productId: product._id,
        quantity: cartItem.quantity,
        price: product.price,
      });


      // add the product price multiplied by quantity to the total amount
      totalAmount += product.price * cartItem.quantity;
    }


    // make an instance of order and reference the user id, and add the order to the database
    const newOrder = new Order({
      userId: userId,
      items: orderItems,
      totalAmount: totalAmount,
    });

    await newOrder.save();

    // clear the cart
    user.cart = [];
    await user.save();

    // return the order
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



export const getUserOrders = async (req, res) => {
  try {

    // get the user id from the req middleware
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ dateOrdered: -1 }); // from newest to oldest

    // return the orders
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    // log the error
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// ADMIN CONTROLLER FUNCTIONS


export const getAllOrders = async (req, res) => {
  try {
    // fetch all the orders from the database with their users
    const orders = await Order.find()
      .populate("userId", "firstName lastName email")
      .populate("items.productId")
      .sort({ dateOrdered: -1 });

    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// 0 - Pending 1 - Approved 2 - Completed 3 - Canceled
export const updateOrderStatus = async (req, res) => {
  try {

    // get the order id from the url and the new status from the body
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    if (orderStatus === undefined || orderStatus === null) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
      });
    }

    // get the order by id and populate the items with product detaisl
    const currentOrder = await Order.findById(orderId).populate(
      "items.productId"
    );

    // check if the order exists
    if (!currentOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    
    // get the current order status of the order
    const previousStatus = currentOrder.orderStatus;

    if (previousStatus !== orderStatus) {

      // approved
      if (previousStatus === 0 && orderStatus === 1) {
        
        for (const item of currentOrder.items) {
          const product = item.productId;
          // check first if the product exists
          if (!product) {
            return res.status(400).json({
              success: false,
              message: "Product not found",
            });
          }

          // check if the product has sufficient stock
          if (product.productQuantity < item.quantity) {
            return res.status(400).json({
              success: false,
              message: `Insufficient stock for ${product.productName}. Available: ${product.productQuantity}, Requested: ${item.quantity}`,
            });
          }
        }


        // else update the product quantity
        for (const item of currentOrder.items) {
          await Product.findByIdAndUpdate(item.productId._id, {
            $inc: {
              productQuantity: -item.quantity,
              quantitySold: item.quantity,
            },
          });
        }
      }

      // else if it from approved to pending or approved to cancelled, find the product and restore the quantity
      if (previousStatus === 1 && orderStatus === 0 || (previousStatus === 1 && orderStatus === 3)) {

        // find the product by id
        for (const item of currentOrder.items) {
          await Product.findByIdAndUpdate(item.productId._id, {
            $inc: {
              productQuantity: item.quantity, // increase the product quantity
              quantitySold: -item.quantity, // decrease the quantity sold
            },
          });
        }
      }


      
    }

    // finally, update the order status and return it together with the full details
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    )
      .populate("userId", "firstName lastName email")
      .populate("items.productId");

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
