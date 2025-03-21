import Singer from '../models/company.mjs'

async function getAll(req,res){
   try{
      const singer = new Singer.find()


      //return res.status(200).json({"state":true,"data:"{"id":id,"name":name,"country":country}}) 
    }catch(error){
      return res.status(500).json({"state":false,"message":error.message})

    }
}



  async function findById(req,res){
    const {id} = req.params
    return res.status(200).json({'state':true,data:id})
  }

  async function save(req,res){
    const {id, name, country} = req.body;

    try{
      const singer = new Singer({id,name,country})
      return res.status(200).json({'state':true,'data':singer})
      const result = await singer.save()


      //return res.status(200).json({"state":true,"data:"{"id":id,"name":name,"country":country}}) 
    }catch(error){
      return res.status(500).json({"state":false,"message":error.message})

    }
    
  }

  async function actualize(req,res){
    const {idn} = req.params
    const {name, country} = req.body
    return res.status(200).json({'state':true,data:{idn,name,country}})
  }
  export{
    getAll,
    findById,
    save,
    actualize
  }