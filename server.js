const express = require('express');
const  mongoose = require('mongoose');
const app = express()
const Blog = require('./models/blogModel')
const User = require('./models/userModel')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const {validateSignup} = require('./joiValidator');
const {validateSignin} = require('./joiValidator');

// Define the JWT secret
const jwtSecret = 'my-secret';



const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

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
//Signup API
// Define the sign up API
app.post('/signup', async (req, res) => {
    // Validate the request body
    const { error } = validateSignup(req.body);
    if (error) {
        console.log(error);
      return res.status(400).json({ message: error.details[0].message });
    }
     // Check if the user already exists
  const user_email = await User.findOne({ email: req.body.email });
  if (user_email) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }
   // Create a new user
   const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  await newUser.save();

  res.json({ message: 'USer Signed UP Successfully!' });
});

//End of Signup 
// Define the sign in API
app.post('/signin', async (req, res) => {
    // Validate the request body
    
    const { error } = validateSignin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Check if the password is correct
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if(user.role == "Admin"){
        res.status(200).json({message: 'Welcome Admin, Successfully Signed In!'});
        //res.json({ message: 'Welcome Admin, Successfully Signed In!' });
    }else{
        res.status(200).json({message: 'Welcome, Signed In Successfully!'});
       // res.json({ message: 'Welcome, Signed In Successfully!' });
    }

})
    //End of Signin Section


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

//Swagger Options 
const options = {
    definition: {
        openapi: "3.0.0",
        info: {

            title: "My Blog API",
            verison: "1.0.0",
            description: "My Blog CRUD operation API for the blogs and users"
        }, 
        servers: [
            {
                url: "http://localhost:4455"
            },
        ],  
              
        
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }))
//End of Swagger Options

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