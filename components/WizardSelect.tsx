import { use, useEffect, useState } from "react";
import WizardField from "../models/WizardField";
import styles from '../styles/WizardSelect.module.scss'
import {getAllGroups} from "../services/Group.service";
import { useRouter } from "next/router";

export default function WizardSelect({field,onChange,defaultValue,formIndex,selectType,required=false}:{required?:boolean,selectType?:string,field?: WizardField,onChange:Function,defaultValue?:string|number,formIndex:number}) {
    
    const [selected, setSelected] = useState(-1);
    const [items, setItems] = useState(field?field.value:[]);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState(items[defaultValue]?items[defaultValue]:"");
    const router = useRouter();

    useEffect(() => {
        if(selectType == "subject"){
            //implement get subjects
        }
        else if(selectType == "group"){
            getAllGroups().then((res)=>{
                console.log(res);
                const tmpGroup = [];
                res.map((group)=>{
                    tmpGroup.push({value:group.id,displayText:group.name});
                })
                console.log(tmpGroup);
            }).catch((err)=>{
                console.log(err);
            });
        }
    }, [router]);

    useEffect(() => {
        if(selectType == "subject"){
            //implement get subjects
        }
        else if(selectType == "group"){
            getAllGroups().then((res)=>{
                console.log(res);
                const tmpGroup = [];
                res.map((group,index)=>{
                    tmpGroup.push({value:group.id,displayText:group.name});
                })
                setItems(tmpGroup);
            }).catch((err)=>{
                console.log(err);
            });
        }
        else if (search != "") {
            const filteredItems = field.value.filter((item) => {
                return item.displayText.toLowerCase().includes(search.toLowerCase());
            });
            setItems(filteredItems);
            console.log(filteredItems);
        }
        else {
            setItems(field.value);
        }
    }, [search]);


    function handleInput(event) {
        setSearch(event.target.value);
    }

    function handleBlur() {
        onChange(formIndex);
        setVisible(false);
    }

    function handleFocus(){
        setVisible(true);
    }

    function handleChange(event) {
        // index of item in items
        setSelected(event.target.value);
        const index = items.findIndex((item) => {
            return item.value == event.target.value;
        });

        if(event.target.value == -1){
            setSearch("");
        }
        else{
            if(items[index])
            setSearch(items[index].displayText);
        }
        
        handleBlur();
    }


    return (
        <div className={styles.contaner}>
            <div className={styles.searchSelect}>
                <input autoComplete={"false"} value={search} onFocus={handleFocus} onBlur={handleBlur} type="text" id="input" onInput={handleInput} />
                <select onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} defaultValue={defaultValue?defaultValue:-1} required={field?field.required:required} className={visible&&styles.visible} id="select">
                   {
                    !defaultValue&&
                    <option key='select_-1' value={-1}>Select</option>
                   }
                {
                    items&&
                    items.map((option, index) => {
                        return (
                            <option key={'select_' + index} value={option.value}>{option.displayText}</option>
                        )
                    })
                }
                </select>
            </div>
        </div>
    )
}