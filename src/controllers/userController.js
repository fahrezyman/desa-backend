const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      role: req.body.role,
    });

    await newUser.save();
    res.status(201).send("User registered successfully!");
  } catch (error) {
    res.status(500).send("There was a problem registering the user.");
  }
};

exports.login = async (req, res) => {
  const user = await User.findByUsername(req.body.username);
  if (!user) {
    return res.status(404).send("Username not found.");
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send("Invalid password.");
  }
  res.status(200).send(user);
};
