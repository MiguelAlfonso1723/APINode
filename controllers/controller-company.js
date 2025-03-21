import Singer from '../models/company.mjs'

async function getAll(req,res){
   try{
      const result = await Singer.find({})

      return res.status(200).json({"state":true,"data":result})
      //return res.status(200).json({"state":true,"data:"{"id":id,"name":name,"country":country}}) 
    }catch(error){
      return res.status(500).json({"state":false,"message":error.message})

    }
}



  async function getById(req,res){
    const {id} = req.params
    try{
      const result = await Singer.findById(id)
      return res.status(200).json({"state":true,"data":result})
    }catch(err){
      return res.status(500).json({"state":false, "error":err.message})
    }
    
  }

  async function save(req,res){
    const {id, name, country} = req.body;

    try{
      const singer = new Singer({id,name,country})
      const result = await singer.save()
      return res.status(200).json({'state':true,'data':result})
      
      //return res.status(200).json({"state":true,"data":{"id":id,"name":name,"country":country}}) 
    }catch(error){
      return res.status(500).json({"state":false,"message":error.message})

    }
    return res.status(200).json({"state":true,"data":{"id":id,"name":name,"country":country}}) 
  }

  async function actualize(req,res){
    const {idn} = req.params
    const {name, country} = req.body
    return res.status(200).json({'state':true,data:{idn,name,country}})
  }
  export{
    getAll,
    getById,
    save,
    actualize
  }