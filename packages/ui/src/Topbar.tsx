import { Button } from "./button";

interface TopbarProps {
  user?: {
    name?: string | null;
  };
  balance: number;
  onSignout: () => void | Promise<void>;
  onSignin: () => void | Promise<void>;
}

export const Topbar = ({ user, balance, onSignout, onSignin }: TopbarProps) => {
  return (
    <div className="border p-4">
      <div className="flex justify-between items-center">
        <div className="flex-grow text-center">Payment Buddy</div>
        <div className="ml-auto">Balance: {balance}</div>
        <div className="">
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};
