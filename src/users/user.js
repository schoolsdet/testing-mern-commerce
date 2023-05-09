import helper from '../helper/userGenerator.js';
import { login, register } from '../client/auth.js';
import address from '../client/address.js';

class User {
  /**
     * Constructor for user class
     * @param {object} opts - params passed in
     * @param {string} opts.email - email
     * @param {string} opts.firstName - first name
     * @param {string} opts.lastName - last name
     * @param {string} opts.password - password
     * @param {string} opts.id - user id
     * @param {string} opts.role - user role
     * @param {string} opts.token - user token
     */
  constructor(opts={}) {
    this.email = opts.email;
    this.firstName = opts.firstName;
    this.lastName = opts.lastName;
    this.password = opts.password;
    this.id = opts.id;
    this.role = opts.role;
    this.token = opts.token;
  }

  /**
     * Create user
     *
     * @param {object} opts - params passed in
     * @param {string} opts.email - email
     * @param {string} opts.firstName - first name
     * @param {string} opts.lastName - last name
     * @param {string} opts.password - password
     * 
     * @returns <Promise<object>> - new user
     */
  static async createUser(opts = {}) {
    const randomUser = helper.randomUser();
    const userOpt = {
      email: opts.email || randomUser.email,
      firstName: opts.firstName || randomUser.firstName,
      lastName: opts.lastName || randomUser.lastName,
      password: opts.password || randomUser.password
    };
    const resp = await register(userOpt);
    userOpt.id = resp.body.user.id;
    userOpt.role = resp.body.user.role;
    userOpt.token = resp.body.token;
    return new User(userOpt);
  }

  /**
     * Add address
     *
     * @param {object} opts - params passed in
     * @param {string} opts.isDefault - is default
     * @param {string} opts.street - street address
     * @param {string} opts.city - city
     * @param {string} opts.state - state
     * @param {string} opts.country - country
     * @param {string} opts.zip - zip
     * 
     * @returns <Promise<object>> - address response
     */
  async addAddress(opts = {}) {
    const randomAddress = helper.randomAddress();
    const addressOpts = {
      token: this.token,
      address: {
        isDefault: opts.isDefault || randomAddress.isDefault,
        address: opts.street || randomAddress.street,
        city: opts.city || randomAddress.city,
        state: opts.state || randomAddress.state,
        country: opts.country || randomAddress.country,
        zipCode: opts.zip || randomAddress.zipCode
      }
    };
    return address.addAddress(addressOpts);
  }

  /**
   * Get user Order
   */
}

export default { User };