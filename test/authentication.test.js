
const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');

chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl  = 'https://ith-mybrand-backend.onrender.com';
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
      .get('/blog/6420a9354f718aadf2ea78bd')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })


  it('should return a 200 status code for creating a new blog successfully', async() => {
    const res = await chai.request(baseUrl)
       .post('/create_blog')
       .send({
         title: 'Test Cases',
         category: 'Programming',
           email: 'testcases@gmail.com',
           image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
           content: 'Test Cases'
       });
  
         expect(res).to.have.status(200);
       
   });

   it('should return a 200 status code for updating the blog successfully', async() => {
    const res = await chai.request(baseUrl)
       .put('/update_blog/6420a9354f718aadf2ea78bd')
       .send({
         title: 'Gael Test Cases',
         content: 'Gael Updated Test passed'
       });
  
         expect(res).to.have.status(200);
       
   });

   it('should return a 200 status code for deleting the blog successfully', (done) => {
    chai.request(baseUrl)
      .delete('/delete_blog/6419b1f74c8e78488252f409')
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
    
      it('should return a 200 status code for getting user by id successfully', (done) => {
        chai.request(baseUrl)
          .get('/user/641dc0756aeae2451ea69842')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    
    

    it('should return a 200 status code for creating a new user successfully', async() => {
        const res = await chai.request(baseUrl)
           .post('/save_user')
           .send({
               username: 'NewTestCase',
               email: 'newTestCase@gmail.com',
               password: 'testcase',
               rePassword: 'testcase',
               role: 'User'
           });
             expect(res).to.have.status(200);  
       });

       it('should return a 200 status code for updating the user successfully', async() => {
        const res = await chai.request(baseUrl)
           .put('/update_user/64216b9545e134b728aedf7e')
           .send({
             username: 'NewTestCaseUpdated'
           });
      
             expect(res).to.have.status(200);
           
       });

       it('should return a 200 status code for deleting the user successfully', (done) => {
        chai.request(baseUrl)
          .delete('/delete_user/64216b5045e134b728aedf70')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });


      it('should return a 200 status code for user signup', async() => {
        const res = await chai.request(baseUrl)
           .post('/signup')
           .send({
               username: 'patrick',
               email: 'patrickM@gmail.com',
               password: 'patrick123',
               rePassword: 'patrick123',
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
               username: 'Alain',
               email: 'alain@gmail.com',
               password: 'alain123',
               rePassword: 'alain123',
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
  