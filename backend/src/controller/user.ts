import { sign } from "hono/jwt";

export const signUpUser = async (c: any) => {
  try {
    const prisma = c.get("prisma");

    const body = await c.req.json();
    console.log({ body });

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch (e) {
    console.log(`Error : SignUp Controller : ${e}`);
  }
  return c.text("Something Went Wrong");
};

export const signInUser = async (c: any) => {
  try {
    const prisma = c.get("prisma");

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    console.log(`Error : SignUp Controller : ${e}`);
  }
  return c.text("Something Went Wrong");
};
