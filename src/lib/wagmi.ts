import { createConfig, http, injected } from "wagmi";
import { base, baseSepolia, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";
import { WALLETCONNECT_PROJECT_ID } from "@/lib/constants";

export const wagmiConfig = createConfig({
  chains: [mainnet, base, sepolia, baseSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId: WALLETCONNECT_PROJECT_ID }),
    metaMask(),
    coinbaseWallet(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
});
