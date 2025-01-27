import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./shortURL.proto";
const SERVER_ADDRESS = "localhost:50051";

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

//@ts-ignore
// Create a client instance
const URLclient = new proto.URLService(
  SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);
URLclient.createKeys({}, (error, response) => {
    if (error) {
        console.error("Error in createKeys:", error);
    } else {
        console.log("Key generated:", response.key);
    }
})
// export {URLclient}