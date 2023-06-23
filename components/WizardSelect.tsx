import { use, useEffect, useState } from "react";
import WizardField from "../models/WizardField";
import styles from '../styles/WizardSelect.module.scss'
import { compileString } from "sass";

export default function WizardSelect({field,onChange,defaultValue,formIndex,outsideInfo}:{outsideInfo?:string,field?: WizardField,onChange:Function,defaultValue?:string|number,formIndex:number}) {
    
    const [selected, setSelected] = useState(-1);
    const [items, setItems] = useState(field.value);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState(items[defaultValue]?items[defaultValue]:"");

    useEffect(() => {
        if(outsideInfo == "subject"){
            //implement get subjects
        }
        else if(outsideInfo == "group"){
            //implement get groups
        }
    }, []);

    useEffect(() => {
        if(outsideInfo == "subject"){
            //implement get subjects
        }
        else if(outsideInfo == "group"){
            //implement get groups
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
        setSelected(event.target.value);
        if(event.target.value == -1){
            setSearch("");
        }
        else{
            if(items[event.target.value-1])
            setSearch(items[event.target.value-1].displayText);
        }
        
        handleBlur();
    }


    return (
        <div className={styles.contaner}>
            <label>Subject</label>
            <div className={styles.searchSelect}>
                <input value={search} onFocus={handleFocus} onBlur={handleBlur} type="text" id="input" onInput={handleInput} />
                <select onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} defaultValue={defaultValue?defaultValue:-1} required={field.required} className={visible&&styles.visible} id="select">
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