const config = require("./config")
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.models.js')
const app = express()

app.use(express.json())

app.get('/', (req, res)=> {
    res.send('hello from node api server updated')
});

app.get("/api/products", async (req,res)=>{
    try{
        const product = await Product.find({})
        res.status(201).json(product)
    }
    catch(error){
        res.status(500).jason({message: error.message})

    }
})
app.get("/api/products/:id", async (req, res)=>{
    try{
        const id = req.params.id
        const product = await Product.findById(id)
        res.status(201).json(product)

    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.post("/api/products", async (req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(201).json(product)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
    // console.log(req.body)
    // res.send(req.body)
})

//update an api

app.put("/api/products/:id", async (req, res)=>{
    try{

        const { id } = req.params

        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product){
            return res.status(404).json({message: "Product Not Found"})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    }catch(error){
        res.status(500).json({error:error.message})

    }
})

//delete a Product

app.delete("/api/products/:id", async (req, res)=>{
    try{
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        if(product != null){
            res.status(200).json("Success")
        }
        else {
            res.status(404).json("does not exist")
        }

    }catch(error){
        res.status(500).json({message:error.message});
    }
})

mongoose.connect(`mongodb+srv://krishank:${config.password}@node-practice.zdyab6n.mongodb.net/?retryWrites=true&w=majority&appName=node-practice`)
  .then(() => {
    console.log('Connected to the data base')
    app.listen(3000, ()=> {
        console.log('server is running on port 3000');
    });
})
.catch(() => {
    console.log('Connection failed ')
})


