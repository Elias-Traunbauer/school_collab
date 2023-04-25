import style from '../styles/Secret.module.css'

export default function Secret() {
    // This page is only accessible by logged in users
    // If the user is not logged in, they will be redirected to "/login"
    // You can also pass a custom object to the `redirect` prop
    // to redirect to a different page with custom state

    return ( 
    <>
    <h1>Secret page 🤫</h1>
    <div className={style.secret}>
        <img src="rausch.png"></img>
    </div>
    </>
    )
}