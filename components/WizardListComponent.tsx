import { useState } from "react";
import WizardField from "../models/WizardField";
import Image from "next/image";
import styles from "../styles/WizardListComponent.module.scss";

export default function WizardListComponent({ field }: { field: WizardField }) {
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

  return (
    <div className={styles.container}>
      {list.map((item, index) => {
        return (
          <>
            <div key={index}>
              <input type="text" defaultValue={item}></input>
              {list.length > field.value.min && (
                <button onClick={() => deleteItem(index)}>
                  <Image
                    src="/delete.svg"
                    alt="delete"
                    width={20}
                    height={20}
                  />
                </button>
              )}
            </div>
            {list.length < field.value.max && (
              <button onClick={addItem}></button>
            )}
          </>
        );
      })}
    </div>
  );
}
