import styles from '../styles/Assignment.module.css';
import { useState, useEffect } from 'react'
import Datepicker from './Datepicker';
import React from 'react';

export default function Wizard({ callback, contentData = [{ firstname: false, lastname: true },{dropdown:['1','2','3']},{ email: new Date(), phone: { title: "checkBoxReal", text: "sueee", value: true } }], title = "Wizard", containerWidth = 50 }) {
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
    }

    function previousSection() {
        displayPage(currentPage-1);
        setCurrentPage(currentPage-1);
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
        let btn:HTMLButtonElement = document.getElementById('btnNextPage') as unknown as HTMLButtonElement;

        for (let item of inputList) {
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
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        let result:HTMLElement[] = [];
        for (let item of formList) {
            let obj = {};
            for (let input of item.querySelectorAll<HTMLInputElement>('input[type="text"]:not([id*="monthInput"]):not([id*="yearInput"])')) {
                obj[(input.previousSibling as HTMLLabelElement).innerText.replace(' *', '')] = input.value;
            }
            for (let input of item.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) {
                obj[input.name] = input.checked;
            }
            if (Object.keys(obj).length != 0)
                result.push(obj as HTMLElement);
        }
        return result;
    }

    function CancelWizard() {
        //backend code
    }

    function printInput(key, item, index) {

        if (item[key] instanceof Date)
            return (
                <div className={styles.dateWrapper}>
                    <div key={'wzContent_'+index} className={styles.inputContainer}>
                        <Datepicker title={key}></Datepicker>
                    </div>
                </div>
            );
        else if (item[key] instanceof Array)
            return (
                <div key={'wzContent_'+index} className={styles.inputContainer}>
                    <label>{key}</label>
                    <select>
                        {item[key].map((item, index) => {
                            return (
                                <option key={'option_'+index}>{item}</option>
                            )
                        })}
                    </select>
                </div>
            )
        else if (typeof item[key] == "object")
            return (<>
                <div key={'wzContent_'+index} className={styles.inputContainer}>
                    <div className={styles.chekBoxContainer}>
                        <input name={item[key][Object.keys(item[key])[0]]} type="checkbox" defaultChecked={item[key][Object.keys(item[key])[2]]}></input>
                        <p>{item[key][Object.keys(item[key])[1]]}</p>
                    </div>
                </div>
            </>);
        else
            return (
                <div key={'wzContent_'+index} className={styles.inputContainer}>
                    <label>{key}{item[key] ? ' *' : ""}</label>
                    <input type='text' onInput={() => checkFormFilled(currentPage)} required={item[key]}></input>
                </div>
            )
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
                                            Object.keys(item).map((key, index) => {
                                                return (
                                                    printInput(key, item, index)
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