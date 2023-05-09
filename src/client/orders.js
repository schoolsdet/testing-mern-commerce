import superagent from 'superagent';

const baseUrl = 'https://mern-ecommerce.sdet.school/api';

export const getUserOrders = (opts) => {
  const authHeader = {
    Authorization: opts.token
  };
  if(opts.token === null) {
    throw new Error('addAddress: token required param');
  }
  return superagent.get(baseUrl+'/order/me').set(authHeader);
};
