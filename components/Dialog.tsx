import styles from '../styles/Dialog.module.css';
import { createRoot } from "react-dom/client";

/// DecisionDialog Component
/// @param {string} title - Title of the dialog
/// @param {string} message - Message of the dialog
/// @param {function} confirmCallback - Callback function for the confirm button
/// @param {function} cancelCallback - Callback function for the cancel button
/// @param {string} type - Type of the dialog (info, warning, error, success)
/// @param {string} id - Id of the dialog
function DecisionDialog({ children, title = "Information", confirmCallback, cancelCallback, type = "info", id = "dialog" }) {

    function finishDialog(e, accepted) {
        const dialog = document.getElementById(id);
        dialog.classList.add(styles.invisible);
        if (accepted) {
            if (confirmCallback != undefined)
                confirmCallback();
        }
        else {
            if (cancelCallback != undefined)
                cancelCallback();
        }
    }

    let color = type == "info" ? "#727272" : type == "warning" ? "#c87b24" : type == "error" ? "red" : "green";

    return (
        <>
            <div className={styles.dialog_background} id={id} onMouseDown={(event) => { (window as any).dialog_click_outside = event.target == document.getElementById(id); }} onClick={(event) => { if (event.target == document.getElementById(id) && (window as any).dialog_click_outside) finishDialog(undefined, false) }}>
                <div className={styles.dialog}>
                    <h1 className={styles.dialog_title} style={{ backgroundColor: color }}>{title}</h1>
                    <div className={styles.dialog_content}>
                        {children}
                    </div>
                    <div className={styles.dialog_buttons}>
                        <button onClick={(e) => finishDialog(e, true)}>Confirm</button>
                        <button onClick={(e) => finishDialog(e, false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export function showDecisionDialog(title, message, type, confirmCallback, cancelCallback) {
    (window as any).dialog_click_outside = false;
    const dialog_container = document.getElementById("dialog_container");
    if ((window as any).dialog_id == undefined) {
        (window as any).dialog_id = 0;
    }
    let id = "dialog" + (window as any).dialog_id;
    (window as any).dialog_id = (window as any).dialog_id + 1;
    const dialog_root = createRoot(dialog_container);
    dialog_root.render(
        <DecisionDialog title={title} confirmCallback={confirmCallback} cancelCallback={cancelCallback} id={id} type={type}>
            {message}
        </DecisionDialog>
    );
}