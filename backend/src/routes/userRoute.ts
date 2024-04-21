import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signUpUser, signInUser } from "../controller/user";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post(
  "/signup",
  async (c, next) => {
    console.log("In here");
    await next();
  },
  signUpUser
);

userRouter.post("/signin", signInUser);
