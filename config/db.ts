import mongoose from 'mongoose';
const dbConnection = () => {
    mongoose.connect(process.env.DB!)
  .then(()=>{
  console.log(`mongodb connected from ${process.env.DB}`);
}).catch((err) => {
  console.log(err);
})
}
export default dbConnection;