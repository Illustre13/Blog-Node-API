
const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');

chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl  = 'https://ith-mybrand-backend.onrender.com/blog';
describe('Testing Blog End Points', () => {
  it('should return a 200 status code for a valid request', (done) => {
    chai.request(baseUrl)
      .get('/blogs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return a 404 status code for an invalid request', (done) => {
    chai.request(baseUrl)
      .get('/bloggger')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
 
  it('should return a 200 status code for getting all blogs successfully', (done) => {
    chai.request(baseUrl)
      .get('/blog')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return a 200 status code for getting blog by id successfully', (done) => {
    chai.request(baseUrl)
      .get('/blog/641077749a36a7b4ff669adc')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })


  it('should return a 200 status code for creating a new blog successfully', async() => {
    const res = await chai.request(baseUrl)
       .post('/create_blog')
       .send({
         title: 'Jest Testing QWERTY',
         category: 'Testing_QWERTY',
           email: 'testuser_QWERTY@example.com',
           image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
           content: 'Jest Testing QWERTY, Jest Testing, Jest Testing, Jest Testing, Jest Testing, ',
           role: 'user'
       });
  
         expect(res).to.have.status(200);
       
   });

   it('should return a 200 status code for updating the blog successfully', async() => {
    const res = await chai.request(baseUrl)
       .put('/update_blog/640f3a976f08e7d7eb0e23ce')
       .send({
         title: 'Standup Updated_QWERTY',
         content: 'Jest Testing Updated, Jest Testing Updated, Jest Testing Updated, Jest Testing Updated, Jest Testing Updated'
       });
  
         expect(res).to.have.status(200);
       
   });

   it('should return a 200 status code for deleting the blog successfully', (done) => {
    chai.request(baseUrl)
      .delete('/delete_blog/641985617eeef1998fa9055d')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  



  
});


describe('Testing User End Points', () => {

    it('should return a 200 status code for a valid request on User Endpoint', (done) => {
        chai.request(baseUrl)
          .get('/users')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    
      it('should return a 404 status code for an invalid request on User Endpoint', (done) => {
        chai.request(baseUrl)
          .get('/users_account')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
     
      it('should return a 200 status code for getting all users successfully', (done) => {
        chai.request(baseUrl)
          .get('/user')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    
      it('should return a 200 status code for getting blog by id successfully', (done) => {
        chai.request(baseUrl)
          .get('/user/64132604cea21ef58d9558f9')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    
    

    it('should return a 200 status code for creating a new user successfully', async() => {
        const res = await chai.request(baseUrl)
           .post('/save_user')
           .send({
               username: 'testuser_QWERTY',
               email: 'testuser_QWERTY@example.com',
               password: 'testpassword',
               rePassword: 'testpassword',
               role: 'User'
           });
             expect(res).to.have.status(200);  
       });

       it('should return a 200 status code for updating the user successfully', async() => {
        const res = await chai.request(baseUrl)
           .put('/update_user/6419b0dee3210c933aef293e')
           .send({
             username: 'testuserUpdatedQWERTY'
           });
      
             expect(res).to.have.status(200);
           
       });

       it('should return a 200 status code for deleting the user successfully', (done) => {
        chai.request(baseUrl)
          .delete('/delete_user/6419b1de2be834a659a0c948')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });


      it('should return a 200 status code for user signup', async() => {
        const res = await chai.request(baseUrl)
           .post('/signup')
           .send({
               username: 'signup001',
               email: 'signup_001@example.com',
               password: 'signup001',
               rePassword: 'signup001',
               role: 'User'
           });
             expect(res).to.have.status(200);  
       });

       it('should return a 400 status code for user signup error encounter', async() => {
        const res = await chai.request(baseUrl)
           .post('/signup')
           .send({
               username: 'testuser001',
               email: 'testuser_001@example.com',
               password: 'testpassword001'
           });
             expect(res).to.have.status(400);  
       });

       it('should return a 409 status code at the signup if the email already exist', async() => {
        const res = await chai.request(baseUrl)
           .post('/signup')
           .send({
               username: 'testuser',
               email: 'testuser@example.com',
               password: 'testpassword',
               rePassword: 'testpassword',
               role: 'User'
           });
             expect(res).to.have.status(409);  
       });

       it('should return a 401 status code for the email or password are incorrect', async() => {
        const res = await chai.request(baseUrl)
           .post('/signin')
           .send({
               email: 'tesser@example.com',
               password: 'testpassword78'
           });
             expect(res).to.have.status(401);  
       });


  });
  