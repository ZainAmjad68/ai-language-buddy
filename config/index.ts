import schema from "./schema/schema";

const environmentConfig = await import(`./environments/${schema.get(
  "environment"
)}.json`);

schema.load(environmentConfig);
schema.validate({
  allowed: "strict",
});

export default schema;
