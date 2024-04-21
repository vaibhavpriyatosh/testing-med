// import { Context, Hono } from "hono";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { sign } from "hono/jwt";

// interface AppContext {
//   p: string;
//   prisma: string;
// }

// const app = new Hono<{
//   Bindings: {
//     DATABASE_URL: string;
//     JWT_SECRET: string;
//   };
//   Variables: {
//     prisma: any;
//   };
// }>();

// app.use("/*", (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set("prisma", prisma);
//   return next();
// });

// app.get("/", (c) => {
//   console.log({ c });
//   return c.text("Up And Kicking");
// });
// app.post("/api/v1/signup", async (c) => {
//   console.log(c.env.DATABASE_URL);
//   const prisma = c.get("prisma");
//   console.log({ prisma });
//   const body = await c.req.json();

//   const user = await prisma.user.create({
//     data: {
//       email: body.email,
//       password: body.password,
//     },
//   });

//   const token = await sign({ id: user.id }, c.env.JWT_SECRET);

//   return c.json({ jwt: token });
// });
// app.post("/api/v1/signin", (c) => {
//   return c.text("Hello Hono!");
// });
// app.put("/api/v1/blog", (c) => {
//   return c.text("Hello Hono!");
// });
// app.get("/api/v1/blog/:id", (c) => {
//   return c.text("Hello Hono!");
// });

// export default app;

import { Hono } from "hono";
import { userRouter } from "./routes/userRoute";
import { blogRouter } from "./routes/blogRoutes";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: any;
  };
}>();

app.use("/*", (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  return next();
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/book", blogRouter);

export default app;
