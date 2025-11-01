import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const mongoURL = process.env.MONGODB_URI;

declare global{
    var mongooseCache:{
        conn : typeof mongoose | null;
        promise : Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if(!cached){
    cached = global.mongooseCache = {conn:null,promise:null}
}

export const connectToDatabase = async()=>{
    if(!mongoURL) throw new Error("MONGODB_URL  must be set within .env");

    if(cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(mongoURL,{bufferCommands:false})
    }
    try{
        cached.conn = await cached.promise;
    }catch(err){
        cached.promise = null;
        throw err;
    }
    return cached.conn
}