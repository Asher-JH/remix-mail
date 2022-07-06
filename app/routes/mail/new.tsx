import { useActionData } from "@remix-run/react";
import { type ActionFunction, redirect } from "@remix-run/node";
import { createMailValidation } from "~/validations/mail";

const NewMail: React.FC = () => {
  const actionData = useActionData();

  console.log(actionData);

  return (
    <div>
      New Mail
      <div>
        <form method="POST">
          <label htmlFor="to">To</label>
          <input type="email" name="to" id="to" required />

          <label htmlFor="from">From</label>
          <input type="email" name="from" id="from" required />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const form = Object.fromEntries(await request.formData());

  try {
    const validatedSchema = createMailValidation.safeParse(form);

    if (!validatedSchema.success) {
      const errors = validatedSchema.error.format();

      return {
        data: form,
        errors,
      };
    }

    // No error then continue db work
    return redirect("/mail");
  } catch (err) {
    return {
      form,
      error: (err as Error)?.message || "An error occurred",
    };
  }
};

export default NewMail;
