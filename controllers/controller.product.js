import product from './../models/product.mjs'
import Song from './../models/product.mjs'

async function getAll (req, res){
    try{

        const result = await product.find()
        return res.status(200).json({"state":true, "data":[]})

    }catch(err){
        return res.status(500).json({"state":false, "message": err.mesagge})
    }
}



async function save(req, res){
    const {id} = req.params
    try{
        const singer = await Singer.findById(id)
        if(singer){
            const song = new Song(req.body)
            singer.songs.push(song)

            await singer.save()
            song.singer = singer
            const result = await song.save()

            return res.status(200).json({"state":true, "data":singer})
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