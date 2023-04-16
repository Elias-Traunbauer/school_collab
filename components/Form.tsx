import style from '../styles/Form.module.scss'

export default function Form({ children, onSubmit, submitText, title }: { children?: any, onSubmit: Function, submitText: string, title: string }) {

    function onSubmitInternal(e) {
        const data = new FormData(e);
        const value = Object.fromEntries(data.entries());
        onSubmit(value);
    }

    function formSubmit(e) {
        e.preventDefault();

        onSubmitInternal(e.target);
    }
    
    return (
        <form className={style.form} onSubmit={formSubmit} id="form">
            <h1>{title}</h1>
            {children}
            <button onClick={() => onSubmitInternal(document.getElementById('form'))}>{submitText}</button>
        </form>
    )
}