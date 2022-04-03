const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

// check for env availability
for (const e of Object.entries(env)) {
  if (!e[1]) {
    console.error(`missing env for ${e[0]}`);
    process.exit(1);
  }
}

module.exports = env;
