const collectionName = "products";
const productSchema = {
  productName: { type: String, require: true },
  companyName:{type:String},
  desc: { type: String, require: true },
  category: { type: String, require: true },
  subCategory: [{ type: String }],
  addedDate:{type:String,default:Date()},
  stock: { type: Number },
  price: { type: Number, require: true },
  images: { type: Array },
  offer:{type:String},
  sale:{type:Number,default:0},
};

module.exports = {
  collectionName: collectionName,
  schemaModel: productSchema,
};