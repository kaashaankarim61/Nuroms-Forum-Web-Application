const Request = require('../Models/requestModel');
const Participation = require('../Models/participationModel');

// exports.getAllRequest = async (req, res) => {
//     const filter = {
//         Topic: 'Mathematics',
//       };

//   const documents = await Request.find(filter);
//   res.status(201).json(documents);
// }



exports.deleteRequestbyId= async (req, res) => {
  Request.deleteOne({_id : req.params.id})
    .then(reqs => {
      if (!reqs) {
        res.status(404).send({Error: 'No Upvotes'});
      } else {
        res.status(200).send(reqs);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send({ Error : 'Error getting UpVotes'});
    });
}


exports.getAllRequest = async (req, res) => {
const documents = await Request.find();
res.status(201).json(documents);
}

exports.getAllRequestByInstructor = async (req, res) => {
  const _id = req.params.id;
  const filter = {
            Instructor:_id,
          };
  const documents = await Request.find(filter);
  console.log(documents);
  res.status(201).json(documents);
}
  

exports.getAllRequestByOwner = async (req, res) => {
  const _id = req.params.id;
  const filter = {
            RequestOwner: _id,
          };
  const documents = await Request.find(filter);
  console.log(documents);
  res.status(201).json(documents);
}


exports.getAllPublicSessionParticipationRequest = async (req, res) => {
  const filter = {
            Visibility: 0,
            Status: "Active"
          };
  const documents = await Request.find(filter);
  console.log(documents);
  res.status(201).json(documents);
}


exports.getAllPublicInstructoringRequest = async (req, res) => {
  const filter = {
              Visibility: 0,
              Instructor: "All",
              Status:"InActive"
          };
  const documents = await Request.find(filter);
  console.log(documents);
  res.status(201).json(documents);
}


exports.getClosedRequest = async (req, res) => {

  const filter = {
              Status:"Closed"
          };
  const ClosedReqs = await Request.find(filter);
  console.log("Reqs =>",ClosedReqs);
  
  console.log("*****************************");


  const filter2 = {
    participantId: req.params.id,
  };
  const parti = await Participation.find(filter2);
  console.log("Parti=>",parti);
  console.log("*****************************");


  const filteredData = [];
  parti.forEach(p => {
    const foundItem = ClosedReqs.find(item => item._id == p.reqId);
    if (foundItem) {
      filteredData.push(foundItem);
    }
  });
  console.log("*****************************");
  console.log(filteredData);
  res.status(201).json(filteredData);
}



exports.updateRequestPrice= async (req,res)=>{
  try {
      const doc =  await Request.updateOne({_id : req.body.id},
          {
           BiddingPrice : req.body.BiddingPrice,
          },
          );
      console.log(doc);
      res.status(201).json(doc);

    } catch (err) {
      res.status(400).json({ Error: err.message });
    }
};



exports.updateRequestStatusAndInstructor= async (req,res)=>{
  try {
      const doc =  await Request.updateOne({_id : req.body.id},
          {
           Status : req.body.Status,
           Instructor : req.body.Instructor,
          },
          );
      console.log(doc);
      res.status(201).json(doc);

    } catch (err) {
      res.status(400).json({ Error: err.message });
    }
};


exports.updateRequestClosed= async (req,res)=>{
  try {
      const doc =  await Request.updateOne({_id : req.params.id},
      {
          Status : "Closed"
          
      },
      );
      console.log(doc);
      res.status(201).json(doc);

    } catch (err) {
      res.status(400).json({ Error: err.message });
    }
};



exports.addRequest = async (req,res)=>{
    try {
        let request = new Request();
        request.RequestOwner =req.body.RequestOwner;
        request.Instructor  =req.body.Instructor;
        request.BiddingPrice  =req.body.BiddingPrice ;
        request.Duration = req.body.Duration;
        request.DateCreated = req.body.DateCreated;
        request.ClosingDate  =req.body.ClosingDate;
        request.SessionType =req.body.SessionType;
        request.Visibility=req.body.Visibility;
        request.Topic = req.body.Topic;
        request.Course = req.body.Course;
        request.Brief =req.body.Brief;
        request.Status = req.body.Status;
        const doc =  await request.save();
        console.log(doc);
        res.status(201).json(request);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }

};



