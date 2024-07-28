import { Api, Config, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

function customApiDomain(app: StackContext["app"]) {
    const hostedZone = 'not-localhost.com';
    let apiDomain: undefined | string = undefined;
    if (app.stage === "production") {
        apiDomain = `notes-api.${hostedZone}`;
    } else if (app.stage.startsWith("pr")) { // PR branch i think
        apiDomain = `notes-api-${app.stage}.${hostedZone}`;
    }
    return apiDomain;
}

export function ApiStack({ stack, app }: StackContext) {
    const { table } = use(StorageStack);
    const STRIPE_SECRET_KEY = new Config.Secret(stack, "STRIPE_SECRET_KEY");
    const api = new Api(stack, 'Api', {
        customDomain: customApiDomain(app),
        defaults: {
            authorizer: 'iam',
            function: {
                bind: [table, STRIPE_SECRET_KEY], // TODO: Research bind. Just IAM? bind table, SSM param. #TODOx2.
            },
        },
        routes: {
            "GET /notes": "packages/functions/src/list.main",
            "POST /notes": "packages/functions/src/create.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            "PUT /notes/{id}": "packages/functions/src/update.main",
            "DELETE /notes/{id}": "packages/functions/src/delete.main",
            "POST /billing": "packages/functions/src/billing.main",
        },
        cors: true,
        // cors: {
        //     allowMethods: ["GET"],
        // },
    });
    // Print/show API in outputs
    stack.addOutputs({
        ApiEndpoint: api.customDomainUrl || api.url,
    });
    // Make API available for other resources
    return {
        api,
    }
}