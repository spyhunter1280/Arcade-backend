const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require('./routes/authRouter');
const tournamentRouter = require('./routes/tournamentRouter')

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected to mongodb');
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRouter);
app.use('/api/tournament', tournamentRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
