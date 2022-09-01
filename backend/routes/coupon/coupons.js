const express=require("express")
const router=express.Router()
const { databaseEcommerce } = require("../.././index");
const { AuthToken } = require("../../middleware/middleware");

let couponModel=databaseEcommerce.createSchemaModel(
    require("./couponSchema")
)

/**
 * Get handler for coupon-details path
 * Sends coupons details
 */
 router.get("/coupon-details",AuthToken.jwtAuthentication, async (req,res)=>{
    if (req.user.role!="admin") return res.status(204).json({ status: "failure", message: "Only accessed from admin" });
    try{
        let data=await databaseEcommerce.fetchDatabase({},{},couponModel)
        res.json({status:"success",message:data.data})
    }
    catch(e){
        res.json({status:"failure",message:"No coupons found"})
    }

})

/**
 * Post handler for add-coupons path
 * Validate coupons details and add it to data base
 */
router.post("/add-coupon",AuthToken.jwtAuthentication,async (req,res)=>{
    if (req.user.role!="admin") return res.status(204).json({ status: "failure", message: "Only accessed from admin" });
    let invalid=""
    if (!req.body.couponName) invalid+="Coupon name not valid\n"
    if (!req.body.couponPrice) invalid+="Coupon discount percentage not determined\n"
    if (invalid!="") return res.status(400).json({status:"failure",message:invalid})

    let couponData={
        couponName:req.body.couponName,
        priceOff:Number(req.body.couponPrice),
    }
    try{
        await databaseEcommerce.saveToModel(couponData,couponModel)
        res.json({status:"success",message:"Coupon added"})
    }
    catch(e){
        res.status(504).json({status:"failure",message:"Coupon added failed"})
    }
})

/**
 * Get handler for remove-coupon path
 * Validates the removing coupons and changes it's couponSatus to false
 */
router.get("/remove-coupon",AuthToken.jwtAuthentication,async (req,res)=>{
    if (req.user.role!="admin") return res.status(204).json({ status: "failure", message: "Only accessed from admin" });
    try{
        let length=await databaseEcommerce.paginationSearchLength({couponName:req.query.couponName},{couponStatus:true},couponModel)
        if(length<1) return res.json({status:"failure",message:`No offer found of name ${req.query.offerName}`})
        await databaseEcommerce.updateToModel({couponName:req.query.couponName},{$set:{couponStatus:false}},couponModel)
        res.json({status:"success",message:"Coupon removed"})
    }
    catch(e){
        res.status(504).json({status:"failure",message:"Coupon removal failed"})
    }
})


module.exports={
    couponModel,
    router
}