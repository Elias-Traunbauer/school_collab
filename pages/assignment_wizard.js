import styles from '../styles/assignment.module.css';
import { useState,useEffect } from 'react'
import { object } from 'prop-types';
export default function AssignmentWizzard(){

    let currentIndex = 0;

    function nextSection(){
        const items = document.querySelectorAll('.'+styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.'+styles.wizardLine);
        
        if(currentIndex >= items.length-1)
        return;

            items[currentIndex].classList.remove(styles.active);
            currentIndex++;
            items[currentIndex].classList.add(styles.active);
            lines[currentIndex-1].classList.add(styles.activeLine);
        
        
    
    }

    function previousSection(){
        const items = document.querySelectorAll('.'+styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.'+styles.wizardLine);
        if(currentIndex <= 0)
        return;

        items[currentIndex].classList.remove(styles.active);
        currentIndex--;
        items[currentIndex].classList.add(styles.active);
        lines[currentIndex].classList.remove(styles.activeLine);

    }

    

    return(
        <div className={styles.wizzardWrapper}>
            <div className={styles.wizzardContainer}>
                <ul>
                    <li className={styles.active}>1</li>
                    <div className={styles.wizardLine}></div>
                    <li>2</li>
                    <div className={styles.wizardLine}></div>
                    <li>3</li>
                    <div className={styles.wizardLine}></div>
                    <li>4</li>
                </ul>
                <div className={(styles.wizardContent,styles.displayContent)}>
                    <form>
                        <div className={styles.inputContainer}>
                            <label>Name</label>
                            <input></input>
                        </div>
                        <label>Name</label>
                        <input></input>
                        
                    </form>
                    <div>
                        <button onClick={nextSection} className={styles.btnNext}>Next</button>
                        <button onClick={previousSection} className={styles.btnback}>Back</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
