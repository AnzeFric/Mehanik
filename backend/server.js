const dotenv = require("dotenv");
const app = require("./src/app");

dotenv.config();

const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mehanik server started on port ${PORT}`);
});
