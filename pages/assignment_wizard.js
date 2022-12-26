import styles from '../styles/assignment.module.css';
import { useState,useEffect } from 'react'
import { object } from 'prop-types';
export default function AssignmentWizzard(){

    let currentIndex = 0;
    const positions = [styles.position0,styles.position1,styles.position2,styles.position3];

    function nextSection(){
        const items = document.querySelectorAll('.'+styles.wizzardContainer + ' ul li');
        const line = document.getElementById('line');
        if(currentIndex >= items.length-1)
        return;

        if(currentIndex-2 >= 0)
            line.classList.remove(positions[currentIndex]);
            line.classList.add(positions[currentIndex+1]);    

        setTimeout(() => {
            items[currentIndex].classList.remove(styles.active);
            currentIndex++;
            items[currentIndex].classList.add(styles.active);
        }, 900)
        
        
    
    }

    function previousSection(){
        const items = document.querySelectorAll('.'+styles.wizzardContainer + ' ul li');
        if(currentIndex <= 0)
        return;

            line.classList.remove(positions[currentIndex]);
            line.classList.add(positions[currentIndex-1]);

        items[currentIndex].classList.remove(styles.active);
        currentIndex--;
        items[currentIndex].classList.add(styles.active);
    }

    

    return(
        <div className={styles.wizzardWrapper}>
            <div className={styles.wizzardContainer}>
                <ul>
                    <li className={styles.active}>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
                <div id='line' className={styles.wizardLine}></div>
                <div>
                    <button onClick={nextSection}>next</button>
                    <button onClick={previousSection}>back</button>
                </div>
            </div>
        </div>
        
    )
}
