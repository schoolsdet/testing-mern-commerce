const chai = require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
const expect  =chai.expect;
const casual = require('casual');
const superagent = require('superagent');

const baseUrl = "https://mern-ecommerce.sdet.school/api";

describe("Test address endpoints", ()=> {
    let token;
    beforeEach(async ()=> {
        // Login as  Olsen  X
        const reqBody = {
            email: "Olsen.X@gmail.com",
            password: "Password1"
          }
          try {
            const response = await superagent.post(baseUrl+"/auth/login").send(reqBody);
            token = response.body.token;
          } catch (error) {
            console.log("catch?")
            console.error(error.message);
          }
    });
    
    it("should add address to user",async () =>{
        const {street,city,state} = casual;
        // const street = casual.street;
        // const city = casual.city;
        // const state = casual.state;
        const zip = casual.zip(5)
        const addressOpt = {
          isDefault: true,
          address: street,
          city: city,
          state: state,
          country: "US",
          zipCode: zip,
        }
        let response
        try {
          response = await superagent.post(baseUrl+"/address/add")
          .set({
              Authorization: token
            })
            .send(addressOpt)
        } catch(err){
          console.log(err.message)
        }
        expect(response.body).to.containSubset({
          success: true,
          message: 'Address has been added successfully!',
          address: {
            isDefault: true,
            address: street,
            city: city,
            state: state,
            country: 'US',
            zipCode: zip,
            user: '6434b87a3ea9a80035112c5f',
            __v: 0
          }
        });
    });
});