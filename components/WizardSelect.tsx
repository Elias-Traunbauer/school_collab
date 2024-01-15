import { use, useEffect, useState } from "react";
import WizardField from "../models/WizardField";
import styles from '../styles/WizardSelect.module.scss'
import {getAllGroups} from "../services/Group.service";
import { useRouter } from "next/router";
import selectStyles from "../styles/Select.module.scss";
import SelectItem from "../models/SelectItem";

export default function WizardSelect({items,required,onChangeFunc,formIndex}: {formIndex:number,items: SelectItem[],required:boolean,onChangeFunc: (number,boolean?)=>void}) {
    const router = useRouter();
    const [selected, setSelected] = useState<SelectItem>(items[0]);
    const [groups, setGroups] = useState<SelectItem[]>([]);

    return (
        <div className={selectStyles.container}>
            <select className={selectStyles.select} onChange={(e)=>onChangeFunc(formIndex,required)} required={required}>
                {
                    items.map((item,index)=>{
                        return <option key={index} value={item.value}>{item.displayText}</option>
                    })
                }
            </select>
        </div>
    )
}