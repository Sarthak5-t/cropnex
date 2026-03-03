const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected for Seeding");

        // Check if Admin already exists
        const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
        if (adminExists) {
            console.log("⚠️ Admin already exists in database. No Need to seed.");
            process.exit(0);
        }

        // Create Admin from environment variables
        if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
            console.error("❌ ADMIN_USERNAME or ADMIN_PASSWORD is not set in .env");
            process.exit(1);
        }

        const admin = new Admin({
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
        });

        await admin.save();
        console.log("🎉 Admin user successfully created in the database!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding admin user:", error.message);
        process.exit(1);
    }
};

seedAdmin();
