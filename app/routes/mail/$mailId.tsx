import { useParams } from "@remix-run/react";

const Mail: React.FC = () => {
  const params = useParams<{ mailId: string }>();

  return <div>Mail {params.mailId}</div>;
};

export default Mail;
