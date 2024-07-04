const Post = require('../Models/postModel');

exports.getAllPosts = async (req, res) => {
  const documents = await Post.find().sort({ Priority: -1 });
  res.status(201).json(documents);

}


exports.addPost = async (req,res)=>{

    try {
        let post = new Post();
        post.AuthorRoll =req.body.AuthorRoll;
        post.PostText =req.body.PostText;
        post.Priority=req.body.Priority;
        post.Status = req.body.Status;
        post.Date  =req.body.Date;
        if(post.Badge) post.Badge  =req.body.Badge;
        const doc =  await post.save();
        console.log(doc);
        res.status(201).json(post);

      } catch (err) {
        res.status(400).json({ Error: err.message });
      }
   
    // res.json(doc);
};