import styles from '../styles/Dialog.module.css';
import { createRoot } from "react-dom/client";

/// DecisionDialog Component
/// @param {string} title - Title of the dialog
/// @param {string} message - Message of the dialog
/// @param {function} confirmCallback - Callback function for the confirm button
/// @param {function} cancelCallback - Callback function for the cancel button
/// @param {string} type - Type of the dialog (info, warning, error, success)
/// @param {string} id - Id of the dialog
export function DecisionDialog({children, title = "Information", confirmCallback, cancelCallback, type = "info", id = "dialog"}) {

    function finishDialog(accepted) {
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

    let color = type == "info" ? "#502ff6" : type == "warning" ? "yellow" : type == "error" ? "red" : "green";

    return (
        <>
        <div className={styles.dialog_background} id={id} onMouseDown={(event) => { window.dialog_click_outside = event.target == document.getElementById(id); }} onClick={(event) => {if (event.target == document.getElementById(id) && window.dialog_click_outside) finishDialog(false)}}>
            <div className={styles.dialog}>
                <h1 className={styles.dialog_title} style={{backgroundColor: color}}>{title}</h1>
                <div className={styles.dialog_content}>
                    {children}
                </div>
                <div className={styles.dialog_buttons}>
                    <button onClick={() => finishDialog(true)}>Confirm</button>
                    <button onClick={() => finishDialog(false)}>Cancel</button>
                </div>
            </div>
        </div>
        </>
    );
}

export function showDecisionDialog(title, message, confirmCallback, cancelCallback) {
    window.dialog_click_outside = false;
    const dialog_container = document.getElementById("dialog_container");
    if (window.dialog_id == undefined) {
        window.dialog_id = 0;
    }
    let id = "dialog" + window.dialog_id;
    window.dialog_id = window.dialog_id + 1;
    const dialog_root = createRoot(dialog_container);
    dialog_root.render(
        <DecisionDialog title={title} confirmCallback={confirmCallback} cancelCallback={cancelCallback} id={id}>
            {message}
        </DecisionDialog>
    );
}