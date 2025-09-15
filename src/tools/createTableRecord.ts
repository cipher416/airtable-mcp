import { InferSchema, type ToolMetadata } from "xmcp";
import { z } from "zod";

export const schema = {
  baseId: z.string(),
  tableId: z.string(),
  // Arbitrary field map for the Airtable record
  fields: z.record(z.string(), z.any()),
  // When true, Airtable will attempt to coerce values to the right type
  typecast: z.boolean().optional(),
};

export const metadata: ToolMetadata = {
  name: "createTableRecord",
  description: "Create a record in a specified table within a base",
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: false,
  },
};

export default async function createTableRecord(
  args: InferSchema<typeof schema>,
) {
  const url = `${process.env.AIRTABLE_API_URL}/v0/${args.baseId}/${args.tableId}`;

  const payload = {
    records: [
      {
        fields: args.fields,
      },
    ],
    typecast: args.typecast ?? false,
  };

  const result = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    let detail = "";
    try {
      const err = await result.json();
      detail = ` - ${JSON.stringify(err)}`;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(
      `Failed to create record: ${result.status}${detail}`,
    );
  }

  const created = await result.json();
  return JSON.stringify(created);
}

