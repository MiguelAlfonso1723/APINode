import product from '../models/product.mjs'
import Company from '../models/company.mjs'

async function getAll (req, res){
    try{

        const result = await product.find({})
        return res.status(200).json({"state":true, "data":result})

    }catch(err){
        return res.status(500).json({"state":false, "message": err.mesagge})
    }
}



async function save(req, res){
    const {id} = req.params
    try{
        const company = await Company.findById(id)
        if(company){
            const song = new product(req.body)
            company.products.push(song)

            await company.save()
            song.company = company
            const result = await song.save()

            return res.status(200).json({"state":true, "data":result}) 
        }else{
            return res.status(404).json({"state":true, "data":null})     
        }
    }catch(err){
        return res.status(500).json({"state":false, "message": err.message})
    }
}

export{
    getAll,
    save
}