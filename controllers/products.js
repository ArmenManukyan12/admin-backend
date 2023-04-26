const {Product} = require('./index');

// Get all products
async function getAllProducts (req, res) {
  try {
    // include:category
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single product by ID
async function getProductById (req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new product
// async function createProduct(req, res) {
//   const { name, image, description, price, categoryId } = req.body;
//   try {
//     const product = await Product.create({ name, image, description, price, categoryId });
//     res.json(product);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };
function createProduct(req, res){
  
    const {name, price, description, image, categoryId} = req.body;
  
    const newProduct = {
        name,
        price,
        description,
        image,
        categoryId,
    }
    Product.create(newProduct).then((product)=>{
        res.status(201).json(product)
      }).catch((err)=>{
        res.status(500).json({error: err.message})
      })
}

// Update an existing product by ID
// async function updateProduct(req, res) {
//   const { name, image, description, price, categoryId } = req.body;
//   try {
//     const product = await Product.findByPk(req.params.id);
//     if (!product) {
//       return res.status(404).json({ msg: 'Product not found' });
//     }
//     product.name = name;
//     product.image = image;
//     product.description = description;
//     product.price = price;
//     product.categoryId = categoryId
//     await product.save();
//     res.json(product);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };
function updateProduct(req,res){
  
    const {name, price, description, img, categoryId, id} = req.body;
    Product.update({name, price, description, img, categoryId},{where:{id}}).then(()=>{
        res.json({response:'updated'})
    }).catch((err)=>{
        res.status(500).json({error: err.message})
    })
 
}

// Delete an existing product by ID

// async function deleteProduct(req, res)  {
//   try {
//     const product = await Product.findByPk(req.params.id);
//     if (!product) {
//       return res.status(404).json({ msg: 'Product not found' });
//     }
//     await product.destroy();
//     res.json({ msg: 'Product deleted' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };
function deleteProduct(req,res){
 
    const {id} = req.body;
    Product.destroy({where:{id}}).then(()=>{
        res.json({response:'deleted'})
    }).catch((err)=>{
        res.status(500).json({error: err.message})
    }) 
  
}
module.exports = {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}

