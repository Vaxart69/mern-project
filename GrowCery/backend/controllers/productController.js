import Product from '../models/product.js';

// function for creating a product
export const createProduct = async (req, res) => {
  try {

    const { productName, productDescription, productType, productQuantity, price, productImage } = req.body;
   

    const newProduct = new Product({
      productName,
      productDescription,
      productType,
      productQuantity,
      price,
      productImage,
    });

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

// delete a product by fetching the productId from the request parameters

export const deleteProduct = async (req, res) =>{

    try {


        const { productId } = req.params;

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

}