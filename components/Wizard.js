import styles from '../styles/Assignment.module.css';
import { useState, useEffect } from 'react'
import Datepicker from '../pages/Datepicker';

export default function Wizard({ callback, contentData = [{ firstname: false, lastname: true }, { email: new Date(), phone: { title: "checkBoxReal", text: "sueee", value: true } }], title = "Wizard", containerWidth = 50 }) {

    const [stateData, setStateData] = useState({
        currIndex: 0,
    });
    let inputList = [];

    const [loadingText, setLaodingText] = useState("loading...");

    useEffect(() => {
        const formList = document.querySelectorAll('input');

        for (let item of formList) {
            item.addEventListener("keydown", (e) => handleKeyDown(e));
        }

        function handleKeyDown(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                stateData.currIndex == contentData.length - 1 ? finishWizard() : nextSection();
            }
        }
    });

    useEffect(() => {
        checkFormFilled(stateData.currIndex);
    }, [checkFormFilled, stateData]);

    function nextSection() {
        const items = document.querySelectorAll('.' + styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.' + styles.wizardLine);
        const formList = document.querySelectorAll('.' + styles.wizardContent);

        if (stateData.currIndex == contentData.length - 1)
            return;

        items[stateData.currIndex + 1].classList.add(styles.filled);
        lines[stateData.currIndex].classList.add(styles.activeLine);

        formList[stateData.currIndex].classList.add(styles.hidden);
        formList[stateData.currIndex + 1].classList.remove(styles.hidden);

        checkFormFilled(stateData.currIndex + 1);
        focusInputField(stateData.currIndex + 1);
        setStateData({
            currIndex: stateData.currIndex + 1,
        });
    }

    function previousSection() {
        const items = document.querySelectorAll('.' + styles.wizzardContainer + ' ul li');
        const lines = document.querySelectorAll('.' + styles.wizardLine);
        const formList = document.querySelectorAll('.' + styles.wizardContent);

        if (stateData.currIndex == 0)
            return;

        items[stateData.currIndex].classList.remove(styles.filled);
        lines[stateData.currIndex - 1].classList.remove(styles.activeLine);

        formList[stateData.currIndex - 1].classList.remove(styles.hidden);
        formList[stateData.currIndex].classList.add(styles.hidden);


        checkFormFilled(stateData.currIndex - 1);
        focusInputField(stateData.currIndex - 1)
        setStateData({
            currIndex: stateData.currIndex - 1,
        });
    }
    function focusInputField(index) {
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        inputList = formList[index].querySelectorAll('input');
        inputList[0].focus();
    }

    function checkFormFilled(index) {
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        inputList = formList[index].querySelectorAll('input');
        for (let item of inputList) {
            if (item.hasAttribute('required') && item.value.length <= 0) {
                document.getElementById('btnNextPage').classList.add(styles.disabeldBtn);
                return;
            }
        }

        document.getElementById('btnNextPage').classList.remove(styles.disabeldBtn);
    }

    function finishWizard() {
        //animation
        document.getElementById('contentWrapper').classList.add(styles.blur);
        document.getElementById('loaderContainer').classList.remove(styles.hidden);
        document.getElementById('loader').classList.add(styles.loading);

        callback(getResult(), setLoadingText, finishLoading);

        //TODO: backend code
    }

    function setLoadingText(text) {
        setLaodingText(text);
    }

    function finishLoading() {
        document.getElementById('loader').classList.remove(styles.loading);
        document.getElementById('loader').classList.add(styles.finished);
    }

    function getResult() {
        const formList = document.querySelectorAll('.' + styles.wizardContent);
        let result = [];
        for (let item of formList) {
            let obj = {};
            for (let input of item.querySelectorAll('input[type="text"]:not([id*="monthInput"]):not([id*="yearInput"])')) {
                obj[input.previousSibling.innerText.replace(' *', '')] = input.value;
            }
            for (let input of item.querySelectorAll('input[type="checkbox"]')) {
                obj[input.name] = input.checked;
            }
            if (Object.keys(obj).length != 0)
                result.push(obj);
        }
        return result;
    }

    function CancelWizard() {
        //backend code
    }

    function printInput(key, item, index) {

        if (item[key] instanceof Date)
            return (
                <div key={index} className={styles.inputContainer}>
                    <label>{key}</label>
                    <Datepicker></Datepicker>
                </div>
            );
        else if (typeof item[key] == "object")
            return (<>
                <div key={index} className={styles.inputContainer}>
                    <div className={styles.chekBoxContainer}>
                        <input name={item[key][Object.keys(item[key])[0]]} type="checkbox" defaultChecked={item[key][Object.keys(item[key])[2]]}></input>
                        <p>{item[key][Object.keys(item[key])[1]]}</p>
                    </div>
                </div>
            </>);
        else
            return (
                <div key={index} className={styles.inputContainer}>
                    <label>{key}{item[key] ? ' *' : ""}</label>
                    <input type='text' onInput={() => checkFormFilled(stateData.currIndex)} required={item[key]}></input>
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
                        <button onClick={stateData.currIndex == 0 ? CancelWizard : previousSection}>{stateData.currIndex == 0 ? "Cancel" : "Back"}</button>
                        <button id='btnNextPage' onClick={(e) => stateData.currIndex == contentData.length - 1 ? finishWizard() : nextSection()} className={styles.disabeldBtn}>{stateData.currIndex == contentData.length - 1 ? "Finish" : "Next"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}