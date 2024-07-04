const Report = require('../Models/reportModel');


// exports.deleteUpvotesbyId= async (req, res) => {
//     const postId = req.params.id;
//     UpVote.deleteOne({postId : req.params.id, voterId : req.params.voter})
//       .then(upvotes => {
//         if (!upvotes) {
//           res.status(404).send({Error: 'No Upvotes'});
//         } else {
//           res.status(200).send(upvotes);
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         res.status(500).send({ Error : 'Error getting UpVotes'});
//       });
// }



exports.fileReport = async (req,res)=>{

    try {
    let report = new Report();
    report.reporterId = req.body.reporterId;
    report.victimId = req.body.victimId;
    report.reportType  =req.body.reportType;
    if(req.body.postId)
    report.postId = req.body.postId;
    const doc =  await report.save();
    console.log(doc);
    res.status(201).json(report);
    } 
    
    catch (err) {
        res.status(400).json({ Error: err.message });
    }

};



