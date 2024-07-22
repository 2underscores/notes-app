import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

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
    app.stack(API);
  }
} satisfies SSTConfig;
