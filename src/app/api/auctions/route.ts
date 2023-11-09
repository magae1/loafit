export async function POST(request: Request) {
  const requestData = await request.json();
  const res = await fetch(`${process.env.LOA_URL}/auctions/items`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LOA_JWT}`,
    },
    body: JSON.stringify(requestData),
  });
  const data = await res.json();
  return Response.json(data);
}
