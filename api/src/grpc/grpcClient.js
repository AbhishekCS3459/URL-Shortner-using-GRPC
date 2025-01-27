const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const PROTO_PATH = path.join(__dirname, "shortURL.proto");

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "localhost:50051";
// Load the protobuf definition
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const proto = grpc.loadPackageDefinition(packageDefinition).urlService;
const URLclient = new proto.URLService(
  SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);
module.exports = { URLclient };
