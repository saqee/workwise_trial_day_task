import express from "express"
import {
  createArticle,
  getArticle,
  getUpdateArticle,
  deleteArticle,
  getProductByAuthor,
} from "../controllers/articleController.js"

const router = express.Router()

router.post("/", createArticle)
router.get("/", getArticle)
router.get("/:authorName", getProductByAuthor)
router.put("/:id", getUpdateArticle)
router.delete("/:id", deleteArticle)
export default router
