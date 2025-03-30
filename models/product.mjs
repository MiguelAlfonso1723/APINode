import mongoose from "mongoose"

const {Schema} = mongoose

const ProductSchema = new Schema({
    id:{
        type :Number,
        required : [true, 'id required'], //constraint y se atrapa en catch
        unique: true
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false,
        default: 'Sin descripcion'
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: false,
        default: 1500
    }
    
});

const Product = mongoose.model('product', ProductSchema)

const ElectronicsProduct = Product.discriminator('Electronics', new Schema({
    features: {
        type: [String],
        required: true
    }, 
    warrantyYears: {
        type: Number,
        required: false,
        default: 2
    }
}));

const FoodProduct = Product.discriminator('Food', new Schema({
    ingredients:{
        type: [String],
        required: true
    },
    weightOrVolume:{
        type: String,
        required: true
    },
    flavors:{
        type: [String],
        required: false,
        default: ['Original']
    },
    expirationDays:{
        type: Number,
        required: false,
        default: 30
    }
}))

const AutomotiveProduct = Product.discriminator('Automotive', new Schema({
    specs:{
        type: Map,
        of: String,
        required: true
    },
    warrantyYears:{
        type: Number,
        required: false,
        default: 2
    },
    modelYear:{
        type: Number,
        required: true
    }
}))

const ClothingProduct = Product.discriminator('Clothing', new Schema({
    sizesAvaiable:{
        type: [String],
        required: true
    },
    colors:{
        type: [String],
        required: true  
    },
    material:{
        type: String,
        required: true
    }
}))

export {
    Product,
    ElectronicsProduct,
    FoodProduct,
    AutomotiveProduct,
    ClothingProduct
}