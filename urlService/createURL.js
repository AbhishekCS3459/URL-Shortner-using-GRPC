import { sequelize } from "./db/sequlize.js";

export async function createKeys() {
  const transaction = await sequelize.transaction();
  try {
    // Fetch a key from the database where isUsed = false
    const [results] = await sequelize.query(
      'SELECT "key", "id" FROM "Keys" WHERE "isUsed" = false LIMIT 1 FOR UPDATE SKIP LOCKED',
      { transaction } // Use the transaction
    );

    if (results.length > 0) {
      const { key, id } = results[0];

      // Mark the key as used by updating the isUsed flag to true
      await sequelize.query(
        'UPDATE "Keys" SET "isUsed" = true, "updatedAt" = NOW() WHERE "id" = :id',
        {
          replacements: { id },
          transaction, // use the same transaction
        }
      );

      // Commit the transaction if everything was successful
      await transaction.commit();

      // Return the retrieved key
      return key;
    } else {
      throw new Error("No unused keys available.");
    }
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    console.error("Error fetching or updating key from the table:", error);
  }
}