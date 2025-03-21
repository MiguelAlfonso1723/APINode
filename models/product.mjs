import mongoose from "mongoose"

const {Schema} = mongoose

const ProductSchema = new Schema({
    id:{
        type :Number,
        required : [true, 'id required'], //constraint y se atrapa en catch
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: false,
        default: 3000
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: 'company'
    }
})

export default mongoose.model('product', ProductSchema)