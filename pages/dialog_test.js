import { showDecisionDialog } from "../components/Dialog";
import { useEffect } from "react";

export default function Test () {

    return (
        <>
            <button onClick={() => showDecisionDialog("Test", "This is the test with the number ", "info", () => {}, () => {})}>Info</button>
            <button onClick={() => showDecisionDialog("Test", "This is the test with the number ", "warning", () => {}, () => {})}>Warning</button>
            <button onClick={() => showDecisionDialog("Test", "This is the test with the number ", "error", () => {}, () => {})}>Error</button>
        </>
    );

}