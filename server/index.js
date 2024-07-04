const express =require('express');
const mongoose =require('mongoose');
const userRoutes = require('./Routes/userRoute');
const postRoutes = require('./Routes/postRoute');
const requestRoutes  =require('./Routes/requestRoute');
const commentRoutes = require('./Routes/commentRoute');
const imageRoutes  = require('./Routes/imageRoute');
const bioRoutes  =require('./Routes/bioRoute');
const participationRoutes = require('./Routes/participationRoute');
const notificationRoutes  =require('./Routes/notificationRoute');
const upVoteRoutes  =require('./Routes/upVoteRouter');
const reportRoute = require('./Routes/reportRoute');

const cors = require('cors');
const bodyParser = require('body-parser');



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://Anique:20l-2171@nuromscluster.usyyi7d.mongodb.net/Nuroms');
  // await mongoose.connect('mongodb://localhost:27017/');
  console.log('db connected');
}


const server = express();
server.use(cors());
server.use(bodyParser.json());


server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

server.use(express.json());
server.use('/nuroms/user', userRoutes);
server.use('/nuroms/post', postRoutes);
server.use('/nuroms/comment', commentRoutes);
server.use('/nuroms/image/', imageRoutes);
server.use('/nuroms/request/', requestRoutes);
server.use('/nuroms/bio/', bioRoutes);
server.use('/nuroms/participation/',participationRoutes);
server.use('/nuroms/notification/', notificationRoutes);
server.use('/nuroms/up-votes/', upVoteRoutes);
server.use('/nuroms/report-it/', reportRoute);

server.listen(8080, ()=>{
    console.log('server started')
})