import { useActionData } from "@remix-run/react";
import { type ActionFunction } from "@remix-run/node";

import { login, createUserSession } from "~/utils/session.server";
import { badRequest } from "~/utils";
import { loginValidations } from "~/validations/auth";

const Login: React.FC = () => {
  const actionData = useActionData();

  console.log(actionData);

  return (
    <div>
      Login
      <form method="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const form = Object.fromEntries(await request.formData());

  try {
    const validatedSchema = loginValidations.safeParse(form);

    if (!validatedSchema.success) {
      const errors = validatedSchema.error.format();

      return badRequest({
        data: form,
        errors,
      });
    }

    const { data } = validatedSchema;

    const user = await login(data.email, data.password);

    if (!user) {
      return badRequest({
        formErrors: ["Invalid credentials"],
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

export default Login;
