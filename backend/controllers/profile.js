const fs = require("fs");
const db = require("../models");
const User = db.user; 
const sharp = require("sharp");

require("dotenv").config();

const AllProfiles = async (req, res) => {
    try {
        User.findAll().then((users) => {
            let data = [];
            users?.map((item) => {
                data.push({
                    id:item.id,
                    username:item.username,
                    email:item.email,
                    accessToken:item.accessToken,
                    createdAt:item.createdAt,
                    updatedAt:item.updatedAt,
                    image:item.name ?'/images/'+item.name:null
            })
        })
            return res.send({status:1,message:'success',data:data});
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying to add user: ${error}`);
    }    
};
  
const profile = async (req, res) => {
    const id = req.params.id;
  
    try {
      User.findByPk(id).then((item) => {
        if(item){
        return res.send({
            id:item.id,
            username:item.username,
            email:item.email,
            accessToken:item.accessToken,
            createdAt:item.createdAt,
            updatedAt:item.updatedAt,
            image:item?.name ?'/images/'+item?.name:null
        });
        } else {
            return res.send({data:null,message:'No data found',status:1})
        }
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying to add Album: ${error}`);
    }
};
    
  const updateProfile = async (req, res) => {
    try {
      const id = req.params.id;
      let body = null;
      if(req.file){
        const buffer = fs.readFileSync(
          __basedir + "/assets/images/" + req.file.filename
        );
        await sharp(buffer)
          .webp({ quality: 20 })
          .toFile(__basedir + "/assets/images/" + req.file.filename);    
        body = {
            type: req.file.mimetype,
            name: req.file.originalname,
            username:req.body.username,
            email:req.body.email,
            data: buffer
        }
      } else {
        body = {
            email:req.body.email,
            username:req.body.username,
        }
      }
      console.log('BODY',body)
      User.update(body, {
        where: { id: id }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Profile was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying to update Profile: ${error}`);
    }
  };
  
  const deleteProfile = async (req, res) => {
    try {
      const id = req.params.id;
      User.destroy({
        where: { id: id }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Profile was deleted  successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Profile with id=${id}. Maybe Profile was not found or req.body is empty!`
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying to delete Album: ${error}`);
    }
  };
  
module.exports = {
    AllProfiles,
    profile,
    updateProfile,
    deleteProfile
};