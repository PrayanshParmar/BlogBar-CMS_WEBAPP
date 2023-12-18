const JWT = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;

function createTokenForUser(user) {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    about: user.about,
    profile_img_url: user.profile_img_url,
  };

  try {
    const token = JWT.sign(payload, secret, {
      expiresIn: "2 days", // Token expiration time
    });
    return token;
  } catch (error) {
    console.log(error);
  }
}

function verifyToken(token) {
  try {
    const verifyed = JWT.verify(token, secret);
    return verifyed;
  } catch (error) {
    console.log(null);
  }
}

module.exports = { createTokenForUser, verifyToken };
