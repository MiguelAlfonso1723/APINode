import mongoose from 'mongoose';

const URL = process.env.URL
const DB = process.env.DB

try{
    await mongoose.connect(URL+DB)
    console.log('MongoDB Connect Success...')
}catch(err){
    console.log(err)
}

export default mongoose
