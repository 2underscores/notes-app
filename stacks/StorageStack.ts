import { StackContext, Table, Bucket} from "sst/constructs";

export function StorageStack({ stack }: StackContext) {

  // Bucket for uploads
  const bucket = new Bucket(stack, "Uploads", {
    cors: [
      {
        maxAge: "1 day",
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      },
    ],
  });

  // Create the DynamoDB table
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });

  return {
    table, // Explicit return makes referencable by other stacks. API/NW call link vs direct resource for teardown/replaces.
    bucket,
  };
}