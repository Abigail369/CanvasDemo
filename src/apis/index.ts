import { server } from "@/plugins/axios";

export async function getToken(account: string, password: string) {
  const res = await server.post("/login", {
    account,
    password,
  });
  return res.data.token;
}
