const Comment = require('../Models/commentModel');

exports.getAllComments = async (req, res) => {

    const PostId = req.params.postId;
    console.log("dd",PostId);
    try{

        const documents = await Comment.find({PostId}).sort({ Priority: 1 });
        res.status(201).json(documents);

    }catch (err) {
        res.status(400).json({ Error: err.message });
    }
  
}


exports.addComment = async (req,res)=>{

    try {
        let comment = new Comment();
        comment.CommenteeRoll =req.body.CommenteeRoll;
        comment.CommentText =req.body.CommentText;
        comment.Priority=req.body.Priority;
        comment.Status = req.body.Status;
        comment.PostId =req.body.PostId;
        if(comment.Badge) comment.Badge  =req.body.Badge;
        const doc =  await comment.save();
        console.log(doc);
        res.status(201).json(comment);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }
   
    // res.json(doc);
};