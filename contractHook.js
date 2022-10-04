import { Contract, utils } from "ethers";
import { useCall, useMethod } from "../utils/web3Hooks";

// Replace with real address
export const contractAddress = {
    3: '',
    97: '',
};

// Replace with real ABI
const contractAbi = []

export const contractInterface = new utils.Interface(contractAbi);

export const contract = (address) => new Contract(address, contractInterface)

export const useContractMethod = (fnName) => {
    const { chainId } = useWeb3React();
    return useMethod(contract(contractAddress[parseInt(chainId)]), fnName)
}

export const useContractCall = (fnName, args = []) => {
    const { chainId } = useWeb3React();
    return useCall(contract(contractAddress[parseInt(chainId)]), fnName, args);
}
