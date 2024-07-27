import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({stack}: StackContext) {
    const {table} = use(StorageStack);
    const api = new Api(stack, 'Api', {
        defaults: {
            function: {
                bind: [table], // TODO: Research bind. Just IAM?
            },
        },
        routes: {
            "POST /notes": "packages/functions/src/create.main",
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

