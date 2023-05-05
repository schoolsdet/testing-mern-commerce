import { faker } from '@faker-js/faker';

const randomUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'Password1'
  };
};
const randomAddress = () => {
  return {
    isDefault: false,
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: 'USA',
    zipCode: faker.address.zipCode(),
  };
};

export default { randomUser, randomAddress };