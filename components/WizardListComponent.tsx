import { useState } from "react";
import WizardField from "../models/WizardField";
import Image from 'next/image'
export default function WizardListComponent({field}:{field:WizardField}) {
    const [list, setList] = useState(field.value.value);
    console.log(list);
    return (
        <div>
            {
                list.map((item,index) => {
                    return (
                        <div key={index}>
                            <input type="text" defaultValue={item} ></input>
                            <button>
                                <Image src="/delete.svg" alt="delete" width={20} height={20} />
                            </button>
                        </div>
                    )
                })
            }
        </div>
    );
}