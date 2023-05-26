import React from 'react';
import MarkdownEditor from '../components/MarkdownEditor';
import styles from '../styles/MarkdownEditor.module.scss';
export default function MarkdownEditorTest() {
    return (
        <div className={styles.test}>
            <MarkdownEditor></MarkdownEditor>
        </div>
        
    );
}