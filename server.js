const express = require('express');
const  mongoose = require('mongoose');
const app = express()
const Blog = require('./models/blogModel')
app.use(express.json())

//Updating the blog content using  the Form we have to use express urlencoded
app.use(express.urlencoded({extended: false}))


//Adding our Routes
app.get('/', (req, res) => {
    res.send('Hello There, This is my Blog Node API')
})

app.get('/blog', (req, res) => {
    res.send('Welcome to my Blog')
})

app.get('/user', (req, res) => {
    res.send('Welcome to users dashboard')
})

//Fetching data from the database
app.get('/blog_data', async(req, res) =>{
    try{
        const blog = await Blog.find({});
        res.status(200).json(blog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Fetching blog data by id from the database
app.get('/blog_data/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Saving blog data into the database
app.post('/blog_data', async(req, res) => {
    //console.log(req.body);
    //res.send(req.body);
    try{
        const blog = await Blog.create(req.body);
        res.status(200).json(blog);
    }catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message})
        }
})

//Updating a blog in database Using JSON
app.put('/blog_data/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body);
        if(!blog){
            return res.status(404).json({message: `Cannot Find the Blog with this id: ${id}`})
        }
        const updatedBlog = await Blog.findById(id);
        res.status(200).json(updatedBlog);
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Deleting a blog with specified ID
app.delete('/blog_data/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).json({message: `Cannot find any a blog with ID ${id}`})
        }
        res.status(200).json(blog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://Illustre:illustre123@mynodeapi.yls10be.mongodb.net/Blog-Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(4455, ()=> {
        console.log('Blog API App is running on port 4455')
})
}).catch((error) => {
    console.log(error);
                               
})