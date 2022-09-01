const collectionName="coupon"
const couponSchema={
    couponName:{type:String},
    couponStatus:{type:Boolean,default:true},
    startingDate:{type:Date,default:Date()},
    numberOfRequest:{type:Number,default:0},
    priceOff:{type:Number},
}

module.exports={
    collectionName:collectionName,
    schemaModel:couponSchema
}