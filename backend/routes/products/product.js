const express = require("express");
const router = express.Router();
const path = require("path");
const { databaseEcommerce } = require("../.././index");
const { AuthToken, Validator } = require("../../middleware/middleware");
const utils=require("./../../utils/utils")
let {ObjectId}=require("mongodb")
let {catgoryModel}=require("./../category/category")

let productModel = databaseEcommerce.createSchemaModel(
  require("./productSchema")
);

let removedProductModel=databaseEcommerce.createSchemaModel(
  require("./removedProductSchema")
);

let {offerModel}=require("./../offers/offer")

const categorys= function(){
  return async ()=>{
    try {
      let productData = await databaseEcommerce.fetchDatabase(
        {},
        { _id: 0, category: 1 ,subCategory:1},
        productModel
      );
      return productData.data
    } catch (err) {
      return err
    }
  }
}

let filteredCategory=[]

categorys()().then(data=>{
  filteredCategory=utils.categoryFilter(data)
})

/**
 * Multer module to parse multipart/form-data
 */
const multer = require("multer");


/**
 * Setting storage engiene
 */
const storage = multer.diskStorage({
  destination: "./public/images/products",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/**
 * Setting multar storage and file filter
 */
const upload = multer({
  limits: { fileSize: 1024 * 1024 * 50 },
  storage,
  fileFilter: (req, file, cb) => {
    const filetype = /.jpg|.png|.jpeg|.gif/;
    let ValidFileExt = filetype.test(path.extname(file.originalname));
    let ValidMimeType = filetype.test(file.mimetype);
    if (ValidFileExt && ValidMimeType) {
      cb(null, true);
    } else {
      cb("Error: Image invalid");
    }
  },
}).array("images", 5);

function multerMiddleWare(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.json({ status: "failure", message: "No images found" });
    } else {
      next();
    }
  });
}

/**
 * Get request handler for / path
 * Sends product data interm of category min-max price as responce
 */
router.get("/", async (req, res) => {
  let { category, minprice, maxprice, page , limit, subcategory } = req.query;

  if (page && page < 1 && parseInt(page)===NaN) page=1
  if (limit && limit < 1 && parseInt(limit)===NaN) limit=5
  startIndex=(page && limit)?(parseInt(page)-1)*limit:0
  endIndex=(page && limit)?(parseInt(page))*limit:0
    try {
      let search={}
      subcategory?search.subCategory=subcategory.toLowerCase():null
      category?search.category=category.toLowerCase():null
      maxprice?search.maxprice=parseInt(maxprice):null
      minprice?search.minprice=parseInt(minprice):null
      let queryLength=await databaseEcommerce.paginationSearchLength(search,
        {},
        productModel
      )

      let productData = await databaseEcommerce.paginationSearch(
        search,
        {},
        productModel
      ,startIndex,limit
      
    );
      let result={}
      result.products=productData.data
      if (endIndex < queryLength) result.next={page:parseInt(page)+1,limit:limit}
      else result.next={page:-1,limit:-1}
      res.status(202).json({ status: "success", data: result});
      return;

    } catch (err) {
      res.json({ status: "error", message: err.data });
      return;
    }
});

/**
 * Get request handler for single-products
 * Sends single product information
 */

router.get("/single-product",async(req,res)=>{
  try{
    let {id}=req.query
    if(!id) return res.json({status:"failure",message:"Product id not present"})
    let productInfo=await databaseEcommerce.findById(id,{},productModel)
    res.json({status:"success",data:productInfo.data[0]})
  }
  catch(e){
    res.json({status:"failure",message:"Product not found"})
  }
})

/**
 * Get request handler for / path
 * Sends data that matches the id param
 */
router.get("/search/:id", async (req, res) => {
  let { category, minprice, maxprice, page , limit, subcategory,onlyname} = req.query;
  startIndex=(page && limit)?(parseInt(page)-1)*limit:0
  endIndex=(page && limit)?(parseInt(page))*limit:0
  try {
    let search={}
    subcategory?search.subCategory=subcategory.toLowerCase():null
    category?search.category=category.toLowerCase():null
    maxprice?search.maxprice=parseInt(maxprice):null
    minprice?search.minprice=parseInt(minprice):null
    req.params.id?search.productName= { $regex: `${req.params.id}` }:null

    let queryLength=await databaseEcommerce.paginationSearchLength(
      search,
      {},
      productModel
    )
    if (queryLength < 1) return res.json({ status: "error", message: "Not found" })

    let productData = await databaseEcommerce.paginationSearch(
      search,
      Boolean(onlyname)===true?{productName:1}:{},
      productModel
    ,startIndex,limit
  );

    let result={}
    result.products=productData.data
    if (endIndex < queryLength) result.next={page:parseInt(page)+1,limit:limit}
    res.json({ status: "success", data: result});
    return;

  } 
  catch (err) {
    res.json({ status: "error", message: err.data });
    return;
  }
});



// /**
//  * Get request handler for all-category
//  * Sends category of product
//  */
// router.get("/all-category", (req, res) => {
//   res.json({data:filteredCategory})
// });




/**
 * Post request handler for /add path
 * Verify if the user is admin or not
 * Validate the product information
 * Adds to the database
 */
router.post(
  "/add",
  AuthToken.jwtAuthentication,
  multerMiddleWare,
  Validator.validateProduct,
  async (req, res, next) => {

    if (req.user.role != "admin" || req.user.role == undefined) {
      return res
        .status(204)
        .json({ status: "failure", message: "Only accessed from admin" });
    }
    try {
      await databaseEcommerce.saveToModel(req.product, productModel);
      res
        .status(200)
        .json({ status: "Succes", message: "Product added to database" });
    } catch (err) {
      res
        .status(503)
        .json({ status: "error", message: "Error occured try again" });
    }
  }
);

/**
  * Post Request handler for remove-product path
  * Fetches the data from product collction and insert it into removedProduct collection
  * Deletes data from products collection
 */
router.post("/remove-product",AuthToken.jwtAuthentication,async (req,res)=>{
  try{
    if(req.user.role!="admin") return res.json({ status: "failure", message: "Only accessed from admin" });
    if (!req.body.productId) return res.json({status:"failure",message:"Product id not present"})
    let removalProduct=Array(req.body.productId).flat()
    let removalData=[]
    let removalFailed=[]
    for(let i=0;i<removalProduct.length;i++){
      try{
        let data=await databaseEcommerce.findById(removalProduct[i],{},productModel)
        removalData.push(data.data[0])
      }
      catch(e){
        removalFailed.push(removalProduct[i])
      }
    }
    await databaseEcommerce.saveManyToModel(removalData,removedProductModel)
    for(let i=0;i<removalData.length;i++){
      await databaseEcommerce.deleteFromModel({_id:removalData[i]._id},productModel)
    }
    if (removalFailed.length===0) return res.json({status:"success",message:"Item deleted"})
    return res.json({status:"failure",message:`failed to remove items ${removalFailed}`})
  }
  catch(e){
    return res.json({status:"failure",message:"Item removal failed"})
  }

})

/**
 * Post request handler for add-offer
 * Validate offer 
 * Add offer to product provided by admin
 */
router.post("/add-offers",AuthToken.jwtAuthentication,async (req,res)=>{
  try{
    if(req.user.role!="admin") return res.json({ status: "failure", message: "Only accessed from admin" }); 
    if (!req.body.productId) return res.json({status:"failure",message:"Product id not present"})
    if (!req.body.offerName) return res.json({status:"failure",message:"Offer name invalid"})
    let length=await databaseEcommerce.paginationSearchLength({offerName:req.body.offerName.toLowerCase(),offerStatus:true},{},offerModel)
    if(length<1) return res.json({status:"failure",message:`No offer found of name ${req.body.offerName}`})
    let offerProduct=Array(req.body.productId).flat()
    let failedToAdd=[]
    for(let i=0;i<offerProduct.length;i++){
      try{
        await databaseEcommerce.paginationSearchLength({_id:ObjectId(offerProduct[i])},{},productModel)
        databaseEcommerce.updateToModel({_id:ObjectId(offerProduct[i])},{$set:{offer:req.body.offerName.toLowerCase()}},productModel)
      }
      catch(e){
        failedToAdd.push(offerProduct[i])
      }
    }
    if(failedToAdd.length<1) return res.json({status:"success",message:"offer added to products"})
    return res.json({status:"failure",message:`offer addition failed in ${failedToAdd}`})
  }
  catch(e){
    return res.json({status:"failure",message:"Offer addition failed"})
  }
})

/**
 * 
 */
router.post("/add-sale",AuthToken.jwtAuthentication,async (req,res)=>{
  try{
    if(req.user.role!="admin") return res.json({ status: "failure", message: "Only accessed from admin" }); 
    if (!req.body.productId) return res.json({status:"failure",message:"Product id not present"})
    if (!req.body.sale || Number(req.body.sale)===NaN) return res.json({status:"failure",message:"Sale price invalid"})
    let saleVal=Number(req.body.sale)
    let saleProduct=Array(req.body.productId).flat()
    let failedToAdd=[]
    for(let i=0;i<offerProduct.length;i++){
      try{
        await databaseEcommerce.paginationSearchLength({_id:ObjectId(saleProduct[i])},{},productModel)
        databaseEcommerce.updateToModel({_id:ObjectId(saleProduct[i])},{$set:{sale:saleVal}},productModel)
      }
      catch(e){
        failedToAdd.push(offerProduct[i])
      }
    }
    if(failedToAdd.length<1) return res.json({status:"success",message:"Sale added to products"})
    return res.json({status:"failure",message:`Sale addition failed in ${failedToAdd}`})
  }
  catch(e){
    return res.json({status:"failure",message:"Sale addition failed"})
  }
})

module.exports = {
  router,
  productModel,
};
