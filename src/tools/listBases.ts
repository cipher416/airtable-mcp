import { type ToolMetadata } from "xmcp";

export const metadata: ToolMetadata = {
  name: "listBases",
  description: "List all the airtable bases owned by the user",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function listBases() {
  console.log(process.env.AIRTABLE_API_URL);
  const result = await fetch(`${process.env.AIRTABLE_API_URL}/v0/meta/bases`, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
  });

  if (!result.ok) {
    throw new Error(`Failed to fetch bases: ${result.status}`);
  }

  const bases = await result.json();
  return JSON.stringify(bases);
}
