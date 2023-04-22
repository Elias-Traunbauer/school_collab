import styles from '../styles/Assignment.module.css';
import { useState, useEffect } from 'react'
import Datepicker from './Datepicker';
import React from 'react';
import { WizardField } from './models/WizardField';

export default function Wizard({ callback, contentData = [[new WizardField('firstname','checkBox',{value:true,text:'asdasdasdasd'},true),new WizardField('firstname','select',[{value:1,displayText:'süba'},{value:1,displayText:'süba'},{value:1,displayText:'süba'}],true)]], title = "Wizard", containerWidth = 50 }: { callback: Function, contentData?: WizardField[][], title: string, containerWidth?: number }) {
    let inputList:HTMLInputElement[] = [];
    const [currentPage,setCurrentPage] = useState(0); 
    const [loadingText, setLoadingText] = useState("loading...");

    function displayPage(page){
        console.log(page);
        const items = document.querySelectorAll('.' + styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.' + styles.wizardLine);
        const formList = document.querySelectorAll('.' + styles.wizardContent);

        if (page > currentPage) {
            lines[page - 1].classList.add(styles.activeLine);
            items[page].classList.add(styles.activeItem);
            formList[page].classList.remove(styles.hidden);
            formList[page - 1].classList.add(styles.hidden);
            items[page].classList.add(styles.filled);
        }
        else if (page < currentPage) {
            lines[page].classList.remove(styles.activeLine);
            items[page + 1].classList.remove(styles.activeItem);
            formList[page].classList.remove(styles.hidden);
            formList[page + 1].classList.add(styles.hidden);
            items[page + 1].classList.remove(styles.filled);
        }
        checkFormFilled(page);
        focusInputField(page);
    }

    function nextSection() {
        displayPage(currentPage+1);
        setCurrentPage(currentPage+1);
        checkFormFilled(currentPage+1);
    }

    function previousSection() {
        displayPage(currentPage-1);
        setCurrentPage(currentPage-1);
        checkFormFilled(currentPage-1);
    }
    function focusInputField(index) {
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        inputList = formList[index].querySelectorAll('input') as unknown as HTMLInputElement[];
        if (inputList.length > 0)
        inputList[0].focus();
    }

    function checkFormFilled(index) {
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        inputList = formList[index].querySelectorAll('input') as unknown as HTMLInputElement[];
        console.log(inputList);
        let btn:HTMLButtonElement = document.getElementById('btnNextPage') as unknown as HTMLButtonElement;
        const selectElements = formList[index].querySelectorAll('select') as unknown as HTMLSelectElement[]; 

        for (let item of inputList) {
            if (item.hasAttribute('required') && item.value.length <= 0) {
                btn.classList.add(styles.disabeldBtn);
                return;
            }
            else if (item.hasAttribute('required') && item.type == 'checkbox' && !item.checked) {
                btn.classList.add(styles.disabeldBtn);
                return;
            }
        }

        for (let item of selectElements) {
            if (item.hasAttribute('required') && item.value.length <= 0) {
                btn.classList.add(styles.disabeldBtn);
                return;
            }
        }

        btn.classList.remove(styles.disabeldBtn);
    }

    function finishWizard() {
        //animation
        const contentWrapper = document.getElementById('contentWrapper') as HTMLDivElement;
        const loaderContainer = document.getElementById('loaderContainer') as HTMLDivElement;
        const loader = document.getElementById('loader') as HTMLDivElement;

        contentWrapper.classList.add(styles.blur);
        loaderContainer.classList.remove(styles.hidden);
        loader.classList.add(styles.loading);

        callback(getResult(), callbackLoadingText, finishLoading);

        //TODO: backend code
    }

    function callbackLoadingText(text) {
        setLoadingText(text);
    }

    function finishLoading() {
        const loader = document.getElementById('loader') as HTMLDivElement;
        loader.classList.remove(styles.loading);
        loader.classList.add(styles.finished);
    }

    function getResult() {
        return contentData;
    }

    function CancelWizard() {
        //backend code
    }

    function printInput(item:WizardField, index) {

        return(
            <div key={'wzContent_'+index} className={styles.inputContainer}>
                {
                    item.type != 'checkBox'&&
                    <label>{item.name}<span>{item.required&&'*'}</span></label>
                }
            {
                item.type == 'date'?
                    <Datepicker onInput={()=>checkFormFilled(index)} title={item.name} dateParam={item.value} required={item.required}></Datepicker>
                :item.type == 'checkBox'?
                    <div>
                        <input onInput={()=>checkFormFilled(index)} type='checkbox' defaultChecked={item.value.defaultValue} required={item.required} />
                        <p><span>{item.required&& '* '}</span>{item.value.text}</p>
                    </div>
                :item.type == 'select'?
                <select onSelect={()=>checkFormFilled(index)} required={item.required}>
                {
                    item.value.map((option,index) => {
                        return(
                            <option key={'select_'+index} value={option.value} selected={false}>{option.displayText}</option>
                        )
                    })
                }
            </select>
            :<input onInput={()=>checkFormFilled(index)} type={item.type} name={item.name} defaultValue={item.value} required={item.required} />
            }
            </div>
        );
    }

    return (
        <>
            <div id='wizzardContainer' style={{ minWidth: containerWidth + '%' }} className={styles.wizzardContainer}>
                <div id='loaderContainer' className={`${styles.loader} ${styles.hidden}`}>
                    <div id='loader'></div>
                    <p>{loadingText}</p>
                </div>
                <div id='contentWrapper' className={styles.contenWrapper}>
                    <h1 className={styles.wizardheading}>{title}</h1>
                    <ul>
                        {
                            contentData.length > 1 &&
                            contentData.map((item, index) => {
                                return (
                                    <>
                                        <li key={'wizzard_' + index} className={index == 0 ? styles.filled : ""}>{index + 1}</li>
                                        {index != contentData.length - 1 ?
                                            <div className={styles.wizardLine}></div>
                                            : <></>
                                        }
                                    </>
                                )

                            })
                        }
                    </ul>

                    <div style={{ minWidth: containerWidth + '%' }} className={styles.wizardContentContainer}>
                        {
                            contentData.map((item, index) => {
                                return (
                                    <form key={'wizard_content_' + index} className={`${styles.wizardContent} ${index != 0 ? styles.hidden : ""}`}>
                                        {
                                            item.map((item, index) => {
                                                return (
                                                    printInput(item, index)
                                                )
                                            })
                                        }

                                    </form>
                                )
                            })

                        }
                    </div>
                    <div className={styles.wizardButtonContainer}>
                        <button onClick={currentPage == 0 ? CancelWizard : previousSection}>{currentPage == 0 ? "Cancel" : "Back"}</button>
                        <button id='btnNextPage' onClick={(e) => currentPage == contentData.length - 1 ? finishWizard() : nextSection()} className={styles.disabeldBtn}>{currentPage == contentData.length - 1 ? "Finish" : "Next"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}