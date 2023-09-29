import styles from '../styles/Dialog.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';

/// DecisionDialog Component
/// @param {string} title - Title of the dialog
/// @param {string} message - Message of the dialog
/// @param {function} confirmCallback - Callback function for the confirm button
/// @param {function} cancelCallback - Callback function for the cancel button
/// @param {string} type - Type of the dialog (info, warning, error, success)
/// @param {string} id - Id of the dialog
export function DecisionDialog({ message, title = "Information", confirmCallback, cancelCallback, type = "info", id = "dialog" }) {

    function finishDialog(e, accepted) {
        const dialog = document.getElementById(id);
        dialog.classList.add(styles.invisible);
        setTimeout(() => {
            (window as any).removeDialog();
            }, 500);
        if (accepted) {
            if (confirmCallback != undefined)
                confirmCallback();
        }
        else {
            if (cancelCallback != undefined)
                cancelCallback();
        }
    }

    let color = type == "info" ? "#1A03C5" : type == "warning" ? "#c87b24" : type == "error" ? "red" : "green";

    return (
        <>
            <div className={styles.dialog_background + ' invisible'} id={id} onMouseDown={(event) => { (window as any).dialog_click_outside = event.target == document.getElementById(id); }} onClick={(event) => { if (event.target == document.getElementById(id) && (window as any).dialog_click_outside) finishDialog(null, false) }}>
                <div className={styles.dialog}>
                    <h1 className={styles.dialog_title} style={{ backgroundColor: color }}>{title}</h1>
                    <div className={styles.dialog_content}>
                        {message}
                    </div>
                    <div className={styles.dialog_buttons}>
                        <button onClick={(e) => finishDialog(e, false)}>Cancel</button>
                        <button className='time_unlock' onClick={(e) => finishDialog(e, true)}>Confirm</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export function DialogContainer() {

    const [ dialog, setDialog ] = useState<{title:string, message:string, type:"info"|"warning"|"error"|"",confirmCallback:any, cancelCallback: any, id:string}>(null);
    
    function showDecisionDialog(title, message, type, confirmCallback, cancelCallback) {
        (window as any).dialog_click_outside = false;
        if ((window as any).dialog_id == undefined) {
            (window as any).dialog_id = 0;
        }
        let id = "dialog" + (window as any).dialog_id;
        (window as any).dialog_id = (window as any).dialog_id + 1;
        setDialog({title, message, type, confirmCallback, cancelCallback, id});
    }

    function removeDialog() 
    {
        setDialog(null);
    }

    useEffect(() => {
        (window as any).showDecisionDialog = showDecisionDialog;
        (window as any).removeDialog = removeDialog;
    }, []);

    return (
        <div id="dialog_container">
            {
                dialog != null ? <DecisionDialog id={dialog.id} title={dialog.title} message={dialog.message} confirmCallback={dialog.confirmCallback} cancelCallback={dialog.cancelCallback} type={dialog.type}></DecisionDialog> : null
            }
        </div>
    );
}