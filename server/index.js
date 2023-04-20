const db = require("./db/db");
// global.process = require("process/browser");
// const PORT = process.env.PORT || 8080;
const PORT = 8080;
const app = require("./app");
const seed = require("../script/seed");

// const init = async () => {
//   try {
//     // console.log(process.env.SEED);
//     if (process.env.SEED === "true") {
//       // console.log("if seed");
//       await seed();
//     } else {
//       console.log("else db.sync");
//       // console.log(process.env);
//       await db.sync();
//     }
//     // start listening (and create a 'server' object representing our server)
//     app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
//   } catch (ex) {
//     console.log(ex);
//   }
// };

// init();
db.sync().then(() => {
  // console.log(process.env);
  app.listen(PORT, () =>
    console.log(`

        Listening on port ${PORT}

        http://localhost:${PORT}/

    `)
  );
});
