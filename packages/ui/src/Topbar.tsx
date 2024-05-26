interface TopbarProps {
  balance: number;
}

export const Topbar = ({ balance }: TopbarProps) => {
  return (
    <div className="border p-4">
      <div className="flex justify-between items-center">
        <div className="flex-grow text-center">Payment Buddy</div>
        <div className="ml-auto">Balance: {balance}</div>
      </div>
    </div>
  );
};
