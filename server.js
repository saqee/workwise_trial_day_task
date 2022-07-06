import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"
import articleRoutes from "./routes/articleRoutes.js"

import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
const app = express()
dotenv.config()
export let mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.password,
  database: "ArticleDb",
})

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("db connect")
  } else {
    console.log(err)
  }
})

app.use(express.json())
app.use("/api/articles", articleRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(process.env.PORT, () => {
  console.log("server on")
})
