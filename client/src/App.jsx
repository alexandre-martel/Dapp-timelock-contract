import React, {useState, useEffect} from "react";
import ConnectWalletButton from "./components/ConnectWalletButton";
import ContactInfo from "./components/ContactInfo ";
import ContactActions from "./components/ContactActions ";
import { requestAccount } from "./utils/contractServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fetchCurAccount = async () => {
            const account = await requestAccount();
            setAccount(account);
        };
        fetchCurAccount();
    }, [])

    useEffect(() => {
        const handleAccountChanged = (newAccounts) =>
            setAccount(newAccounts.lenght > 0? newAccounts[0] : null);ù
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountChanged);
        }
        return () => {
            window.ethereum?.removeListener("accountsChanged", handleAccountChanged)
        }
    });

    return (
        <div className="app">
            <ToastContainer />
            (!account ? (
                <ConnectWalletButton setAccount={setAccount} />
            ) : (
                <div className="contract-interaction">
                    <ContractInfo account={account} />
                    <ContractActions />
                </div>
            ))
        </div>
    )

}