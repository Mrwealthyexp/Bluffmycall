const connect = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    
    // Simulate payment (replace with real Web3 logic later)
    const hasPaid = true;
    setIsPaid(hasPaid);
  } else {
    alert('MetaMask is not installed.');
  }
};
