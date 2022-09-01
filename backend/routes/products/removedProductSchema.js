const collectionName = "removed_product";
const removedProductSchema = {
    productName: { type: String, require: true },
    companyName:{type:String},
    desc: { type: String, require: true },
    category: { type: String, require: true },
    subCategory: [{ type: String }],
    addedDate:{type:String},
    stock: { type: Number },
    price: { type: Number, require: true },
    images: { type: Array },
    offer:{type:String},
    sale:{type:Number,default:0},
    removedDate:{type:Date,default:Date()}
};

module.exports = {
  collectionName: collectionName,
  schemaModel: removedProductSchema,
};