const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const mechanicService = require("../services/mechanic");

const authService = {
  async register(email, password, firstName, lastName, accountType) {
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("email, enabled, uuid")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) throw fetchError;

    const hashedPassword = await bcrypt.hash(password, 10);
    let userUuid = uuidv4();

    if (existingUser) {
      if (existingUser.enabled === true) {
        throw new Error(`User with this email already exists: ${email}`);
      } else {
        // Re-enable and update info
        userUuid = existingUser.uuid;

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
          .eq("email", email);

        if (updateError) throw updateError;
      }
    } else {
      // Create new user
      const { error: saveError } = await supabase.from("users").insert({
        uuid: userUuid,
        email,
        password_hash: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        account_type: accountType,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        enabled: true,
      });

      if (saveError) throw saveError;
    }

    if (accountType === "mechanic") {
      const data = await mechanicService.check(userUuid);
      if (!data) {
        await mechanicService.create(userUuid);
      }
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

    let mechanicUuid = null;
    if (user.account_type === "mechanic") {
      const mechanicData = await mechanicService.check(user.uuid);
      mechanicUuid = mechanicData?.uuid;
    }

    const expiration = 7 * 24 * 60 * 60 * 1000; // 1 week

    // Generate JWT token
    const token = jwt.sign(
      { userUuid: user.uuid, mechanicUuid: mechanicUuid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: expiration + "Ms" }
    );

    return token;
  },
};

module.exports = authService;
