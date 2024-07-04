const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();

app.use(express.json()); // allows to pass json through node.js

// we establish connection with the db
mongoose.connect('mongodb+srv://lukealavez:Luke201204.@backend-crud-api.9jezsef.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=Backend-CRUD-API')
  .then(() => { 
    console.log('Connected to the database!');
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
  });

// simple example of a get request to the server
app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});

// show the products of the db
app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// push products to the db
app.post('/api/products', async (req, res) => {
    try{
        const products = await Product.create(req.body);
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// get specific product by id
app.get('/api/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product){ // if the given id doens't exists
            res.status(404).json({message: "Product not found"});
        }
        else{
            res.status(200).json(product);
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// update a specific product based on the id (put request)
app.put('/api/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body); // findById and findByIdAndUpdate are mongoose functions

        if(!product){ // if the given id doens't exists
            res.status(404).json({message: "Product not found"});
        }
        else{
            const updatedProduct = await Product.findById(id);
            res.status(200).json(updatedProduct);
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// delete a product based on the id
app.delete('/api/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){ // if the given id doens't exists
            res.status(404).json({message: "Product not found"});
        }
        else{
            res.status(200).json({message: "Product deleted succesfully"});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});