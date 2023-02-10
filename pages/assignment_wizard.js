import styles from '../styles/assignment.module.css';
import { useState,useEffect } from 'react'
export default function AssignmentWizzard(){

    useEffect(() => {
        const formList = document.querySelectorAll('input');

        for (let item of formList) {
            item.addEventListener("keydown",(e)=>handleKeyDown(e));
        }

        function handleKeyDown(e){
            if(e.keyCode == 13){
                console.log(document.getElementById('btnNextPage').classList.contains(styles.disabeldBtn));
                document.getElementById('btnNextPage').classList.contains(styles.disabeldBtn)?"":document.getElementById('btnNextPage').click()
            }
        }
    });

    const [stateData,setStateData] = useState({
        currIndex: 0,
        isLastPage: false,
        isFirstPage:true,
    });
    let inputList = [];
    
    function nextSection(){
        const items = document.querySelectorAll('.'+styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.'+styles.wizardLine);
        const formList = document.querySelectorAll('.' + styles.wizardContent);

        if(stateData.currIndex >= items.length-1)
        return;

        items[stateData.currIndex].classList.remove(styles.active);
        items[stateData.currIndex+1].classList.add(styles.active);
        lines[stateData.currIndex].classList.add(styles.activeLine);

        formList[stateData.currIndex].classList.add(styles.hidden);
        formList[stateData.currIndex+1].classList.remove(styles.hidden);
        
        checkFormFilled(stateData.currIndex+1);
        focusInputField(stateData.currIndex+1);
        setStateData({
            currIndex: stateData.currIndex+1,
            isFirstPage: false,
            isLastPage: stateData.currIndex == inputList.length?true:false
        });
    }

    function previousSection(){
        const items = document.querySelectorAll('.'+ styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.'+styles.wizardLine);
        const formList = document.querySelectorAll('.' + styles.wizardContent);

        if(stateData.currIndex <= 0)
        return;

        items[stateData.currIndex].classList.remove(styles.active);
        items[stateData.currIndex-1].classList.add(styles.active);
        lines[stateData.currIndex-1].classList.remove(styles.activeLine);
        
        formList[stateData.currIndex].classList.add(styles.hidden);
        formList[stateData.currIndex-1].classList.remove(styles.hidden);

        checkFormFilled(stateData.currIndex-1);
        focusInputField(stateData.currIndex-1)
        setStateData({
            currIndex: stateData.currIndex-1,
            isFirstPage: stateData.currIndex-1==0?true:false,
            isLastPage: false
        });
    }
    function focusInputField(index){
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        inputList = formList[index].querySelectorAll('input');
        inputList[0].focus();
    }

    function checkFormFilled(index){
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        inputList = formList[index].querySelectorAll('input');

        for (let item of inputList) {
            if(item.hasAttribute('required') && item.value.length <= 0){
                document.getElementById('btnNextPage').classList.add(styles.disabeldBtn);
                return;
            }
        }
        
        document.getElementById('btnNextPage').classList.remove(styles.disabeldBtn);
    }

    function finishWizard(){
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        const buttons = document.querySelectorAll('.'+styles.wizardButtonContainer)

        formList[formList.length-1].classList.add(styles.hidden);

        for (const item of buttons) {
            item.classList.add(styles.hidden);
        }
        
    }
    function CancelWizard(){

    }

    

    return(
        <>
        <div className={styles.wizzardWrapper}>
            <div className={styles.wizzardContainer}>
                <div className={styles.bumper}></div>
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
                            <input onInput={() => checkFormFilled(stateData.currIndex)}></input>
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <div className={styles.inputHeader}>
                                <label>2</label>
                            <label>required</label>
                            </div>
                            <input onInput={() => checkFormFilled(stateData.currIndex)} required></input>
                        </div>
                    </form>
                    <form className={`${styles.wizardContent} ${styles.hidden}`}>
                        <div className={styles.inputContainer}>
                            <label>2</label>
                            <input onInput={() => checkFormFilled(stateData.currIndex)} required></input>
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <label>2</label>
                            <input onInput={() => checkFormFilled(stateData.currIndex)} required></input>
                        </div>
                    </form>
                    <form className={`${styles.wizardContent} ${styles.hidden}`}>
                        <div className={styles.inputContainer}>
                            <label>3</label>
                            <input onInput={() => checkFormFilled(stateData.currIndex)} required></input>
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <label>3</label>
                            <input onInput={() => checkFormFilled(stateData.currIndex)} required></input>
                        </div>
                    </form>
                    <form className={`${styles.wizardContent} ${styles.hidden}`}>
                        <div className={styles.inputContainer}>
                            <label>4</label>
                            <input onInput={() => checkFormFilled(stateData.currIndex)} required></input>
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <label>4</label>
                            <input onInput={() => checkFormFilled(stateData.currIndex)} required></input>
                        </div>
                    </form>
                </div>

                <div className={styles.wizardButtonContainer}>
                    <button onClick={stateData.isFirstPage? CancelWizard: previousSection}>{stateData.isFirstPage?"Cancel":"Back"}</button>
                    <button id='btnNextPage' onClick={stateData.isLastPage ? finishWizard : nextSection} className={styles.disabeldBtn}>{stateData.isLastPage? "Finish" : "Next"}</button>
                </div>
            </div>
        </div>
        </> 
    )
}