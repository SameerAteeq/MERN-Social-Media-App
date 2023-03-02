import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//Register a new User...

export const registerUser = async (req, resp) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPassword;
  const newUser = new UserModel(req.body);
  const { username } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser) {
      return resp.status(400).json({ message: "Username already exist" });
    }
    const user = await newUser.save();

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },

      process.env.JWT_KEY,

      { expiresIn: "1h" }
    );

    resp.status(200).json({ user, token });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
};

//Login User

export const loginUser = async (req, resp) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        resp.status(400).json({ message: "Wrong Password" });
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        resp.status(200).json({ user, token });
      }
    } else {
      resp.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    resp.status(500).json(error);
  }
};
