const express = require('express');
const  mongoose = require('mongoose');
const app = express()
const Blog = require('./models/blogModel')
const User = require('./models/userModel')
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


/* Starting of the User Route Section */
//Fetching User data from the database
app.get('/user_data', async(req, res) =>{
    try{
        const user = await User.find({});
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Fetching user data by id from the database
app.get('/user_data/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Saving user data into the database
app.post('/user_data', async(req, res) => {
    //console.log(req.body);
    //res.send(req.body);
    try{
        const user = await User.create(req.body);
        res.status(200).json(user);
    }catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message})
        }
})

//Updating a user in database Using JSON
app.put('/user_data/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            return res.status(404).json({message: `Cannot Find the User with this id: ${id}`})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Deleting a user with specified ID
app.delete('/user_data/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `Cannot find any a user with ID ${id}`})
        }
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

/* End of the User route section*/

//Connecting to MongoDB 
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