import { onAuthenticateUser } from "@/actions/user";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

const layout = async (props: Props) => {
  // For development, skip auth check
  // const auth = await onAuthenticateUser();
  // if (!auth.user) redirect("/sign-in");
  
  return <div className="w-full min-h-screen">{props.children}</div>;
};

export default layout;