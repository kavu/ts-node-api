module.exports = {
   "type": "postgres",
   "host": process.env.DB_HOST || "localhost",
   "port": process.env.DB_PORT || 5432,
   "username": process.env.DB_USERNAME || "postgres",
   "password": process.env.DB_PASSWORD || "postgres",
   "database": process.env.DB_NAME     || "cards_api",
   "synchronize": false,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
