import { useConnection } from "wagmi";
import { Button } from "@/components/ui/button";

const ConnectWalletButton = () => {
  const { address } = useConnection();

  return <Button size="lg">{address ? address : "Connect Wallet"}</Button>;
};

export default ConnectWalletButton;
