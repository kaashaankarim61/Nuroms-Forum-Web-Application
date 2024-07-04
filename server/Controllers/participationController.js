const Participation = require('../Models/participationModel');

exports.getAllParticipationByRequestId = async (req, res) => {
    const reqId = req.params.id;
    Participation.find({reqId})
      .then(participations => {
        if (!participations) {
          res.status(404).send({Error: 'No participation For This Request'});
        } else {
          res.status(200).send(participations);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send({ Error : 'Error getting Participations'});
      });
}

exports.participate= async (req,res)=>{

    try {
        let participation = new Participation();
        participation.reqId =req.body.reqId;
        participation.participantId=req.body.participantId;
        const doc =  await participation.save();
        console.log(doc);
        res.status(201).json(participation);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }

};



