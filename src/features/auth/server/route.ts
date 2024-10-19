import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schemas";
import bcrypt from "bcryptjs";
import { db } from "@/features/db";
import { sign } from "jsonwebtoken";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const passwordFromDB = await getPasswordFromDataBase(email);
    if (!passwordFromDB) {
      return c.json({ message: "No se encontro Usuario", status: 404 });
    }

    const isPasswordValidate = await bcrypt.compare(password, passwordFromDB);
    if (!isPasswordValidate) {
      return c.json({ message: "No se encontro Usuario", status: 404 });
    }

    if (isPasswordValidate) {
      const store = await getStoreFromDataBase(email, password);
      // const payload = { usuario:{
      //   name: store["USUARIO"]["nombre"], email: store["USUARIO"]["correo"]
      // }}};
      const payload = store;
      const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
      if (!secret) {
        return c.json({ message: "Error Sesión", status: 404 });
      }
      const token = sign(payload, secret, { expiresIn: "1d" });

      setCookie(c, "COOKIE_GESTION", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });
      return c.json({ message: "Sesión Iniciada", status: 201, store: store });
    }

    return c.json({ message: "Error Sesión", status: 404 });
  })
  .post("/logout", (c) => {
    deleteCookie(c, "COOKIE_GESTION");
    return c.json({ success: true });
  });

async function getPasswordFromDataBase(email: string): Promise<string> {
  try {
    const dbPassword = await db.query(
      "SELECT contraseña FROM usuarios WHERE email = ?",
      [email]
    );
    return dbPassword[0]?.contraseña;
  } catch (error) {
    console.error("Error fetching password:", error);
    throw new Error("Database error");
  }
}

async function getStoreFromDataBase(
  email: string,
  password: string
): Promise<any> {
  const json_data = JSON.stringify({
    query: 1, // Cambia esto si deseas hacer login (1) o registro (2)
    email: email,
    password: password,
  });
  const userDB = await db.query("CALL spLogin(?)", [json_data]);
  return userDB[0][0]["STORE"];
}

export default app;
