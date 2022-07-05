import { useLoaderData } from "@remix-run/react";

import type { Mail } from "~/types/mail";

type LoaderData = {
  mails: Mail[];
};

const MailList: React.FC = () => {
  const { mails } = useLoaderData<LoaderData>();

  return (
    <div>
      Mail List
      <ul>
        {mails?.length && mails.map((mail) => <li key={mail.id}>{mail.to}</li>)}
      </ul>
    </div>
  );
};

export default MailList;

export const loader = (): LoaderData => {
  const data = {
    mails: [
      { id: 1, to: "asher@whiteroom.work", from: "asherchan1188@gmail.com" },
    ],
  };
  return data;
};
