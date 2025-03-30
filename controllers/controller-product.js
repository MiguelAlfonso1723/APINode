import {Product,
        ElectronicsProduct,
        FoodProduct,
        AutomotiveProduct,
        ClothingProduct} from '../models/product.mjs'
import Company from '../models/company.mjs'

async function getAll (req, res){
    try{

        const result = await Product.find({})
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

            let product = new Product(req.body)
            switch(company.numberIndustry){
                case 1:
                    product = new ElectronicsProduct(req.body)
                    break
                case 2:
                    product = new FoodProduct(req.body)
                    break
                case 3:
                    product = new AutomotiveProduct(req.body)
                    break
                case 4:
                    product = new ClothingProduct(req.body)
                    break
                default:
                    console.log('No se encuentra el tipo de producto, se dejará en la clase base')
                    break
            }
            
            company.products.push(product)

            await company.save()
            product.company = company
            const result = await product.save()

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