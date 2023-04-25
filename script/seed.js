/* eslint-disable no-unused-vars */
"use strict";

// eslint-disable-next-line no-unused-vars
const {
  db,
  models: { User, Coffee, Cart, Orders },
} = require("../server/db/");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const allcoffees = [
    {
      name: "Reacto-Jampacto",
      countryOrigin: "Colombia",
      description: "The perfect SIP of REACT with a kick of TION.",
      price: 19,
      roast: "Dark Roast",
      imageUrl:
        "https://live.staticflickr.com/65535/52844552649_9514ff0686.jpg",
      quantity: 3,
    },
    {
      name: "Fullstackus-Jampactus",
      countryOrigin: "Honduras",
      description:
        "THE FULL approach of STACK with kick of JAMPACTing energy for your procrastination",
      price: 35,
      roast: "Medium",
      imageUrl:
        "https://live.staticflickr.com/65535/52844812888_0b9716ca05.jpg",
      quantity: 2,
    },
    {
      name: "The Fullstackus Jampactus SPECIAL",
      countryOrigin: "Buenos Aires",
      description:
        "THE FULL approach of STACK with kick of JAMPACTing energy for your procrastination",
      price: 50,
      roast: "Medium",
      imageUrl:
        "https://live.staticflickr.com/65535/52844812888_0b9716ca05.jpg",
    },
  ];

  await Promise.all(
    allcoffees.map((e) => {
      return Coffee.create(e);
    })
  );

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
      userId: "1",
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
    },
    {
      orderId: "2",
    },
    {
      orderId: "3",
    },
  ];
  const [cart1, cart2, cart3] = await Promise.all(
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
