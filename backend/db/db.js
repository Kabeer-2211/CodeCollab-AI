import mongoose from "mongoose";

function connect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("conntected to db");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connect;
