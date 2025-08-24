import { InferSchema, type ToolMetadata } from "xmcp";
import { z } from "zod";

export const schema = {
  baseId: z.string(),
  tableId: z.string(),
  pageSize: z.number(),
  offset: z.number(),
};

export const metadata: ToolMetadata = {
  name: "listTableRecords",
  description: "List records of a table in a basee owned by the user",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function listTableRecords(
  args: InferSchema<typeof schema>,
) {
  const query = new URLSearchParams({
    pageSize: args.pageSize.toString(),
    offset: args.offset.toString(),
  });

  const url = new URL(
    `${process.env.AIRTABLE_API_URL}/v0/${args.baseId}/${args.tableId}`,
  );

  url.search = query.toString();

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
  });

  if (!result.ok) {
    throw new Error(`Failed to fetch base schema: ${result.status}`);
  }

  const baseSchema = await result.json();
  return JSON.stringify(baseSchema);
}
