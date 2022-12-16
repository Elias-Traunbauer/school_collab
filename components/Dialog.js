import styles from '../styles/assignment.module.css';
export function Dialog({children,title = "",handleSave = undefined,id = "dialog"}){
    

    function closeDialog(){
        const dialog = document.getElementById(id);
        if(handleSave != undefined)
            handleSave();

        dialog.close();
    }

    return(
        <dialog id={id} className={styles.dialogwindow}>
            <h1>{title}</h1>
            <div>
                {children}
            </div>
            <button onClick={closeDialog}>{handleSave==undefined?"close":"Save"}</button>
        </dialog>
    )

}

export function openDialog(id){
        const dialog = document.getElementById(id);

        dialog.showModal();
        setTimeout(() => {
            dialog.classList.remove(styles.opendialog);
        }, 300)
}