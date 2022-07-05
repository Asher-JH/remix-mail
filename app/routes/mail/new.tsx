import { type ActionFunction, redirect } from "@remix-run/node";

const NewMail: React.FC = () => {
  return (
    <div>
      New Mail
      <div>
        <form method="POST">
          <label htmlFor="to">To</label>
          <input type="email" name="to" id="to" />

          <label htmlFor="from">From</label>
          <input type="email" name="from" id="from" />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const to = form.get("to");
  const from = form.get("from");

  const fields = { to, from };

  return redirect("/mail");
};

export default NewMail;
