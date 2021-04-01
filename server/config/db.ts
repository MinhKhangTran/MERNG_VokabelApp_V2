import { connect } from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const connection = await connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(
      colors.bgGreen(`🤓 Verbunden mit der DB ${connection.connection.host} 🤓`)
    );
  } catch (error) {
    console.log(colors.bgRed.bold(`😩 Error: ${error} 😩`));
    process.exit(1);
  }
};
