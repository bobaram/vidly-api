const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const { User } = require("./models/user");
const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const data = [
  {
    name: "Comedy",
    movies: [
      { price: "15", title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
      {
        price: "25",
        title: "The Hangover",
        numberInStock: 10,
        dailyRentalRate: 2,
      },
      {
        price: "12",
        title: "Wedding Crashers",
        numberInStock: 15,
        dailyRentalRate: 2,
      },
    ],
  },
  {
    name: "Action",
    movies: [
      { price: "20", title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
      {
        price: "25",
        title: "Terminator",
        numberInStock: 10,
        dailyRentalRate: 2,
      },
      {
        price: "22",
        title: "The Avengers",
        numberInStock: 15,
        dailyRentalRate: 2,
      },
    ],
  },
  {
    name: "Romance",
    movies: [
      {
        price: "10",
        title: "The Notebook",
        numberInStock: 5,
        dailyRentalRate: 2,
      },
      {
        price: "12",
        title: "When Harry Met Sally",
        numberInStock: 10,
        dailyRentalRate: 2,
      },
      {
        price: "15",
        title: "Pretty Woman",
        numberInStock: 15,
        dailyRentalRate: 2,
      },
    ],
  },
  {
    name: "Thriller",
    movies: [
      {
        price: "20",
        title: "The Sixth Sense",
        numberInStock: 5,
        dailyRentalRate: 2,
      },
      {
        price: "25",
        title: "Gone Girl",
        numberInStock: 10,
        dailyRentalRate: 2,
      },
      {
        price: "15",
        title: "The Others",
        numberInStock: 15,
        dailyRentalRate: 2,
      },
    ],
  },
];

const userSeedData = {
  name: "omen",
  email: "kworktaps@gmail.com",
  isAdmin: true,
  password: "guvhu123",
};

// async function seed() {
//   await mongoose.connect(config.get("db"));

//   await Movie.deleteMany({});
//   await Genre.deleteMany({});

//   for (let genre of data) {
//     const { _id: genreId } = await new Genre({ name: genre.name }).save();
//     const movies = genre.movies.map((movie) => ({
//       ...movie,
//       genre: { _id: genreId, name: genre.name },
//     }));
//     await Movie.insertMany(movies);
//   }

//   mongoose.disconnect();

//   console.info("Done!");
// }

async function seed() {
  try {
    await mongoose.connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Movie.deleteMany({});
    await Genre.deleteMany({});
    await User.deleteMany({});

    for (let genre of data) {
      const { _id: genreId } = await new Genre({ name: genre.name }).save();
      const movies = genre.movies.map((movie) => ({
        ...movie,
        genre: { _id: genreId, name: genre.name },
      }));
      await Movie.insertMany(movies);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userSeedData.password, salt);
    const newUser = new User({
      name: userSeedData.name,
      email: userSeedData.email,
      isAdmin: userSeedData.isAdmin,
      password: hashedPassword,
    });
    await newUser.save();

    mongoose.disconnect();

    console.info("Done!");
  } catch (error) {
    console.error("Error:", error);
  }
}
seed();
