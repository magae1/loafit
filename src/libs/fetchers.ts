export async function getMarketItemData(id: string) {
  const res = await fetch(`${process.env.LOA_URL}/markets/items/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.LOA_JWT}`,
    },
  });

  if (!res.ok) throw new Error("⚠️데이터를 불러올 수 없습니다.⚠️");

  return res.json();
}
