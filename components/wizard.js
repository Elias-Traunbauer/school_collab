import styles from '../styles/assignment.module.css';
import { useState,useEffect } from 'react'
export default function Wizard({callback,contentData=[{firstname: false,lastname: true,email: true,}],title="Wizard",containerWidth=50}){
    
    const [stateData,setStateData] = useState({
        currIndex: 0,
    });
    let inputList = [];

    useEffect(() => {
        const formList = document.querySelectorAll('input');

        for (let item of formList) {
            item.addEventListener("keydown",(e)=>handleKeyDown(e));
        }

        function handleKeyDown(e){
            if(e.keyCode == 13){
                console.log('enter');
                e.preventDefault();
                stateData.currIndex == contentData.length-1 ? finishWizard() : nextSection();
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

        if(stateData.currIndex == contentData.length-1)
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
        //animation
        document.getElementById('wizzardContainer').classList.add(styles.blur);
        
        
        callback(getResult(),setLoadingText,finishLoading);
        console.log("Wizard Finished");

        //TODO: backend code
    }

    function setLoadingText(text){
        
    }

    function finishLoading(){
        document.getElementById('wizzardContainer').classList.remove(styles.blur);
    }

    function getResult(){
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        let result = [];
        for (let item of formList) {
            let obj = {};
            for (let input of item.querySelectorAll('input')) {
                obj[input.previousElementSibling.innerText] = input.value;
            }
            result.push(obj);
        }
        return result;
    }

    function CancelWizard(){
        //backend code
    }

    return(
        <>
        <div id='wizzardWrapper' className={styles.wizzardWrapper}>
            <div id='wizzardContainer' style={{minWidth:containerWidth+'%'}} className={styles.wizzardContainer}>
                <h1 className={styles.wizardheading}>{title}</h1>
                <ul>
                    {
                        contentData.map((item,index) => {
                            return(
                            <>
                                <li key={'wizzard_'+index} className={index == 0?styles.filled:""}>{index+1}</li>
                                {index != contentData.length-1?
                                    <div className={styles.wizardLine}></div>
                                    :<></>
                                }
                                
                            </>
                            )
                        })

                    }
                </ul>

                <div style={{minWidth: containerWidth + '%'}} className={styles.wizardContentContainer}>
                    {
                        contentData.map((item,index) => {
                            return(
                                <form key={'wizard_content_'+index} className={`${styles.wizardContent} ${index != 0?styles.hidden:""}`}>
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
                    <button id='btnNextPage' onClick={(e)=>stateData.currIndex == contentData.length-1 ? finishWizard() : nextSection()} className={styles.disabeldBtn}>{stateData.currIndex == contentData.length-1? "Finish" : "Next"}</button>
                </div>              
            </div>
            
        </div>
        </> 
    )
}