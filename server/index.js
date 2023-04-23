const db = require("./db/db");
const PORT = 8080;
const app = require("./app");
const seed = require("../script/seed");

db.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`

        Listening on port ${PORT}

        http://localhost:${PORT}/

    `)
  );
});
