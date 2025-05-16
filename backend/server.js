require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

// Supabase client
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.listen(3000, () => {
  console.log("Mehanik backend started successfully!");
});
