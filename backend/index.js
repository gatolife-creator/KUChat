const express = require('express')
const app = express();
const path = require('path');
const Gun = require("gun");
const port = process.env.PORT || 3001;

app.use(Gun.serve);
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const server = app.listen(port, () => {
    console.log(`listening on *:${port}`);
})

Gun({ web: server });