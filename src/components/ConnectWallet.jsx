import { ethers } from 'ethers';

let isPaid = false;

export default function ConnectWallet() {
  const [account, setAccount] = useState('');

  async function connect() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);

      const tx = {
        to: 0x6410807e03ad601eaff4b104aa3f6fd13874f916, // <-- your wallet
        value: ethers.parseEther('0.001') // 0.001 ETH = payment
      };

      try {
        await signer.sendTransaction(tx);
        isPaid = true;
        alert('Payment successful. You can now spoof.');
      } catch (err) {
        alert('Payment failed or cancelled.');
      }
    } else {
      alert('MetaMask not found.');
    }
  }

  return (
    <button onClick={connect}>
      {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect & Pay'}
    </button>
  );
}

export { isPaid };
