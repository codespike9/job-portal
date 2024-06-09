const { generateToken } = require("../middlewares/jwtMiddleware");
const { Applicant } = require("../models/ApplicantModels");

const registerApplicant = async (req, res) => {
  try {
    const { email, mobile_no, password, name, address } = req.body;
    const new_applicant = await Applicant.create({
      email,
      mobile_no,
      password,
      name,
      address,
    });

    const payload = {
      id: new_applicant.id,
      isEmployer: false,
    };

    const access_token = generateToken(payload);
    if (new_applicant && access_token) {
      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });
      return res.status(201).json({
        access_token: access_token,
        user: {
          username: new_applicant.name,
          email: new_applicant.email,
          mobile_no: new_applicant.mobile_no,
        },
        message: "Registration successfull!!",
      });
    } else {
      return res.status(400).json({ message: "Some error occurred!" });
    }
  } catch (error) {
    console.error(error);
  }
};
const loginApplicant = async (req, res) => {
  try {
    const data = req.body;
    const userData = await Applicant.findOne({
      $or: [{ mobile_no: data.identification }, { email: data.identification }],
    });

    console.log(userData);

    if (!userData || !(await userData.comparePassword(data.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload = {
      id: userData.id,
      isEmployer: false,
    };

    const access_token = generateToken(payload);
    if (userData && access_token) {
      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });
    }
    return res.status(201).json({
      access_token: access_token,
      user: {
        username: userData.name,
        email: userData.email,
        mobile_no: userData.mobile_no,
      },
      message: "Login successful!!",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registerApplicant,loginApplicant };
