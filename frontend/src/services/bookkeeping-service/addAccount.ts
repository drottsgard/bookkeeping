export async function addAccount(accountName: string, parentId?: number) {
  const res = await fetch("http://localhost:3000/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: accountName, parentId }),
  });

  if (!res.ok) {
    throw new Error("Implement error handling");
  }
}
