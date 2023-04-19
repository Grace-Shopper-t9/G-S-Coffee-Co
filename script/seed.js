/* eslint-disable no-unused-vars */
"use strict";

// eslint-disable-next-line no-unused-vars
const {
  db,
  models: { User, Coffee, Cart },
} = require("../server/db/");

const seed = async () => {
  try {
    await db.sync({ force: true });

    const REACTOBLEND = await Coffee.create({
      name: "REACTO-JAMPACTO",
      countryOrigin: "Columbian",
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

    console.log("Seeding success!");
    db.close();
  } catch (err) {
    console.error("Failed to Seed");
    console.error(err);
    db.close();
  }
};

seed();
