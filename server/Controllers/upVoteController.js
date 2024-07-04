const UpVote = require('../Models/upvoteModel');



exports.getAllUpvotesbyId= async (req, res) => {
    const postId = req.params.id;
    UpVote.find({postId})
      .then(upvotes => {
        if (!upvotes) {
          res.status(404).send({Error: 'No Upvotes'});
        } else {
          res.status(200).send(upvotes);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send({ Error : 'Error getting UpVotes'});
      });
}


exports.deleteUpvotesbyId= async (req, res) => {
    const postId = req.params.id;
    UpVote.deleteOne({postId : req.params.id, voterId : req.params.voter})
      .then(upvotes => {
        if (!upvotes) {
          res.status(404).send({Error: 'No Upvotes'});
        } else {
          res.status(200).send(upvotes);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send({ Error : 'Error getting UpVotes'});
      });
}


exports.addUpVote= async (req,res)=>{

    try {
        let upvote = new UpVote();
        upvote.postId =req.body.postId;
        upvote.voterId = req.body.voterId;
        const doc =  await upvote.save();
        console.log(doc);
        res.status(201).json(upvote);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }

};



