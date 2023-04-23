import Message from '../components/Message';
import styles from '../styles/Message.module.scss'
export default function MessageTest() {
    return (
       <div className={styles.testContainer}>
            <Message files={[{name:'testFile',url:''}]} author={{name:'alo',color:'blue'}} text='Me Admin'></Message>
       </div>
    );
}