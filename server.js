const express = require('express');
const  mongoose = require('mongoose');
const app = express()
const Blog = require('./models/blogModel')
const User = require('./models/userModel')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const {validateSignup} = require('./joiValidator');
const {validateSignin} = require('./joiValidator');
const connectDb = require("./db");
const bcrypt = require('bcrypt');
const {signAccessToken} = require('./routes/jwt_file')
const { verifyAccessToken } = require('./routes/jwt_file')
const axios = require('axios');
// Define the JWT secret
const jwtSecret = 'my-secret';

const cors = require("cors");

const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

app.use(express.json())

//Updating the blog content using  the Form we have to use express urlencoded
app.use(express.urlencoded({extended: false}))

//cors on server side

//Adding our Routes
//const header = new Headers({ "Access-Control-Allow-Origin": "*" });


// Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "https:");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
  
app.use(cors());

//Adding our Routes
app.get('/', (req, res) => {
    const welcomeMessage = `
    Hello there!<br><br>

    Welcome to my Blog API. Here are some links you might find useful:<br>
    - Blog Path Test : <a href="https://ith-mybrand-backend.onrender.com/blogs/"> Here.</a><br>
    - User Path Test : <a href="https://ith-mybrand-backend.onrender.com/users/"> Here.</a><br>
    - Blogs List in JSON format : <a href="https://ith-mybrand-backend.onrender.com/blog/"> Here.</a><br>
    - Users List in JSON format : <a href="https://ith-mybrand-backend.onrender.com/user/"> Here.</a><br>
    - Swagger Documentation : <a href="https://ith-mybrand-backend.onrender.com/api-docs/"> Here.</a><br>
    - *********************************************<br>
    - ** My Brand Frontend can be Accessed here : <a href="https://ith-mybrand.netlify.app/index.html"> Here.</a> **<br>
    - *********************************************<br>
    Thank you for using my API!<br>
  `;
  res.send(welcomeMessage);
})

app.get('/blogs', (req, res) => {
    res.send('Welcome to my Blog')
})

app.get('/users', (req, res) => {
    res.send('Welcome to users dashboard')
})

//Fetching data from the database
app.get('/blog', async(req, res) =>{
    try{
        const blog = await Blog.find({});
        res.status(200).json(blog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Fetching blog data by id from the database
app.get('/blog/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})
//Saving blog data into the database
app.post('/create_blog', async(req, res) => {
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
app.put('/update_blog/:id', async(req, res) =>{
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
app.delete('/delete_blog/:id', async(req, res) => {
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
app.get('/user', async(req, res) =>{
    
    try{
        const user = await User.find({});
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Fetching user data by id from the database
app.get('/user/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Saving user data into the database
app.post('/save_user', async(req, res) => {
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
app.put('/update_user/:id', async(req, res) =>{
    
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return res.status(401).send({ error: 'Unauthorized, No Token Available' })
        
        const payload = await verifyAccessToken(token)
        console.log(payload.role)
        if (payload.role !== 'Admin') return res.status(401).send({ error: 'Unauthorized, You do not have Privilege to do this task' })

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
app.delete('/delete_user/:id', async(req, res) => {
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

//Signup API USers
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
  // Hash the password with bcrypt
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const hashedrePassword = await bcrypt.hash(req.body.rePassword, 10);
   // Create a new user
   const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    rePassword: hashedrePassword,
    role: req.body.role,
  });

await newUser.save();


  //res.body({ message: 'USer Signed UP Successfully!' });


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
      return res.status(401).json({ message: 'Email not found, Please Signup first!!' });
    }
  
    // Check if the password is correct
     // Compare the password with the hashed password using bcrypt
     const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Your password is not correct!!' });
    }
    const accessToken = await signAccessToken(user.email, user.role)
    if(user.role == "Admin"){
       // res.status(200).json({message: 'Welcome Admin, Successfully Signed In!'});
        //res.json({ message: 'Welcome Admin, Successfully Signed In!' });
        res.send(accessToken)
//        req.session['jwt_token'] = accessToken
    }else{
        
      //  res.status(200).json({message: 'Welcome, Signed In Successfully!'});
        res.send(accessToken)
      //  req.session['jwt_token'] = accessToken
       // res.json({ message: 'Welcome, Signed In Successfully!' });
    }
   

})
    //End of Signin Section



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
        server: [
            {
                url: "https://ith-mybrand-backend.onrender.com"
            },
        ],  
              
        
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }))
//End of Swagger Options

//Function to Connect to the database
if(connectDb()){
    app.listen(4455, ()=> {
        console.log('Blog API App is running on port 4455')
    })
}
