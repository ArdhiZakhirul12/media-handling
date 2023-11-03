const { PrismaClient } = require("@prisma/client");
const { imageKit } = require("../utils");
const  fs  = require('fs')
const axios = require('axios');


const prisma = new PrismaClient();
module.exports = {
  addCars: async (req, res) => {
    try {
      const data = await prisma.image.create({
        data: {
          judul: req.body.judul,
          deskripsi: req.body.judul,
          image: `/images/${req.file.filename}`,
        },
      });
      return res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  
  addWithImageKit: async (req, res) => {
    try {      
        const fileToString = req.file.buffer.toString('base64')
  
        const uploadFile = await imageKit.upload({
          fileName : req.file.originalname,
          file: fileToString  
        }); 

      const data = await prisma.image.create({
        data: {
          judul: req.body.judul,
          deskripsi: req.body.judul,
          image: uploadFile.url,
        },
      });
      return res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  uploadImage: async (req, res) => {
    try {
      const fileToString = req.file.buffer.toString('base64')

      const uploadFile = await imageKit.upload({
        fileName : req.file.originalname,
        file: fileToString  
      }); 
      return res.status(200).json({
        data : {
          name: uploadFile.name,
          url: uploadFile.url,
          type: uploadFile.type
        }
      })

    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  show : async (req, res) =>{
    try {
      const response = await prisma.image.findMany();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  showById : async (req, res) =>{
    try {
      const response = await prisma.image.findUnique({
        where:{
          id: Number(req.params.id),
        }
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  edit: async (req,res) => {
    try {
      const updateImage = await prisma.image.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          judul: req.body.judul,
          deskripsi: req.body.judul,
        },
      });
      return res.status(200).json({
        message : "data berhasil dihapus"
      });
    } catch (error) {      
      res.status(400).json({ msg: error.message });
    }
  },

  delete: async (req,res) => {
    try {
      const data = await prisma.image.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      if(!data) return res.status(404).json({message: "no data found"})
                                  
      //  hapus file ketika disimpan dilokal
      const filePath = `public/${data.image}`    
    if(fs.existsSync(filePath) ) fs.unlinkSync(filePath);  

      await prisma.image.delete({
        where: {  
          id: Number(req.params.id),
        },
      });
      return res.status(200).json({
        message : "data berhasil dihapus"
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }


};
