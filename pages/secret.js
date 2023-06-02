import style from '../styles/Secret.module.scss'
import Image from 'next/image'

export default function Secret() {
    // This page is only accessible by logged in users
    // If the user is not logged in, they will be redirected to "/login"
    // You can also pass a custom object to the `redirect` prop
    // to redirect to a different page with custom state

    function playSound() {
        var sound = document.getElementById("audio");
        
        sound.onended = function() {
            // exit page
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        };
        sound.play();
    }

    return ( 
    <>
    <h1>Secret page 🤫</h1>
    <audio id="audio" src="/low quality gangam style.mp3"></audio>
    <input className={style.input} type='checkbox' onChange={playSound}/>
    <div className={style.secret}>
        <Image src="/IMG_2506.jpg" alt="rausch" width="100" height="100"></Image>
    </div>
    </>
    )
}