import { useState } from "react";
import WizardField from "../models/WizardField";
import Image from "next/image";
import styles from "../styles/WizardListComponent.module.scss";
export default function WizardListComponent({field, validation,formIndex}) {
    


const [list, setList] = useState(field.value.value);

function deleteItem(index: number) {
  let newList = list;
  newList.splice(index, 1);
  setList([...newList]);
}
function addItem() {
  let newList = list;
  newList.push("");
  setList([...newList]);
}

function validateList(){
    validation(formIndex);
}

return (
  <div className={styles.container}>
    {list.map((item, index) => {
      return (
        <>
          <div key={index}>
            <input required={index<=field.value.min} className={index<=field.value.min?styles.requredInput:""} onInput={validateList} type="text" defaultValue={item}>
            </input>
            {list.length > field.value.min && index > field.value.min && (
              <button type="button" onClick={() => deleteItem(index)}>
                <Image
                  src="/delete.svg"
                  alt="delete"
                  width={20}
                  height={20}
                />
              </button>
            )}
          </div>
          
        </>
      );
    })}
    {list.length < field.value.max && (
            <button type="button" onClick={addItem}>Add</button>
          )}
  </div>
);
}