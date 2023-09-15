const arr2 = [];
const bcrypt = require("bcrypt");
const saltround = 10;
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const userdata = req.body;
  console.log(userdata);

  const found = arr2.find((el) => el.email === userdata.email);
  if (found) {
    return res.send({ msg: "User already exist" });
  }

  //password encryption
  // const generatesalt = bcrypt.genSaltSync(10);
  // console.log(generatesalt);

  //const haspassword = bcrypt.hash(originalpassword,saltround);
  const hashpassword = bcrypt.hashSync(userdata.password, saltround);
  const temp = {
    name: userdata.name,
    contact: userdata.contact,
    email: userdata.email,
    password: hashpassword,
  };
  arr2.push(temp);
  const token = jwt.sign({ email: userdata.email }, process.env.secretkey, {
    expiresIn: "36000",
  });
  res.status(200).send({
    msg: "User is registered successfully",
    result: arr2,
    token: token,
  });
};
const login = async (req, res) => {
  const userdata = req.body;
  console.log(userdata);

  const found = arr2.find((el) => el.email === userdata.email);
  //checking if email is present in data or not
  if (!found) {
    return res.send({ msg: "User not registered" });
  }

  //checking if password is correct or not
  const validate = await bcrypt.compare(userdata.password, found.password);
  if (!validate) {
    return res.send({ msg: "user password is wrong" });
  }

  const token = jwt.sign({ email: userdata.email }, process.env.secretkey, {
    expiresIn: "36000",
  });
  res.send({ msg: "User is LoggedIn successfully", userdata, token: token });
};
const dashboard = (req, res) => {
  return res.send([
    {
      randomArticle: "random",
    },
  ]);
};
const profile = (req, res) => {
  return res.send([
    {
      name: "Sahil Goliwar",
      email: "test@gmail.com",
      profileimg: "ifhuyfhgiaf",
    },
  ]);
};
module.exports = { register, login, dashboard, profile };
