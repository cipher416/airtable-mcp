import { InferSchema, type ToolMetadata } from "xmcp";
import { z } from "zod";

export const schema = {
  baseId: z.string(),
  tableId: z.string(),
  recordId: z.string(),
  // Partial field map to update on the Airtable record
  fields: z.record(z.string(), z.any()),
  // When true, Airtable will attempt to coerce values to the right type
  typecast: z.boolean().optional(),
};

export const metadata: ToolMetadata = {
  name: "updateTableRecord",
  description: "Update a record in a specified table by record ID",
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: false,
  },
};

export default async function updateTableRecord(
  args: InferSchema<typeof schema>,
) {
  const url = `${process.env.AIRTABLE_API_URL}/v0/${args.baseId}/${args.tableId}/${args.recordId}`;

  const payload = {
    fields: args.fields,
    typecast: args.typecast ?? false,
  };

  const result = await fetch(url, {
    method: "PATCH",
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
      `Failed to update record: ${result.status}${detail}`,
    );
  }

  const updated = await result.json();
  return JSON.stringify(updated);
}

