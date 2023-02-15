import style from '../styles/test.module.css'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Site() {

    const images = [
        "https://www.udiscovermusic.com/wp-content/uploads/2019/06/Imagine-Dragons-Evolve-album-cover-820.jpg",
        "https://www.timcantor.com/images/smoke%20-%20mirrors%20(album)lr3.jpg?crc=4085940380",
        "https://upload.wikimedia.org/wikipedia/en/9/95/Origins_cover.png",
        "https://www.udiscovermusic.com/wp-content/uploads/2019/08/Imagine-Dragons-Night-Visions-album-cover-820.jpg",
        "https://i.pinimg.com/originals/bc/2f/23/bc2f23877bbc48bd803a9db39aa8a80a.jpg",
        "https://www.cleveland.com/resizer/UBAj8Q-E7wZRozeKNMsksIpURfg=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/OCFLPUSHJZGX5IH5HNASKNYCTQ.jpg",
        "https://images.genius.com/c0050f4a61002f9c8b7ba95d2861f721.910x910x1.jpg",
        "https://www.giantartists.com/images/pics/15824_thumb.jpg"
    ];

    const names = [
        "Evolve",
        "Mirrors",
        "Origins",
        "Night visions",
        "The fall",
        "Mercury",
        "Natural",
        "Roots"
    ];

    const movementFactor = [
        2,
        1,
        1,
        2,
        2,
        1,
        1,
        2
    ];

    useEffect(() => {
        setUpEvents();
        return () => {
        };
      });

    const movementMultiplier = 0.3;

    return (
        <>
            <div className={style.container}>
                <div className={style.rot}>
                    <div className={style.view}>
                        {images.map((_, i) => (
                            <div key={i} className={style.item}>
                                <div className={style.imgcon}>
                                    <Image src={images[i]} alt="album" className={style.image} width={25} height={25} style={{'--factor': movementFactor[i] * movementMultiplier}}/>
                                </div>
                                <div className={style.description}>
                                    <h3>{names[i]}</h3>
                                    <h4>Imagine Dragons</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

function setUpEvents () {
    document.onmousemove = (e) => {
        document.documentElement.style.setProperty("--x", e.clientX / window.innerWidth);
        document.documentElement.style.setProperty("--y", e.clientY / window.innerHeight);
    }
}
