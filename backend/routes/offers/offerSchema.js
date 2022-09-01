const collectionName="offers"
const offerSchema={
    offerName:{type:String},
    description:{type:String},
    startingDate:{type:Date,default:Date()},
    endingDate:{type:Date},
    category:[{type:String}],
    subCategory:[{type:String}],
    offerStatus:{type:Boolean,default:true},
    priceOff:{type:Number},
}

module.exports={
    collectionName:collectionName,
    schemaModel:offerSchema
}