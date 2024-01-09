import React, { useState } from 'react';
import MarkdownEditor from '../components/MarkdownEditor';
import styles from '../styles/MarkdownEditor.module.scss';
export default function MarkdownEditorTest() {
    const [callback, setCallback] = useState(Function);
    const [display, setDisplay] = useState(false);
    
    function changeDisplay(){
        setDisplay(!display);
        // TODO: trigger callback
    }

    return (
        <>
        <div className={styles.test}>
            <MarkdownEditor isEditable={display}></MarkdownEditor>
        </div>
        <button onClick={changeDisplay}>edit</button>
        </>

    );
}