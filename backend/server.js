const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const requestDataRoute = require("./routes/requestDataRoute");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/rest', requestDataRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
