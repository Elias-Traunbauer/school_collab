import Message from '../components/Message';
import styles from '../styles/Message.module.scss'
export default function MessageTest() {
    return (
       <div className={styles.testContainer}>
            <Message files={[{ name: 'testFile', url: '' }]} author={{ id: 1, name: 's', color: 'red' }} text='Me Admin' displayName={true}></Message>
       </div>
    );
}