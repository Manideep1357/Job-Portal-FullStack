import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://manideep:manideep@93@cluster0.3s3jdh8.mongodb.net/?appName=Cluster0");
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;