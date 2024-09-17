import mongoose from "mongoose";

const INDEXdb = async (req, res) => {
  try {
    const ConnectionInstance = await mongoose.connect(process.env.MONG_URI);
    console.log(
      "N -CONNECTED TO MONGOdB FROM INDEXdb",
      ConnectionInstance.connection.host
    );
  } catch (error) {
    console.log("Database Not Connected");
    process.exit(1);
  }
};

export default INDEXdb;
