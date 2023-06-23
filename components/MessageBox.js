import style from '../styles/MessageBox.module.scss'

export default function MessageBox () {
    return (
        <div id="message_box" className={style.container}>
        </div>
    );
}

export function showMessage(message, type) {
    const container = document.getElementById('message_box');
    const newMsg = document.createElement('div');
    newMsg.innerText = message;
    container.appendChild(newMsg);
}