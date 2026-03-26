import { createConfig, http, injected } from "wagmi";
import { base, baseSepolia, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, base, sepolia, baseSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId: "2ecf99a5a565ea174d17084c4e1f6672" }),
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
