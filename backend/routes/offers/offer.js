const express=require("express")
const { AuthToken } = require("../../middleware/middleware")
const router=express.Router()
const {databaseEcommerce}=require("./../../index")

const offerModel=databaseEcommerce.createSchemaModel(require("./offerSchema"))
let offerList={
    offerList:{}
}

const offers= async ()=>{
    const data = await (async () => {
        try {
            let productData = await databaseEcommerce.fetchDatabase(
                {offerStatus:true},
                {},
                offerModel
            )
            return productData.data
        } catch (err) {
            return ["Error"]
        }
    })()
    offerList.offerList={}
    data.forEach(offer=>{
        offerList.offerList[offer.offerName]=offer
    })
}
offers()

router.post("/add-offer",AuthToken.jwtAuthentication,async (req,res)=>{
    try{
        if(req.user.role!=="admin") return res.json({status:"failure","message":"Only accessed by admin"})
        let invalid=""
        if (req.body.offerName==="") invalid+="Offer name not valid\n"
        if(req.body.description==="") invalid+="Offer description not valid\n" 
        if(req.body.priceOff==="" && Number(req.body.priceOff)===NaN) invalid+="Offer price not valid\n"
        if (invalid!=="") return res.json({status:"failure",message:invalid})
        let insertData={
            offerName:req.body.offerName.toLowerCase(),
            description:req.body.description,
            priceOff:Number(req.body.priceOff),
            category:(req.body.category)?Array(req.body.categoryName).flat():[],
            subCategory:(req.body.subCategory)?Array(req.body.subCategory).flat():[]
        }
        let offerData=await databaseEcommerce.findOrCreate({offerName:req.body.offerName},insertData,{},offerModel)
        if(offerData.msg==="User Found") return res.json({status:"failure",message:"Offer already exist"})
        res.json({status:"success",message:"Offer added"})
        return offers()
    }
    catch(e){
        res.json({status:"failure",message:"Offer not valid"})
    }
})

router.get("/remove-offer",AuthToken.jwtAuthentication,async (req,res)=>{
    try{
        console.log(offerList)
        if (req.user.role!=="admin") return res.json({status:"failure",message:"Can only be accessed by admin"})
        let length=await databaseEcommerce.paginationSearchLength({offerName:req.query.offerName.toLowerCase()},{},offerModel)
        if(length<1) return res.json({status:"failure",message:`No offer found of name ${req.query.offerName}`})
        await databaseEcommerce.updateToModel({offerName:req.query.offerName.toLowerCase()},{$set:{offerStatus:false}},offerModel)
        res.json({status:"success",message:"Offer deactivated"})
        offers()
    }
    catch(e){
        res.json({status:"failure",message:"Offer deactivated failed"})
    }
})

router.get("/update-offer",AuthToken.jwtAuthentication,async (req,res)=>{
    try{
        if (req.user.role!=="admin") return res.json({status:"failure",message:"Can only be accessed by admin"})
        let invalid=""
        let storeVal={}
        if (req.body.offerName==="") invalid+="Offer name not valid\n"
        if(req.body.priceOff==="" && Number(req.body.priceOff)===NaN) invalid+="Offer price not valid\n"
        else storeVal.priceOff=req.body.priceOff
        if(req.body.priceOff==="" && Number(req.body.priceOff)===NaN) invalid+="Offer price not valid\n"
        let insertData={
            offerName:req.body.offerName.toLowerCase(),
            description:req.body.description,
            priceOff:Number(req.body.priceOff),
            category:(req.body.category)?Array(req.body.categoryName).flat():[],
            subCategory:(req.body.subCategory)?Array(req.body.subCategory).flat():[]
        }
        await databaseEcommerce.updateToModel({offerName:req.query.offerName.toLowerCase()},{$set:insertData},offerModel)
        res.json({status:"success",message:"Offer deactivated"})
        return offers()
    }
    catch(e){
        res.json({status:"failure",message:"Offer deactivation failed"})
    }

})

router.get('/',async (req,res)=>{
    try{
        console.log(offerList.offerList)
        let offerData=await databaseEcommerce.fetchDatabase({},{},offerModel)
        res.json({status:"success",data:offerData.data})
    }
    catch(e){
        res.json({status:"failure",message:"Cannot get offers"})
    }
})

module.exports={
    router,
    offerModel,
    offerList
}