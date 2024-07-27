import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { ApiStack } from "./stacks/ApiStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "ap-southeast-2",
      profile: _input.profile ? _input.profile : 'jeremy2',
      // input can have: stage, region, profile, role
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack); // key bit here
  },
} satisfies SSTConfig;