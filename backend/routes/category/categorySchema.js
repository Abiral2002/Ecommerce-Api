const collectionName="categories"
const categorySchema={
    categoryName:{type:String},
    image:{type:String},
    description:{type:String},
}

module.exports={
    collectionName:collectionName,
    schemaModel:categorySchema
}