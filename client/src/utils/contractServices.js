import Lock_ABI from "./Lock_ABI.json";
import { BrowserProvider, Contract, parseEther, formatEther } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";

let provider;
let signer;
let contract;

const initialize = async () => {
    if (typeof window.ethereum !== "undefined") {
        provider = new BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        contract = new Contract(CONTRACT_ADDRESS, Lock_ABI, signer)
    } else {
        console.error("Please Install MetaMask");
    }
};

initialize();

export const requestAccount = async() => {
    try {
        const accounts = await provider.send("eth_requestAccount", []);
        return accounts[0]
    } catch (error) {
        console.error("Error requesting account:", error.message);
        return null;
    }
};

export const getContractBalanceInETH = async() => {
    const balanceWei = await provider.getBalance(CONTRACT_ADDRESS);
    const balanceEth = formatEther(balanceWei);
    return balanceEth;
};

export const depositFund = async (depositValue) => {
    const ethValue = parseEther(depositValue);
    const deposit = await contract.deposit({ value: ethValue });
    await deposit.wait();
}

export const withdrawFund = async () => {
    const withdraw = await contract.withdraw();
    await withdraw.wait();
    console.log("Withdrawal successful !");
}
