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
    industry:{
        type: String,
        required: true
    },
    numberIndustry:{
        type: Number,
        required: true
    },
    headquarters:{
        type: String,
        required: true
    },
    founded:{
        type: Date,
        required: true
    },
    employees:{
        type: Number,
        required: false,
        default: 1000
    },
    anualRevenue:{
        type: Number,
        required: false,
        default: 100000
    },
    products:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]

}) 

export default mongoose.model('Company', CompanySchema)
