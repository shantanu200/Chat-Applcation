import mongoose from "mongoose";
import colors from "colors";

const url = `mongodb://localhost:27017/localChatApp`

async function connectdb(){
    await mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => {
        console.log(`MongoDB is connected :: ChatApp`.cyan.bgGreen.underline);
    }).catch((error) => {
        console.log(`Error :: ${error}`.red.bold);
    })
}

export default connectdb;