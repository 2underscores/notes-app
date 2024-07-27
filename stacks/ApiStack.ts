import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({stack}: StackContext) {
    const {table} = use(StorageStack);
    const api = new Api(stack, 'Api', {
        defaults: {
            authorizer: 'iam',
            function: {
                bind: [table], // TODO: Research bind. Just IAM?
            },
        },
        routes: {
            "GET /notes": "packages/functions/src/list.main",
            "POST /notes": "packages/functions/src/create.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            "PUT /notes/{id}": "packages/functions/src/update.main",
            "DELETE /notes/{id}": "packages/functions/src/delete.main",
        },
    });
    // Print/show API in outputs
    stack.addOutputs({
        ApiEndoint: api.url,
    })
    // Make API available for other resources
    return {
        api,
    }
}