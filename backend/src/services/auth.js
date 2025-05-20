const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const authService = {
  async register(email, password, firstName, lastName, accountType) {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const generatedUuid = uuidv4();

      const { error } = await supabase
        .from("users")
        .insert({
          uuid: generatedUuid,
          email: email,
          password_hash: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          account_type: accountType,
          enabled: true,
          created_at: new Date().toISOString(),
        })
        .select();

      if (error) throw error;

      return email;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  async login(email, password) {
    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (error) throw error;
      if (!user) throw new Error("User not found");

      // Verify password
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) throw new Error("Invalid password");

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return token;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};

module.exports = authService;
