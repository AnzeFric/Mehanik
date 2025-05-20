const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const authService = {
  async register(email, password, firstName, lastName, accountType) {
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("email, enabled")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) throw fetchError;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser && existingUser.enabled === true) {
      throw new Error("User with this email already exists");
    } else if (existingUser && existingUser.enabled === false) {
      // Re-enable and update info
      const { error: updateError } = await supabase
        .from("users")
        .update({
          password_hash: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          account_type: accountType,
          updated_at: new Date().toISOString(),
          enabled: true,
        })
        .eq("email", email)
        .select()
        .maybeSingle();

      if (updateError) throw updateError;
    } else {
      // Create new user
      const generatedUuid = uuidv4();

      const { error: saveError } = await supabase
        .from("users")
        .insert({
          uuid: generatedUuid,
          email,
          password_hash: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          account_type: accountType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          enabled: true,
        })
        .select();

      if (saveError) throw saveError;
    }

    return email;
  },

  async login(email, password) {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("enabled", true)
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
