require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const { router } = require("./routes")
const app = express()
const PORT = process.env.PORT || 3000

// app.use(morgan("tiny"))
app.use(express.json())
app.use(morgan("tiny"))

app.use("/api/v1/", router)

app.listen(PORT, () => console.log(`Servidor levantado en puerto ${PORT}`))
