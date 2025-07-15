import { User } from "../models/user.model.js";
import {Meeting} from "../models/meeting.model.js"
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";

//register
const register = async (req, res) => {
  const { fullname, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.FOUND).sned("User already exists");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname: fullname,
      username: username,
      password: hashedPass,
    });
    await newUser.save();

    res.status(httpStatus.CREATED).send("User Register");
  } catch (error) {
    res.send(`Something went wrong \n ${error}`);
    console.log(`Something went wrong \n ${error}`);
  }
};

//login
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Please Provide username and password");
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).sned("User don't exists");
    }

    let isPasswordCorrect=await bcrypt.compare(password, user.password)

    if (isPasswordCorrect) {
      let token = crypto.randomBytes(20).toString("hex"); //generate a randon token and
      user.token = token; //assing it to user when login it store in session
      await user.save();

      return res.status(httpStatus.OK).json({ token: token });
    } else {
      return res.status(httpStatus.UNAUTHORIZED).sned("Invalid username and password");
    }
  } catch (error) {
    res.send(`Something went wrong \n ${error}`);
    console.log(`Something went wrong \n ${error}`);
  }
};

const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

export { register, login, getUserHistory, addToHistory };
