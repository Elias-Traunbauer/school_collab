import Link from 'next/link'
import Wizard from '../components/Wizard'
import styles from '../styles/WizardTest.module.css'
import React from 'react';
import WizardField from "../models/WizardField"
import WizardResult from '../models/WizardResult';
import { useRouter } from 'next/router';
export default function WzTest() {
    const router = useRouter();
    function callback(data:WizardResult[], setLoadingText, finishLoading){
        console.log(data);
        setLoadingText("Penis...");
        setTimeout(() => {
            finishLoading();
            setLoadingText("done!");
            router.push("/");
        }, 2000);
    };

    const allOptions = [
        [new WizardField('List','list',{min:1,max:4,value:["a","b"]},false),new WizardField('nnnn','list',{min:1,max:4,value:["a","b"]},false)],
        [new WizardField('22','list',{min:1,max:4,value:["a","b"]},false),new WizardField('33','list',{min:1,max:4,value:["a","b"]},false)],
        [new WizardField('text','text','hallo',true),new WizardField('text','text','hallo',false)],
        [new WizardField('checkBox','checkBox',{value:false,text:'asdasdasdasd'},true),new WizardField('checkbox','checkbox',{value:true,text:'asdasdasdasd'},false)],
        [new WizardField('date','date',new Date(),true),new WizardField('date','date',new Date(),false)],
        [new WizardField('markdown','markdown','hallo',false),new WizardField('md','markdown','# hallo',false)],
        [new WizardField('select','select',[{value:1,displayText:'1'},{value:1,displayText:'2'},{value:1,displayText:'3'}],true),new WizardField('select','select',[{value:1,displayText:'1'},{value:1,displayText:'2'},{value:1,displayText:'3'}],false)],
        
    ];

    const ListOptions = [
        [new WizardField('List','list',{min:1,max:4,value:["a","b"]},false),new WizardField('nnnn','list',{min:1,max:4,value:["a","b"]},false)],      
    ];



    return (
        <Wizard contentData={ListOptions} title='Test' callback={callback}></Wizard>
    );

}