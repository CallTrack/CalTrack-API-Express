const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: '*'}));

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/foods', require('./routes/api/foods'));

app.use('/api/exercises', require('./routes/api/exercises'));

app.use('/api/users', require('./routes/api/users'));

app.use('/api/records', require('./routes/api/records'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));