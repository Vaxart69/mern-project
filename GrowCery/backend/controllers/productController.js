import Product from "../models/product.js";


export const createProduct = async (req, res) => {

  // get the req body variables
  try {
    const {
      productName,
      productDescription,
      productType,
      productQuantity,
      price,
      productImage,
    } = req.body;


    // create a new product instance and store the body variables
    const newProduct = new Product({
      productName,
      productDescription,
      productType,
      productQuantity,
      price,
      productImage,
    });


    // save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Error creating product",
      error: e.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {

    // get the id from the url
    const { productId } = req.params;

    // find and delete
    const deletedProduct = await Product.findOneAndDelete({ _id: productId });
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Error deleting product",
      error: e.message,
    });
  }
};


// find products and return them
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: e.message,
    });
  }
};


export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDescription,
      productType,
      productQuantity,
      price,
      productImage,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        productName,
        productDescription,
        productType,
        productQuantity,
        price,
        productImage,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};
