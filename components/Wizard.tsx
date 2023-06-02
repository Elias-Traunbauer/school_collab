import styles from '../styles/Assignment.module.scss';
import { useState, useEffect, use } from 'react'
import Datepicker from './Datepicker';
import React from 'react';
import WizardField from '../models/WizardField';
import MarkdownEditor from './MarkdownEditor';
import WizardResult from '../models/WizardResult';
import { useRouter } from 'next/router';

export default function Wizard({ returnPath='/', callback,contentData = [[new WizardField('checkBox','checkBox',{value:true,text:'asdasdasdasd'},true),new WizardField('select','select',[{value:1,displayText:'1'},{value:1,displayText:'2'},{value:1,displayText:'3'}],true)],[new WizardField('date','date',new Date(),true)]], title = "Wizard", containerWidth = 50 }: {returnPath?:string, callback: Function, contentData?: WizardField[][], title: string, containerWidth?: number }) {
        let inputList:HTMLInputElement[] = [];
    const [currentPage,setCurrentPage] = useState(0); 
    const [loadingText, setLoadingText] = useState("loading...");
    const [valid, setValid] = useState(false);
    const router = useRouter();

    useEffect(() => {
        checkFormFilled(0);
        focusInputField(0);
    },[]);

    function displayPage(page){
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
        const selectElements = formList[index].querySelectorAll('select') as unknown as HTMLSelectElement[]; 
        let valid = true;

        for (let item of inputList) {
            if (item.hasAttribute('required') && item.type == 'checkbox' && !item.checked) {
                valid = false;
                console.log('invalid');
                break;
            }
            else if (item.hasAttribute('required') && item.value.length <= 0) {
                valid = false;
                console.log('invalid');
                break;
            }
        }
        
        
        for (let item of selectElements) {
            if (item.hasAttribute('required') && item.value == '-1') {
                valid = false;
                console.log('invalid');
                break;
            }
        }

        console.log('valid: ' + valid);
        setValid(valid);
        
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

    function parseDate(dateString) {
        if (dateString.trim() === '') {
          return null;
        }
        const parts = dateString.split(' ');
        const dateParts = parts[0].split('.');
        const timeParts = parts[1].split(':');
        
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript
        const year = parseInt(dateParts[2], 10);
        const hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10);

        
        return new Date(year, month, day, hour, minute);
      }

    function getResult():WizardResult[] {
        // get all forms
        const inputContainerList = document.querySelectorAll('.' + styles.inputContainer);
        let formIndex = 0;
        let indx = 0;
        const result:WizardResult[] = [];

        for (const item of inputContainerList) {
            const tmpRes:WizardResult = {
                field:contentData[formIndex][indx],
                value:''
            };
            if(contentData[formIndex][indx].type == 'checkBox' || contentData[formIndex][indx].type == 'checkbox' ){
                tmpRes.value = (item.querySelector('input') as HTMLInputElement).checked;
            }
            else if(contentData[formIndex][indx].type == 'select'){
                tmpRes.value = (item.querySelector('select') as HTMLSelectElement).value;
            }
            else if(contentData[formIndex][indx].type == 'date'){
                tmpRes.value = parseDate((item.querySelector('input') as HTMLInputElement).value);
            }
            else if(contentData[formIndex][indx].type == 'markdown'){
                tmpRes.value = (item.querySelector('textarea') as HTMLTextAreaElement).value;
            }
            else{
                tmpRes.value = (item.querySelector('input') as HTMLInputElement).value;
            }
            if(indx == contentData[formIndex].length-1){
                formIndex++;
                indx = 0;
            }
            else{
                indx++;
            }
            result.push(tmpRes);
        }
        return result;
    }

    function CancelWizard() {
        //backend code
        router.push(returnPath);
    }

    function printInput(item:WizardField, formIndex:number, indx:number) {
        

        return(
            <div key={'wzContent_'+formIndex + '_' + indx} className={styles.inputContainer}>
                {
                    !(item.type == 'checkBox' || item.type == 'markdown' || item.type == 'checkbox' || item.type == 'md')&&
                    <label>{item.name}<span>{item.required&&'*'}</span></label>
                }
            {
                item.type == 'markdown' || item.type == 'md'?
                <div className={styles.markdownContainer}>
                    <MarkdownEditor containerWidth={100} isEditable={true}></MarkdownEditor>
                </div>

                :
                item.type == 'date'?
                    <div className={styles.dateContainer}>
                    <Datepicker inputChanged={()=>checkFormFilled(formIndex)} title={item.name} dateParam={item.value} required={item.required}></Datepicker>
                    </div>
                :item.type == 'checkBox' || item.type == 'checkbox'?
                    <div>
                        <input onInput={()=>checkFormFilled(formIndex)} type='checkbox' defaultChecked={item.value.defaultValue} required={item.required} />
                        <p><span>{item.required&& '* '}</span>{item.value.text}</p>
                    </div>
                :item.type == 'select'?
                <select defaultValue={'-1'} onChange={()=>checkFormFilled(formIndex)} required={item.required}>
                {
                    <>
                    <option key='select_-1' value={-1}>Select</option>
                    {
                        item.value.map((option,index) => {
                            return(
                                <option key={'select_'+index} value={option.value}>{option.displayText}</option>
                            )
                        })
                    }

                    </>
                    
                }
            </select>
            :<input onInput={()=>{
                checkFormFilled(formIndex)}} type={item.type} name={item.name} defaultValue={item.value} required={item.required} />
            }
            </div>
        );
    }

    return (
        <>
            <div id='wizzardContainer' style={{ width: containerWidth + '%' }} className={styles.wizzardContainer}>
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

                    <div className={styles.wizardContentContainer}>
                        {
                            contentData.map((item, formIndex) => {
                                return (
                                    <form key={'wizard_content_' + formIndex} className={`${styles.wizardContent} ${formIndex != 0 ? styles.hidden : ""}`}>
                                        {
                                                item.map((item,i) => {
                                                    return (
                                                        printInput(item, formIndex,i)
                                                    )
                                                })
                                        }
                                    </form>
                                )
                            })

                        }
                    </div>
                    <div className={styles.wizardButtonContainer}>
                        <button className={currentPage == 0?'btn btn-cancel':'btn btn-primary'} onClick={currentPage == 0 ? CancelWizard : previousSection}>{currentPage == 0 ? "Cancel" : "Back"}</button>
                        <button disabled={!valid} className='btn btn-primary' id='btnNextPage' onClick={currentPage == contentData.length - 1 ? finishWizard : nextSection}>{currentPage == contentData.length - 1 ? "Finish" : "Next"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}