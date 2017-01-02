import FB from 'fb';

const getUserData = (token) => {
  const promise = new Promise((resolve) => {
    FB.options({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: ["email"]
    });

    FB.setAccessToken(token);

    FB.api("me", { fields: ['id', 'name', 'email'] }, (res) => {
      resolve(res);
    });
  });
  return promise;
};

export const facebookApi = {
  getUserData
};
