const Notification = require('../Models/notificationModel');
const Participation =require('../Models/participationModel');


exports.getAllNotificationByRecieverId= async (req, res) => {
    const RecieverId = req.params.id;
    Notification.find({RecieverId}).sort({Priority : -1})
      .then(noti => {
        if (!noti) {
          res.status(404).send({Error: 'No Notification'});
        } else {
          res.status(200).send(noti);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send({ Error : 'Error getting Notifications'});
      });
}

exports.notify= async (req,res)=>{

    try {
        let notification = new Notification();
        notification.RecieverId =req.body.recieverId;
        notification.SenderId =req.body.senderId;
        notification.MeetingLink =req.body.meetingLink;
        notification.MeetingTime =req.body.meetingTime;
        notification.MeetingDate =req.body.meetingDate;
        notification.CoachingTopic =req.body.coachingTopic;
        notification.CoachingId =req.body.coachingId;
        notification.Text =req.body.text;
        const doc =  await notification.save();
        console.log(doc);
        res.status(201).json(notification);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }

};



exports.notifytoallaboutlink= async (req,res)=>{
  const reqId = req.params.id;
  Participation.find({reqId})
    .then(participations => {
      if (!participations) {
        res.status(404).send({Error: 'No participation For This Request'});
      } else {
        participations.forEach(participantion => {
            try {
              let notification = new Notification();
              notification.RecieverId =participantion.participantId;
              notification.SenderId =req.body.senderId;
              notification.MeetingLink =req.body.meetingLink;
              notification.MeetingTime =req.body.meetingTime;
              notification.MeetingDate =req.body.meetingDate;
              notification.CoachingTopic =req.body.coachingTopic;
              notification.CoachingId =req.body.coachingId;
              notification.Text =req.body.text;
              const doc =  notification.save();
              console.log(doc);
            
            } catch (err) {
              res.status(400).json({ Error: err.message });
            }
        });

        res.status(200).send(participations);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send({ Error : 'Error getting Participations'});
    });

};




