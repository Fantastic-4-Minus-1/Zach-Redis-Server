const app = require("./app.js").app;

const PORT = 3006;

app.listen(PORT, err =>
  console.log(err || `Now listening on port ${PORT}  🤓 👨🏽‍💻`)
);
