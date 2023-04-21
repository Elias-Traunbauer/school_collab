import Message from '../components/Message';
import styles from '../styles/Message.module.scss'
export default function MessageTest() {
    return (
       <div className={styles.testContainer}>
            <Message author={{name:'alo',color:'blue'}} text='Me Admin'></Message>
       </div>
    );
}