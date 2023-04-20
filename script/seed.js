/* eslint-disable no-unused-vars */
"use strict";

// eslint-disable-next-line no-unused-vars
const {
  db,
  models: { User, Coffee, Cart, Orders },
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
    countryOrigin: "Colombian",
    description: "The perfect SIP of REACT with a kick of TION.",
    price: 19,
    roast: "Dark Roast",
    image: "",
  });

  const FULLSTACKUS = await Coffee.create({
    name: "THE FULLSTACKUS JAMPACTUS",
    countryOrigin: "Honduras",
    description:
      "THE FULL approach of STACK with kick of JAMPACTing energy for your procrastination",
    price: 35,
    roast: "Medium",
    image: "",
  });

  // Creating Users
  const users = [
    {
      username: "Jane",
      password: "1234",
    },
    {
      username: "John",
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
  //Order Seeding
  const orders = [
    {
      fulfilled: "false",
      userId: "1",
    },
    {
      fulfilled: "false",
      userId: "2",
    },
    {
      fulfilled: "false",
      userId: "3",
    },
  ];

  await Promise.all(
    orders.map((e) => {
      return Orders.create(e);
    })
  );
  //Cart Seeding
  const carts = [
    {
      orderId: "1",
      coffeeId: "1",
    },
    {
      orderId: "2",
      coffeeId: "2",
    },
    {
      orderId: "3",
      coffeeId: "3",
    },
  ];
  await Promise.all(
    carts.map((e) => {
      return Cart.create(e);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
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
