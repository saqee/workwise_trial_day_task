import asyncHandler from "express-async-handler"
import { token } from "../utils/token_set.js"
import { mysqlConnection } from "../server.js"
import validator from "validator"
export const createArticle = asyncHandler((req, res) => {
  let sql = `INSERT INTO article(user_name, author, description,creationDate,publicationDate,tags) VALUES (?, ?, ?,?,?,?)`
  let values = [
    req.body.user_name,
    req.body.author,
    req.body.description,
    new Date(),
    parseInt(req.body.publicationDate),
    req.body.tags,
  ]
  if (
    validator.isEmpty(req.body.user_name) ||
    validator.isEmpty(req.body.author) ||
    validator.isEmpty(req.body.description)
  ) {
    throw new Error("all fields required")
  } else {
    mysqlConnection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json(result)
      }
    })
  }
})

export const getArticle = asyncHandler((req, res) => {
  let query = "SELECT * from article"
  const currentDate = Date.now()
  mysqlConnection.query(query, (err, result) => {
    let newResult = result.filter((item) => {
      return item.creationDate <= currentDate
    })
    res.json(newResult)
  })
})

export const getProductByAuthor = asyncHandler((req, res) => {
  let query = "SELECT * from article"
  let searchKey = req.params.authorName.toString()
  mysqlConnection.query(query, (err, result) => {
    let newResult = result.filter((item) => {
      return item.author == searchKey || item.tags == searchKey
    })
    res.json(newResult)
  })
})

export const getUpdateArticle = asyncHandler((req, res) => {
  const id = parseInt(req.params.id)
  let product = req.body
  let sql = `UPDATE article set user_name=?,author=?,description=? WHERE id=?`
  mysqlConnection.query(
    sql,
    [product.user_name, product.author, product.description, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json(result)
      }
    }
  )
})

export const deleteArticle = asyncHandler((req, res) => {
  const id = parseInt(req.params.id)
  let sql = `DELETE from article WHERE id=?`
  mysqlConnection.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json("deleted")
    }
  })
})
