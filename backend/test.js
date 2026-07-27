const mongoose = require("mongoose");

async function test() {
  try {
    await mongoose.connect(
      "mongodb+srv://stephenhwan:Uyen311003@wedprogramming.xoivi3u.mongodb.net/?retryWrites=true&w=majority&appName=wedProgramming"
    );

    console.log("Connected!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();