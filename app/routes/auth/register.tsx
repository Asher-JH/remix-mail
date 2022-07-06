import { useActionData } from "@remix-run/react";
import { type ActionFunction } from "@remix-run/node";

import { db } from "~/utils/db.server";
import { register, createUserSession } from "~/utils/session.server";
import { badRequest } from "~/utils";
import { registerValidations } from "~/validations/auth";

const Register: React.FC = () => {
  const actionData = useActionData();

  return (
    <div>
      Register
      <form action="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const form = Object.fromEntries(await request.formData());

  try {
    const validatedSchema = registerValidations.safeParse(form);

    if (!validatedSchema.success) {
      const errors = validatedSchema.error.format();

      return badRequest({
        data: form,
        errors,
      });
    }

    const { data } = validatedSchema;

    const userExists = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      return badRequest({
        formErrors: ["User already exists"],
      });
    }

    const user = await register(data);

    if (!user) {
      return badRequest({
        formErrors: ["Something went wrong"],
      });
    }

    return createUserSession(user.id, "/");
  } catch (err) {
    return {
      form,
      error: (err as Error)?.message || "An error occurred",
    };
  }
};

export default Register;
