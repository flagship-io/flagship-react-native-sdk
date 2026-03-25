import { useContext } from "react";
import { ABTastyQAContext } from "./ABTastyQAContext";

export function useABTastyQA() {
    return useContext(ABTastyQAContext);
}