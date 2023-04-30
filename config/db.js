import mongoose from "mongoose"

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
export const connectDb = async () => {
    const con = await mongoose.connect(process.env.MONGO_DB_URL, connectionParams)
    console.log(`Connected to db on ${con.connection.host}`.cyan.underline.bold)
}