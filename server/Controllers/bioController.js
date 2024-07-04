const Bio = require('../Models/bioModel');


exports.addBio = async (req,res)=>{

    try {
        let bio = new Bio();
        bio.BioText =req.body.BioText;
        bio.Campus  =req.body.Campus;
        bio.UserId  =req.body.UserId;
        bio.Semester  =req.body.Semester;
        bio.Years = req.body.Years;
        bio.Degree = req.body.Degree;
        bio.UserType = req.body.UserType;
        
        const doc =  await bio.save();
        console.log(doc);
        res.status(201).json(bio);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }
};



exports.getBioById = async (req, res) => {

    const UserId = req.params.id;
    const documents = await Bio.findOne({UserId});
    res.status(201).json(documents);
  
  }

exports.updateBio= async (req,res)=>{
    try {
        let bio = new Bio();
        bio.BioText =req.body.BioText;
        bio.Campus  =req.body.Campus;
        bio.UserId  =req.body.UserId;
        bio.Semester  =req.body.Semester;
        bio.Degree = req.body.Degree;
        bio.UserType = req.body.UserType;
        bio.Years = req.body.Years;

        const doc =  await Bio.updateOne({UserId : req.body.UserId},
            {Campus : req.body.Campus,
             Semester : req.body.Semester,
             Years : req.body.Years,
             BioText : req.body.BioText,
             Degree : req.body.Degree,
             UserType : req.body.UserType
            },
            );
        console.log(doc);
        res.status(201).json(doc);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }


};
