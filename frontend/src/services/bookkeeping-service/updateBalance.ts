export async function updateBalance(accountId: number, delta: number) {
  const res = await fetch(
    `http://localhost:3000/accounts/${accountId}/balance`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delta }),
    },
  );

  if (!res.ok) {
    throw new Error("Implement error handling");
  }
}
