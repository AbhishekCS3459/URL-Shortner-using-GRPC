import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import { createKeys } from "./createURL.js";
import { sequelize } from "./db/sequlize.js";

dotenv.config();

const PROTO_PATH = "./shortURL.proto";
const PORT = process.env.PORT || 50051;

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const shortURLProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// Add service to the gRPC server
server.addService(shortURLProto.urlService.URLService.service, {
  createKeys: async (_, callback) => {
    try {
      const key = await createKeys();
      callback(null, { key });
    } catch (error) {
      console.error("Error in createKeys:", error);
      callback({
        code: grpc.status.INTERNAL,
        message: "Error generating key",
      });
    }
  },
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Start the gRPC server
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to start server:", err);
      return;
    }
    console.log(`Server running at http://localhost:${port}`);
    server.start();
  }
);
