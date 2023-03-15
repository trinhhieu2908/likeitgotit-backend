const express = require("express");
const cors = require('cors')
require('dotenv').config()
const home = require('./controller/home');
const product = require('./controller/product');
const category = require('./controller/category');
const brand = require('./controller/brand')
const size = require('./controller/size')
const image = require('./controller/image')
const email = require('./controller/email')
const order = require('./controller/order')
const user = require('./controller/user')
const productOption = require('./controller/productOption')
const {upload} = require('./middleware/upload')
const app = express()
app.use(cors());
//var upload = multer()

// const appBundle = fs.readFileSync("../frontend/public/index.html", "utf8");

// app.use('/', express.static("frontend/public"));
app.use(express.json());

// app.get('/', function(req, res) {
//     res.send(appBundle)
// })
app.get('/home', home.getHome)
//api Product
// add new product
app.post('/api/product', product.addProduct)
// get all products
app.get('/api/product', product.listAllProducts)
// get one product by id
app.get('/api/product/:id', product.listProductById)
// update one product
app.patch('/api/product/:id', product.updateProduct)
// delete one product
app.delete('/api/product/:id', product.deleteProduct)
// api Category
// api add category
app.post('/api/category', category.addCategory)
// api update category
app.patch('/api/category/:id', category.updateCategory)
// api delete category
app.delete('/api/category/:id', category.deleteCategory)
// api list all category
app.get('/api/category', category.listAllCategory)
// api list one category by id
app.get('/api/category/:id', category.listCategoryById)

// api Images 
app.post('/api/images/:id',upload, image.addImages, (error, req, res, next) => {
    return res.json({
        errorMsg: error.message,
        data: null
    })
})
// api list images by productId 
app.get('/api/images/:id', image.listImagesById)

// api Brand
// api add Brand
app.post('/api/brand', brand.addBrand)
// api update brand
app.patch('/api/brand/:id', brand.updateBrand)
// api delete brand
app.delete('/api/brand/:id', brand.deleteBrand)
// api list all brand
app.get('/api/brand', brand.listAllBrand)
// api list one brand by id
app.get('/api/brand/:id', brand.listBrandById)

// api Size
// api add Size
app.post('/api/size', size.addSize)
// api update size
app.patch('/api/size/:id', size.updateSize)
// api delete size
app.delete('/api/size/:id', size.deleteSize)
// api list all size
app.get('/api/size', size.listAllSize)
// api list one size by id
app.get('/api/size/:id', size.listSizeById)

// api add product option
app.post('/api/product-option', productOption.addProductOption)
// api getProductOptionById
app.get('/api/product-option/:id', productOption.getProductOptionById)

app.get('/api/product-category/:id', product.listAllProducts)

// api create order
app.post('/api/order', order.addOrder)

//api add user 
app.post('/api/user/register', user.addUser)
//api login user 
app.post('/api/user/login', user.login)

module.exports = app