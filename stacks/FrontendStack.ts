import { StackContext, StaticSite, use, StaticSiteDomainProps } from "sst/constructs";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";

function customDomainProps(app: StackContext["app"]): undefined | StaticSiteDomainProps {
  const hostedZone = 'not-localhost.com';
  if (app.stage === "production") { // "production" branch as SST configured to deploy with stack name = branch name for branch deploys.
    return {
      domainName: `notes.${hostedZone}`,
      domainAlias: `www.notes.${hostedZone}`,
      hostedZone: hostedZone,
    }
  } else if (app.stage.startsWith("pr-")) { // From SST - "By default, PRs are deployed to a stage with the name "pr-<number>"."
    return {
      domainName: `notes-${app.stage}.${hostedZone}`,
      domainAlias: `www.notes-${app.stage}.${hostedZone}`,
      hostedZone: hostedZone,
    }
  } else {
    return undefined;
  }
}

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { auth } = use(AuthStack);
  const { bucket } = use(StorageStack);

  // Define our React app
  const site = new StaticSite(stack, "ReactSite", {
   customDomain: customDomainProps(app),
    path: "packages/frontend",
    buildCommand: "pnpm run build",
    buildOutput: "dist",
    // Pass in our environment variables
    environment: {
      VITE_API_URL: api.customDomainUrl || api.url,
      VITE_REGION: app.region,
      VITE_BUCKET: bucket.bucketName,
      VITE_USER_POOL_ID: auth.userPoolId,
      VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.customDomainUrl || site.url,
  });
}