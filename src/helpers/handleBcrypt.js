const bcrypt = require("bcrypt");

const encrypt = async (pass) => {
  const hash = await bcrypt.hash(pass, 10);
  return hash;
};

const compare = async (pass, hashPassword) => {
  return await bcrypt.compare(pass, hashPassword);
};

module.exports = { encrypt, compare };
