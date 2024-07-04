const Image = require('../Models/ImageModel');


exports.addImage = async (req,res)=>{

    try {
        let image = new Image();
        image.Image =req.body.base64;
        image.ImgHolder = req.body.imgHolder;
        const doc =  await image.save();
        console.log(doc);
        res.status(201).json(image);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }

};


exports.updateImage = async (req,res)=>{
    try {
        let image = new Image();
        image.Image =req.body.base64;
        image.ImgHolder = req.body.imgHolder;
        const doc =  await Image.updateOne({ImgHolder: req.body.imgHolder},
                { Image : req.body.base64 }
            );
        console.log(doc);
        res.status(201).json(doc);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }


};




exports.getImage= async (req, res) => {
    const ImgHolder = req.params.id;
    console.log("image = ", ImgHolder);


    try{
        const documents = await Image.findOne({ ImgHolder: ImgHolder });
        res.status(201).json(documents);
    }
    catch (err) {
        res.status(400).json({ Error: err.message });
    }
  
}

