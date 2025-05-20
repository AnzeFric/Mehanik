const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const authService = {
  async register(email, password, firstName, lastName, accountType) {
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
  },

  async login(email, password) {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;
    if (!user) throw new Error("User not found");

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) throw new Error("Invalid password");

    const expiration = 7 * 24 * 60 * 60 * 1000; // 1 week

    // Generate JWT token
    const token = jwt.sign(
      { userUuid: user.uuid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: expiration + "Ms" }
    );

    return { token: token, expiresIn: expiration };
  },
};

module.exports = authService;
