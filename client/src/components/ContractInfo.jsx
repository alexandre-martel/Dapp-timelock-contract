import React, { useEffect, useState } from "react";
import { getContractBalanceInETH } from "../utils/contractServices";

function ContractInfo({ account }) {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const balance = await getContractBalanceInETH();
            setBalance(balance);
        };
        fetchBalance();
    }, []);

    return (
        <div className="contract-info">
            <h2>Contract Info</h2>
            <p>Account: {account}</p>
            <p>Contract Balance: {balance} ETH</p>
        </div>
    );
}