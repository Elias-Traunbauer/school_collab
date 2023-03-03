import styles from '../styles/assignment.module.css';
import { useState,useEffect } from 'react'
export default function AssignmentWizzard({data,title="Wizard",width=60}){
    
    const [stateData,setStateData] = useState({
        currIndex: 0,
    });
    let inputList = [];
    const mockData = [
        {
            firstname: false,
            lastname: true,
            email: true,
        }
    ,
        {
            firstname: false,
            lastname: false,
            email: false,
        }
    ];

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
    useEffect(() => {
        checkFormFilled(stateData.currIndex);
    },[stateData]);

    
    
    function nextSection(){
        const items = document.querySelectorAll('.'+styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.'+styles.wizardLine);
        const formList = document.querySelectorAll('.' + styles.wizardContent);

        if(stateData.currIndex == mockData.length-1)
        return;
        console.log(stateData.currIndex);

        items[stateData.currIndex+1].classList.add(styles.filled);
        lines[stateData.currIndex].classList.add(styles.activeLine);

        formList[stateData.currIndex].classList.add(styles.hidden);
        formList[stateData.currIndex+1].classList.remove(styles.hidden);
        
        checkFormFilled(stateData.currIndex+1);
        focusInputField(stateData.currIndex+1);
        setStateData({
            currIndex: stateData.currIndex+1,
        });
    }

    function previousSection(){
        const items = document.querySelectorAll('.'+ styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.'+styles.wizardLine);
        const formList = document.querySelectorAll('.' + styles.wizardContent);

        if(stateData.currIndex == 0)
        return;

        items[stateData.currIndex].classList.remove(styles.filled);
        lines[stateData.currIndex-1].classList.remove(styles.activeLine);
        
        formList[stateData.currIndex-1].classList.remove(styles.hidden);
        formList[stateData.currIndex].classList.add(styles.hidden);
        

        checkFormFilled(stateData.currIndex-1);
        focusInputField(stateData.currIndex-1)
        setStateData({
            currIndex: stateData.currIndex-1,
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
            console.log(stateData.currIndex);
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

        console.log("Wizard Finished");
    }

    function CancelWizard(){

    }

    return(
        <>
        <div className={styles.wizzardWrapper}>
            <div className={styles.wizzardContainer}>
                <h1 className={styles.wizardheading}>{title}</h1>
                <ul>
                    {
                        mockData.map((item,index) => {
                            return(
                            <>
                                <li className={index == 0?styles.filled:""}>{index+1}</li>
                                {index != mockData.length-1?
                                    <div className={styles.wizardLine}></div>
                                    :<></>
                                }
                                
                            </>
                            )
                        })

                    }
                </ul>

                <div className={styles.wizardContentContainer}>
                    {
                        mockData.map((item,index) => {
                            return(
                                <form key={index} className={`${styles.wizardContent} ${index != 0?styles.hidden:""}`}>
                                    {
                                        Object.keys(item).map((key,index) => {
                                            return(
                                                <div key={index} className={styles.inputContainer}>
                                                    <label>{key}{item[key]?' *':""}</label>
                                                    <input onInput={() => checkFormFilled(stateData.currIndex)} required={item[key]}></input>
                                                </div>
                                            )
                                        })
                                    }
                                </form>
                        )}
                    )}	
                </div>  
                <div className={styles.wizardButtonContainer}>
                    <button onClick={stateData.currIndex == 0? CancelWizard: previousSection}>{stateData.currIndex == 0?"Cancel":"Back"}</button>
                    <button id='btnNextPage' onClick={(e)=>stateData.currIndex == mockData.length-1 ? finishWizard() : nextSection()} className={styles.disabeldBtn}>{stateData.currIndex == mockData.length-1? "Finish" : "Next"}</button>
                </div>              
            </div>
            
        </div>
        </> 
    )
}