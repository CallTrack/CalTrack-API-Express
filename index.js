const express = require("express");
const logger = require("./middleware/logger")
const path = require("path");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/foods', require('./routes/api/foods'));

app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));