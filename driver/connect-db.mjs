import mongoose from 'mongoose';

const URL = secrets.URL
const DB = secrets.DB

try{
    await mongoose.connect(URL+DB)
    console.log('MongoDB Connect Success...')
}catch(err){
    console.log(err)
}

export default mongoose
