import { InferSchema, type ToolMetadata } from "xmcp";
import { z } from "zod";

export const schema = {
  baseId: z.string(),
};

export const metadata: ToolMetadata = {
  name: "getBaseSchema",
  description: "List the schema of the base owned by the user",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getBaseSchema(args: InferSchema<typeof schema>) {
  const result = await fetch(
    `${process.env.AIRTABLE_API_URL}/v0/meta/bases/${args.baseId}/tables`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    },
  );

  if (!result.ok) {
    throw new Error(`Failed to fetch base schema: ${result.status}`);
  }

  const baseSchema = await result.json();
  return JSON.stringify(baseSchema);
}
