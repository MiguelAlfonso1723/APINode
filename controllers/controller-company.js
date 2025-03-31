import Company from '../models/company.mjs'
import Product from '../models/product.mjs'

async function getAll(req,res){
   try{
      const result = await Company.find({})

      return res.status(200).json({"state":true,"data":result})
      //return res.status(200).json({"state":true,"data:"{"id":id,"name":name,"country":country}}) 
    }catch(error){
      return res.status(500).json({"state":false,"message":error.message})

    }
}



async function getById(req,res){
  const {id} = req.params
  try{
    const result = await Company.findById(id)
    return res.status(200).json({"state":true,"data":result})
  }catch(err){
    return res.status(500).json({"state":false, "error":err.message})
  }
    
}

  async function save(req,res){
    const {id, name, industry, numberIndustry, headquarters, founded, employees, anualRevenue } = req.body;

    try{
      const company = new Company({id,name, industry, numberIndustry, headquarters, founded,employees, anualRevenue})
      const result = await company.save()
      return res.status(200).json({'state':true,'data':result})
      
    }catch(error){
      return res.status(500).json({"state":false,"message":error.message})

    }
    //return res.status(200).json({"state":true,"data":{"id":id,"name":name,"country":country}}) 
  }

  async function actualize(req,res){
    const {id} = req.params
    try{
      const company = await Company.findById(id);
      if(company){
        const {id, name, industry, numberIndustry, headquarters, founded, employees, anualRevenue } = req.body;
        
        company.overwrite(new Company({id,name, industry, numberIndustry, headquarters, founded,employees, anualRevenue}));

        const result = await company.save()
        return res.status(200).json({'state':true,'data':result})
      }else{
            return res.status(404).json({"state":false, "message":"ID Company Not Found", "data":null})     
      }
    }catch (err){
      return res.status(500).json({"state":false,"message":err.message})
    }
  }

  async function eliminate (req, res){
    const {id} = req.params
    try{
      const company = await Company.findById(id);
      if(company){

        for(let i = 0; i < company.products.length; i++){
          const product = await Product.findById(company.products[i].toString())
          await product.deleteOne()
        } 

        const result = await company.deleteOne()
        return res.status(200).json({'state':true,'data':result})
      }else{
            return res.status(404).json({"state":false, "message":"ID Company Not Found", "data":null})     
      }
    }catch (err){
      return res.status(500).json({"state":false,"message":err.message})
    }
  }


  export{
    getAll,
    getById,
    save,
    actualize,
    eliminate
  }