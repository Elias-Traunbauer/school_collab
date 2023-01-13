import styles from '../styles/assignment.module.css';
import { useState,useEffect } from 'react'
export default function AssignmentWizzard(){

    const [currentIndex,setCurrentIndex] = useState(0);
    const [formIndex,setFormIndex] = useState(0)
    let inputList = [];

    const [isLastPage,setIsLastPage] = useState(false);
    const [isFirstPage,setIsFirstPage] = useState(true);
    
    function nextSection(){
        
        const items = document.querySelectorAll('.'+styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.'+styles.wizardLine);
        
        if(currentIndex >= items.length-1)
        return;

        items[currentIndex].classList.remove(styles.active);
        items[currentIndex+1].classList.add(styles.active);
        lines[currentIndex].classList.add(styles.activeLine);

        const formList = document.querySelectorAll('.' + styles.wizardContent);
        console.log(formIndex);
        formList[formIndex].classList.add(styles.hidden);
        formList[formIndex+1].classList.remove(styles.hidden);
        inputList = formList[formIndex+1].querySelectorAll('input');
        
        formIndex == inputList.length?setIsLastPage(true):setIsLastPage(false);
        setIsFirstPage(false);
        setCurrentIndex(currentIndex+1);
        setFormIndex(formIndex+1);
        checkFormFilled();
    }

    function previousSection(){
        const items = document.querySelectorAll('.'+ styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.'+styles.wizardLine);
        
        if(currentIndex <= 0)
        return;

        items[currentIndex].classList.remove(styles.active);
        items[currentIndex-1].classList.add(styles.active);
        lines[currentIndex-1].classList.remove(styles.activeLine);

        const formList = document.querySelectorAll('.' + styles.wizardContent);
        
        formList[formIndex].classList.add(styles.hidden);
        formList[formIndex-1].classList.remove(styles.hidden);

        inputList = formList[formIndex-1].querySelectorAll('input');
        formIndex-1==0?setIsFirstPage(true):"";
        setIsLastPage(false);
        setCurrentIndex(currentIndex-1);
        setFormIndex(formIndex-1);
    }

    function checkFormFilled(){
        if(inputList.length == 0){
            const formList = document.querySelectorAll('.' + styles.wizardContent);
            inputList = formList[0].querySelectorAll('input');
            console.log(null);
        }

        for (let item of inputList) {
            console.log(item.hasAttribute('required') && item.value.length <= 0)
            if(item.hasAttribute('required') && item.value.length <= 0){
                document.getElementById('btnNextPage').classList.add(styles.disabeldBtn);
                return;
            }
            
        }

        //console.log(document.getElementById('btnNextPage'))
        document.getElementById('btnNextPage').classList.remove(styles.disabeldBtn);
    }

    function finishWizard(){

    }
    function CancelWizard(){

    }

    

    return(
        <>
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

                <div className={styles.wizardContentContainer}>
                    <form className={styles.wizardContent}>
                        <div className={styles.inputContainer}>
                            <label>1</label>
                            <input onInput={checkFormFilled} required></input>
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <label>1</label>
                            <input onInput={checkFormFilled} required></input>
                        </div>
                    </form>
                    <form className={`${styles.wizardContent} ${styles.hidden}`}>
                        <div className={styles.inputContainer}>
                            <label>2</label>
                            <input onInput={checkFormFilled} required></input>
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <label>2</label>
                            <input onInput={checkFormFilled} required></input>
                        </div>
                    </form>
                    <form className={`${styles.wizardContent} ${styles.hidden}`}>
                        <div className={styles.inputContainer}>
                            <label>3</label>
                            <input onInput={checkFormFilled} required></input>
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <label>3</label>
                            <input onInput={checkFormFilled} required></input>
                        </div>
                    </form>
                    <form className={`${styles.wizardContent} ${styles.hidden}`}>
                        <div className={styles.inputContainer}>
                            <label>4</label>
                            <input onInput={checkFormFilled} required></input>
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <label>4</label>
                            <input onInput={checkFormFilled} required></input>
                        </div>
                    </form>
                </div>

                <div className={styles.wizardButtonContainer}>
                    <button onClick={isFirstPage? CancelWizard: previousSection}>{isFirstPage?"Cancel":"Back"}</button>
                    <button id='btnNextPage' onClick={isLastPage ? finishWizard : nextSection} className={styles.disabeldBtn}>{isLastPage? "Finish" : "Next"}</button>
                </div>
            </div>
        </div>
        </> 
    )
}
