import mongoose from "mongoose"

function db() {
  try {
    mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
      },
      () => {
        console.log("db connect")
      }
    )
  } catch (error) {
    console.log(error.message)
  }
}

export { db }
