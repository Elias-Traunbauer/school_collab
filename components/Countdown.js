import { useState, useRef, useEffect } from "react";

/// Countdown Component
/// @param {Date} date - Date to count down to
export default function Countdown({date}) {

    function formatDate(seconds) {
        
        const days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        const hrs = Math.floor(seconds / 3600);
        seconds -= hrs * 3600;
        const mnts = Math.floor(seconds / 60);
        seconds -= mnts * 60;

        return days + " Tage " + hrs + " Stunden " + mnts + " Minuten " + Math.floor(seconds) + " Sekunden";

    }
    var time = useRef(0);

    useEffect(()=>{
        time.current = Math.floor((date.getTime() - new Date().getTime()) / 1000);
    });

    const [datetime, setDateTime] = useState("0 Tage 0 Stunden 0 Minuten 0 Sekunden");

    useEffect(() => {

        if(Math.floor(time.current) > 0)
        {
            time.current -= 1;
            setDateTime(formatDate(time.current));
        }

        let i = setInterval(() => {

            if(Math.floor(time.current) > 0)
            {
                time.current -= 1;
                setDateTime(formatDate(time.current));
            }
        }, 1000);
        return () => clearInterval(i);
    }, []);

    return <p>{datetime}</p>;
}