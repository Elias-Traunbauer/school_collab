import styles from "../styles/Summary.module.scss";
import Image from "next/image";

export default function SummaryList() {
  return (
    <div className={styles.header}>
      <div>
        <h2>Summary</h2>
        <div>
            <button>Filter</button>
            <div className={styles.dropdownContent}>
                <button>1</button>
                <button>1</button>
                <button>1</button> 
            </div>
        </div>
        
      </div>
    </div>
  );
}
