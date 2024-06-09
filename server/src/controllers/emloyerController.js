const { generateToken } = require("../middlewares/jwtMiddleware");
const CompanyDetails = require("../models/CompanyDetailsModels");

const registerEmployer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const new_employer = new CompanyDetails();
    new_employer.employer.name = name;
    new_employer.employer.email = email;
    new_employer.employer.password = password;
    await new_employer.save();

    const payload = {
      id: new_employer.id,
      isEmployer: true,
    };

    const access_token = generateToken(payload);
    if (new_employer && access_token) {
      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });
      return res.status(201).json({
        access_token: access_token,
        user: {
          username: new_employer.employer.name,
          email: new_employer.employer.email,
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

const loginEmployer = async (req, res) => {
  try {
    const data = req.body;
    const userData = await CompanyDetails.findOne({
      "employer.email": data.identification,
    });

    console.log(userData);
    if (!userData || !(await userData.comparePassword(data.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload = {
      id: userData.id,
      isEmployer: true,
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
        username: userData.employer.name,
        email: userData.employer.email,
      },
      message: "Login successful!!",
    });
  } catch (error) {
    console.error(error);
  }
};

const registerOrUpdateCompany = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    if (req.user.isEmployer) {
      const data = req.body;
      const company = await CompanyDetails.findOneAndUpdate(
        { _id: loggedInUser },
        data,
        { new: true, runValidators: true }
      );
      console.log(company);
      if (company) {
        return res.status(200).json({ message: "Data updated successfully" });
      } else {
        throw Error("Employer Details not found.");
      }
    } else {
      throw Error("Authorization declined!! You are not an employer.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = { loginEmployer, registerEmployer, registerOrUpdateCompany };
