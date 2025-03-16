import { withdrawFund } from "../utils/contractServices";
import { depositFund } from "../utils/contractServices";
import React, { useState } from "react";
import { toast } from "react-toastify";

function ContractActions() {
    const [depositValue, setDepositValue] = useState("");

    const handleDeposit = async () => {
        try {
            await depositFund(depositValue);
            console.log("depositValue ----->", depositValue);
            toast.success("Funds deposited successfully");
        } catch (error) {
            console.error("Error depositing funds:", error.message);
            toast.error("Error depositing funds");
        }
    };

    const handleWithdraw = async () => {
        try {
            await withdrawFund();
            toast.success("Funds withdrawn successfully");
        } catch (error) {
            console.error("Error withdrawing funds:", error.message);
            toast.error("Error withdrawing funds");
        }
    };

    return (
        <div className="contract-actions">
            <input
                type="number"
                placeholder="Enter deposit amount in ETH"
                value={depositValue}
                onChange={(e) => setDepositValue(e.target.value)}
            />
            <button onClick={handleDeposit}>Deposit Funds</button>
            <button onClick={handleWithdraw}>Withdraw Funds</button>
        </div>
    );
}

export default ContractActions;