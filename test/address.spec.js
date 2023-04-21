// /* eslint-disable no-undef */
// const chai = require('chai');
// const chaiSubset = require('chai-subset');
// chai.use(chaiSubset);
// const expect  =chai.expect;
// const casual = require('casual');
// const clientAddress = require('../src/client/address');
// const clientAuth = require('../src/client/auth');
// const { User } = require('../src/users/user'); 

// describe.skip('Test address endpoints', () => {
//   let token;
//   beforeEach(async () => {
//     // Login as  Olsen  X
//     const reqBody = {
//       email: 'Olsen.X@gmail.com',
//       password: 'Password1'
//     };
//     try {
//       const response = await clientAuth.login(reqBody);
//       token = response.body.token;
//     } catch (error) {
//       console.error(error.message);
//     }
//   });
    
//   it('should add address to user', async () => {
//     const { street, city, state } = casual;
//     const zip = casual.zip(5);
//     const addressOpt = {
//       isDefault: true,
//       address: street,
//       city: city,
//       state: state,
//       country: 'US',
//       zipCode: zip,
//     };
//     let response;
//     const opts = {
//       token,
//       address: addressOpt
//     };
//     try {
//       response = await clientAddress.addAddress(opts);
//     } catch(err) {
//       console.log(err.message);
//     }
//     expect(response.body).to.containSubset({
//       success: true,
//       message: 'Address has been added successfully!',
//       address: {
//         isDefault: true,
//         address: street,
//         city: city,
//         state: state,
//         country: 'US',
//         zipCode: zip,
//         user: '6434b87a3ea9a80035112c5f',
//         __v: 0
//       }
//     });
//   });
//   it('should register user', async() => {
//     const opts = {
//       'email': 'user111111111111@email.com',
//       'firstName': 'Harold',
//       'lastName': 'Olsen',
//       'password': 'Password1'
//     };
//     let response;
//     try {
//       response = await clientAuth.register(opts);
//     } catch(err) {
//       console.log(err);
//     }
//     console.log(response);
//   });
//   it.only('should create a User', async() => {
//     const user = await User.createUser();
//     await user.addAddress();
//   });
    
// });