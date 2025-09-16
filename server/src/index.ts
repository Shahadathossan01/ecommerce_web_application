import dotenv from "dotenv";
import http from "http";
import app from "./app";
import connectDB from "./db";
import removeUnverifiedAccounts from "./utils/removeUnverifiedAccount";

dotenv.config();
const port = process.env.PORT || 4000;
const serve = http.createServer(app);

const main = async () => {
  try {
    await connectDB();
    serve.listen(port, async () => {
      console.log(`Server is running: ${port}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

removeUnverifiedAccounts();
main();
