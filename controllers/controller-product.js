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

async function getById(req,res){
  const {id} = req.params
  try{
    const result = await Product.findById(id)
    return res.status(200).json({"state":true,"data":result})
  }catch(err){
    return res.status(500).json({"state":false, "error":err.message})
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
            return res.status(404).json({"state":false, "message":"ID Company Not Found", "data":null})     
        }
    }catch(err){
        return res.status(500).json({"state":false, "message": err.message})
    }
}


async function eliminate (req, res){
    const {id} = req.params
    try{
      const product = await Product.findById(id);
      if(product){
        const company = await Company.findById(product.company._id)
        for(let i = 0; i < company.products.length; i++){
            if(company.products[i].toString() == id){
                company.products.splice(i, 1)
                await company.save()
            }
        } 
        const result = await product.deleteOne()
        return res.status(200).json({'state':true,'data':result})
      }else{
            return res.status(404).json({"state":false, "message":"ID Company Not Found", "data":null})     
      }
    }catch (err){
      return res.status(500).json({"state":false,"message":err.message})
    }
}


async function actualize(req, res){
    const {id} = req.params
    try{
        const product = await Product.findById(id)

        if(product){

            const company = await Company.findById(product.company._id)

            let productN = new Product(req.body)

            switch(company.numberIndustry){
                case 1:
                    productN = new ElectronicsProduct(req.body)
                    break
                case 2:
                    productN = new FoodProduct(req.body)
                    break
                case 3:
                    productN = new AutomotiveProduct(req.body)
                    break
                case 4:
                    productN = new ClothingProduct(req.body)
                    break
                default:
                    console.log('No se encuentra el tipo de producto, se dejará en la clase base')
                    break
            }

            productN.company = company
            
            await product.overwrite(productN)

            const result = await product.save()

            return res.status(200).json({"state":true, "data":result}) 
        }else{
            return res.status(404).json({"state":false, "message":"ID Company Not Found", "data":null})     
        }
    }catch(err){
        return res.status(500).json({"state":false, "message": err.message})
    }
}



export{
    getAll,
    save,
    getById,
    eliminate,
    actualize
}