import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/MarkdownEditor.module.scss";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { text } from "stream/consumers";

export default function MarkdownEditor({isEditable = true, containerWidth = 50 , defaultText='# Hello'}: {isEditable?: boolean, containerWidth?: number, defaultText?: string}) {
    const [displayState, setDisplayState] = useState(false);
    const [mdText, setMdText] = useState('');
    const contentRef = useRef(null);

    useEffect(()=>{
      highlight();
    })


    function highlight(){
      const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
      setMdText(textArea.value);
      addCodeButtons();
    }

    function addCodeButtons(){
      if(!contentRef.current) return;

      const pres = contentRef.current.querySelectorAll('pre');
      pres.forEach((preElement)=>{ 
        const code = preElement.querySelector('code') as HTMLModElement;
        
        if(!preElement.querySelector('button')){
          const lang = code.className.replace('language-','') || 'text';
          const langElement = document.createElement('p');
          langElement.innerText = lang;

          const button = document.createElement('button');
          button.addEventListener('click', ()=>{
            navigator.clipboard.writeText(preElement.innerText);
          });
  
          const btnwrapper = document.createElement('div');
          btnwrapper.appendChild(langElement);
          btnwrapper.appendChild(button);
          preElement.prepend(btnwrapper);
        }

        if(preElement.querySelector('p'))
          preElement.querySelector('p').innerText = code.className.replace('language-','') || 'text';
      })
    }
    
    function InsertHeading(){
      const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
      const text = textArea.value;
      const selectionStart = textArea.selectionStart;
      const selectionEnd = textArea.selectionEnd;
      const selectedText = text.substring(selectionStart, selectionEnd);
      const newText = text.substring(0, selectionStart) + '# ' + selectedText + text.substring(selectionEnd);
      textArea.value = newText;
      textArea.focus();
      textArea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
      setMdText(newText);
    }

    function InsertCode(){
      const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
      const text = textArea.value;
      const selectionStart = textArea.selectionStart;
      const selectionEnd = textArea.selectionEnd;
      const selectedText = text.substring(selectionStart, selectionEnd);
      const newText = text.substring(0, selectionStart) + '```\n' + selectedText + '\n```' + text.substring(selectionEnd);
      textArea.value = newText;
      textArea.focus();
      textArea.setSelectionRange(selectionStart + 4, selectionEnd + 4);
      setMdText(newText);
    }

    function InsertLink(){
      const textArea:HTMLTextAreaElement = document.getElementById('textArea') as HTMLTextAreaElement;
      const text:string = textArea.value;
      const selectionStart:number = textArea.selectionStart;
      const selectionEnd:number = textArea.selectionEnd;
      let selectedText = text.substring(selectionStart, selectionEnd);
      selectedText = selectedText.length == 0 ? 'name': selectedText;
      const newText:string = text.substring(0, selectionStart) + '[' + selectedText + '](https://)' + text.substring(selectionEnd);
      textArea.value = newText;
      textArea.focus();
      textArea.setSelectionRange(selectionStart + 1, selectionEnd + 1);
      setMdText(newText);
    }
    function InsertQuotes(){
      const textArea:HTMLTextAreaElement = document.getElementById('textArea') as HTMLTextAreaElement;
      const text:string = textArea.value;
      const selectionStart:number = textArea.selectionStart;
      const selectionEnd:number = textArea.selectionEnd;
      const selectedText = text.substring(selectionStart, selectionEnd);
      const newText:string = text.substring(0, selectionStart) + '> ' + selectedText + text.substring(selectionEnd);
      textArea.value = newText;
      textArea.focus();
      textArea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
      setMdText(newText);
    }

    function InsertBold(){
      const textArea:HTMLTextAreaElement = document.getElementById('textArea') as HTMLTextAreaElement;
      const text:string = textArea.value;
      const selectionStart:number = textArea.selectionStart;
      const selectionEnd:number = textArea.selectionEnd;
      const selectedText = text.substring(selectionStart, selectionEnd);
      const newText:string = text.substring(0, selectionStart) + '**' + selectedText + '**' + text.substring(selectionEnd);
      textArea.value = newText;
      textArea.focus();
      textArea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
      setMdText(newText);
    }

    function InsertItalic(){
      const textArea:HTMLTextAreaElement = document.getElementById('textArea') as HTMLTextAreaElement;
      const text:string = textArea.value;
      const selectionStart:number = textArea.selectionStart;
      const selectionEnd:number = textArea.selectionEnd;
      const selectedText = text.substring(selectionStart, selectionEnd);
      const newText:string = text.substring(0, selectionStart) + '*' + selectedText + '*' + text.substring(selectionEnd);
      textArea.value = newText;
      textArea.focus();
      textArea.setSelectionRange(selectionStart + 1, selectionEnd + 1);
      setMdText(newText);
    }

    function InsertBulletpoint(){
      const textArea:HTMLTextAreaElement = document.getElementById('textArea') as HTMLTextAreaElement;
      const text:string = textArea.value;
      const selectionStart:number = textArea.selectionStart;
      const selectionEnd:number = textArea.selectionEnd;
      const selectedText = text.substring(selectionStart, selectionEnd);
      const newText:string = text.substring(0, selectionStart) + '* ' + selectedText + text.substring(selectionEnd);
      textArea.value = newText;
      textArea.focus();
      textArea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
      setMdText(newText);
    }
    
    function InsertNumberdList(){
      const textarea = document.querySelector('textarea');
      const cursorPos = textarea.selectionStart;
      const textContent = textarea.value;
      let prevLineBreak = textContent.lastIndexOf('\n', cursorPos -1);
      let nextLineBreak = textContent.lastIndexOf('\n', prevLineBreak-1);
      const textAboveCursor = textContent.substring(prevLineBreak, nextLineBreak);
      const words = textAboveCursor.split(' ');
      const firstWord = words[0];
      let value:number = 1;
      if (firstWord.trim().match(/^\d+\.$/)){
        value = parseInt(firstWord.trim().match(/\d/).input) + 1;
      }
      textarea.value = textContent.substring(0, cursorPos) + value + '. ' + textContent.substring(cursorPos);
      textarea.focus();
      const selectionPos = cursorPos + value.toString().length + 2
      textarea.setSelectionRange(selectionPos, selectionPos);
      setMdText(textContent);
    }

  return (
    <>
        {
          isEditable ?
              <div style={{ width: containerWidth + "%" }} className={styles.container}>
              <div className={styles.head}>
                <div onClick={InsertHeading} className={`${styles.img}`}>
                  <div className={styles.imgHeading}></div>
                  <span>Titel</span>
                </div>
                <div onClick={InsertCode} className={`${styles.img}`}>
                  <div className={styles.imgCode}></div>
                  <span>Code</span>
                </div>
                <div onClick={InsertLink} className={`${styles.img}`}>
                  <div className={styles.imgLink}></div>
                  <span>Link</span>
                </div>
                <div onClick={InsertQuotes} className={`${styles.img}`}>
                  <div className={styles.imgBlockQuote}></div>
                  <span>Quotes</span>
                </div>
                <div onClick={InsertBold} className={`${styles.img}`}>
                  <div className={styles.imgBold}></div>
                  <span>Fett</span>
                </div>
                <div onClick={InsertItalic} className={`${styles.img}`}>
                  <div className={styles.imgItalic}></div>
                  <span>Kursiv</span>
                </div>
                <div onClick={InsertBulletpoint} className={`${styles.img}`}>
                  <div className={styles.imgBulletpoint}></div>
                  <span>Bulletpoint</span>
                </div>
                <div onClick={InsertNumberdList} className={`${styles.img}`}>
                  <div  className={styles.imgNumb}></div>
                  <span>Nummer</span>
                </div>
                <div className={`${styles.img}`}>
                    <input onClick={()=>setDisplayState(!displayState)} type="CheckBox"></input>
                    <span>Preview</span>
                </div>
               
              </div>
              <div className={styles.content}>
                <textarea id='textArea' defaultValue={defaultText} onInput={highlight}></textarea>  
                {
                  displayState && mdText.length > 0 ?
                  <div ref={contentRef}>
                    <ReactMarkdown>{mdText}</ReactMarkdown>
                  </div>
                  : displayState &&
                  <div ref={contentRef} className={styles.placeholder}>
                    <h2>Kein Text!</h2>
                    <p>schreiben Sie etwas in die Textbox</p>
                  </div>
                  
                }
                
              </div>
            </div>
            :
              <div className={styles.content}>
                <textarea hidden id='textArea' defaultValue={defaultText} onInput={highlight}></textarea>  
                {
                  mdText.length > 0 ?
                  <div className={styles.background} ref={contentRef}>
                    <ReactMarkdown>{mdText}</ReactMarkdown>
                  </div>
                  : 
                  <div ref={contentRef} className={styles.placeholder}>
                    <h2>Kein Text!</h2>
                  </div>
                  
                }
                
              </div>
        }
    </>


  );
}
