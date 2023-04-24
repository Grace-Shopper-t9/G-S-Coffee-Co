/* eslint-disable no-unused-vars */
"use strict";

// eslint-disable-next-line no-unused-vars
const {
  db,
  models: { User, Coffee, Cart },
} = require("../server/db/");

// const seed = async () => {
//   try {
//     await db.sync({ force: true });

//     const users = [
//       {
//         username: "Jane Smith",
//         password: "1234",
//       },
//       {
//         username: "John Doe",
//         password: "4321",
//       },
//       {
//         username: "Tom",
//         password: "Tom",
//         admin: true,
//       },
//     ];

//     await Promise.all(
//       users.map((user) => {
//         return User.create(user);
//       })
//     );

//     console.log("Seeding success!");
//     db.close();
//   } catch (err) {
//     console.error("Failed to Seed");
//     console.error(err);
//     db.close();
//   }
// };

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  const REACTOBLEND = await Coffee.create({
    name: "REACTO-JAMPACTO",
    countryOrigin: "Colombia",
    description: "The perfect SIP of REACT with a kick of TION.",
    price: 19,
    roast: "Dark Roast",
    image:
      "/Users/veronica-creative/Desktop/Senior-Phase/G-S-Coffee-Co/public/rjblend.png",
  });

  const FULLSTACKUS = await Coffee.create({
    name: "THE FULLSTACKUS JAMPACTUS",
    countryOrigin: "Honduras",
    description:
      "THE FULL approach of STACK with kick of JAMPACTing energy for your procrastination",
    price: 19,
    roast: "Medium",
    image:
      "f/Users/veronica-creative/Desktop/Senior-Phase/G-S-Coffee-Co/public/fjblend.png",
  });
  // const users = await Promise.all([
  //   User.create({ username: "cody", password: "123" }),
  //   User.create({ username: "murphy", password: "123" }),
  // ]);

  // Creating Users
  const users = [
    {
      username: "Jane Smith",
      password: "1234",
    },
    {
      username: "John Doe",
      password: "4321",
    },
    {
      username: "Tom",
      password: "Tom",
      admin: true,
    },
  ];

  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
