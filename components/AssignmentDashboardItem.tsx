import Assignment from "../models/Assignment";
import styles from '../styles/Index.module.scss'

export default function AssignmentDashboardItem({assignment}: {assignment: Assignment}){
    
    function PrintDate(){
        let date = new Date(assignment.due);
        // dd.mm.yyyy
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }
    
    return (
        <div className={styles.assignmentDashboardItemContainer}>
                <div className={styles.assignmentTextContainer}>
                    <div>
                        <p>{assignment.subject.shortName}</p>
                    </div>
                    <div>
                        <h4>{assignment.title}</h4>
                        <label>{assignment.description}</label>
                    </div>
                </div>
                <label>{PrintDate()}</label>
        </div>
    )
}