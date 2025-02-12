const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(" Incoming Registration Request:", { username, email, password });

    if (!username || !email || !password) {
        console.log("  Validation Error: Missing fields.");
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log("  Email already exists:", email);
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashPassword });

        console.log("✅ User Registered Successfully:", newUser);

        const token = jwt.sign(
            { id: newUser.id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({ message: "Registration Successful", token });
    } catch (error) {
        console.error("  Registration Error:", error);
        res.status(500).json({ error: "Something went wrong. Please check backend logs." });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(" Incoming Login Request:", { email });

    if (!email || !password) {
        console.log("  Validation Error: Missing email or password.");
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log("  Login Error: User not found.");
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("  Login Error: Incorrect password.");
            return res.status(400).json({ error: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
        console.error("  Login Error:", error);
        res.status(500).json({ error: "Something went wrong. Please check backend logs." });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("  Get Users Error:", error);
        res.status(500).json({ error: "Failed to Load Users" });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            console.log("  Update Error: User not found.");
            return res.status(404).json({ message: "User not found" });
        }
        await user.update(req.body);
        res.json({ message: "User updated successfully", user });
    } catch (err) {
        console.error("  Update User Error:", err);
        res.status(400).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            console.log("  Delete Error: User not found.");
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("  Delete User Error:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerUser, loginUser, getUser, updateUser, deleteUser };
