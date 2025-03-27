import mongoose from 'mongoose'

const {Schema} = mongoose

const CompanySchema = new Schema({

    id:{
        type :Number,
        required : [true, 'id required'], //constraint y se atrapa en catch
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    products:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]

}) 

export default mongoose.model('Company', CompanySchema)
