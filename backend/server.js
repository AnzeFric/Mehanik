require("dotenv").config();

const express = require("express");
const app = express();
const { createClient } = require("@supabase/supabase-js");

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Mehanik backend started successfully!");
});
