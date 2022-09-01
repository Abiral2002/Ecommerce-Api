const express = require("express")
const router = express.Router()
const { databaseEcommerce } = require("../.././index");
const { AuthToken } = require("../../middleware/middleware");
const path = require("path")
const fs = require("fs")

let catgoryModel = databaseEcommerce.createSchemaModel(
    require("./categorySchema")
)

/**
 * Multer module to parse multipart/form-data
 */
const multer = require("multer");


/**
 * Setting storage engiene
 */
const storage = multer.diskStorage({
    destination: "./public/images/categories",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});



const categorys = function () {
    return async () => {
        try {
            let productData = await databaseEcommerce.fetchDatabase(
                {},
                {},
                catgoryModel
            );
            return productData.data
        } catch (err) {
            return err
        }
    }
}

let filteredCategory = []

categorys()().then(data => {
    filteredCategory = data
})

/**
 * Get request handler for all-category
 * Sends category of product
 */
 router.get("/all-category", (req, res) => {
    res.json({data:filteredCategory})
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
            return
        }
        cb("Error: Image invalid");
    },
}).single("image");

function multerMiddleWare(req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            res.json({ status: "failure", message: "No Image found" });
        } else {
            next();
        }
    });
}

router.post("/add-category", multerMiddleWare, AuthToken.jwtAuthentication, async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.json({ status: "failure", message: "Can only be accessed by admin" })
        let invalid = ""
        if (!req.body.categoryName) invalid += "No category name found\n"
        if (!req.body.description) invalid += "No desc available\n"
        if (!req.file) invalid += "No Image present\n"
        let insertData = {
            categoryName: req.body.categoryName.toLowerCase(),
            image: req.file.filename,
            description: req.body.description,
        }
        let categoryData = await databaseEcommerce.findOrCreate({ categoryName: req.body.categoryName }, insertData, {}, catgoryModel)
        if (categoryData.msg === "User Found") {
            res.json({ status: "failure", message: "Category exists" })
            fs.unlink(path.join("./public/images/categories", req.file.filename), (err) => { })
            return res.json({ status: "failure", message: "Category exists" })
        }
        categorys()().then(data => {
            filteredCategory = data
        })
        return res.json({ status: "success", message: "Category added" })
    }
    catch (e) {
        res.json({ status: "failure", message: "Category insertion failed" })
    }
})

router.get("/remove-category", AuthToken.jwtAuthentication, async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.json({ status: "failure", message: "Can only be accessed by admin" })
        let length = await databaseEcommerce.paginationSearchLength({ categoryName: req.query.categoryName.toLowerCase() }, {}, catgoryModel)
        if (length < 1) return res.json({ status: "failure", message: `No offer found of name ${req.query.offerName}` })
        await databaseEcommerce.deleteFromModel({ categoryName: req.query.categoryName.toLowerCase() }, catgoryModel)
        res.json({ status: "success", message: "Category deleted" })
    }
    catch (e) {
        res.json({ status: "failure", message: "Category deletion failed" })
    }

})

module.exports = {
    router,
    catgoryModel
}
