import express from "express"
import dotenv from "dotenv"

let app=express()
dotenv.config()


const port=process.env.PORT || 3000

app.listen(port,()=>{
console.log(`server started at ${port}`)
})