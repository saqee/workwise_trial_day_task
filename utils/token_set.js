import jwt from "jsonwebtoken"

function token(id) {
  return jwt.sign(
    {
      id: id,
    },
    process.env.SECRET,
    { expiresIn: "5d" }
  )
}

export { token }
