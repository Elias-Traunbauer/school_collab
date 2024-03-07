import { useState, useRef, useEffect } from "react";

/// Countdown Component
/// @param {Date} date - Date to count down to
export default function Countdown({ date }: { date: Date }) {

    function formatDate(seconds) {

        const days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        const hrs = Math.floor(seconds / 3600);
        seconds -= hrs * 3600;
        const mnts = Math.floor(seconds / 60);
        seconds -= mnts * 60;

        return days + " day " + hrs + " hours " + mnts + " minutes " + Math.floor(seconds) + " seconds";

    }
    var time = useRef(0);

    useEffect(() => {
        date = new Date(date);
        time.current = Math.floor((date.getTime() - new Date().getTime()) / 1000);
    });

    const [datetime, setDateTime] = useState("0 days 0 hours 0 minutes 0 seconds");

    useEffect(() => {
        if (Math.floor(time.current) > 0) {
            time.current -= 1;
            setDateTime(formatDate(time.current));
        }

        let i = setInterval(() => {

            if (Math.floor(time.current) > 0) {
                time.current -= 1;
                setDateTime(formatDate(time.current));
            }
        }, 1000);
        return () => clearInterval(i);
    });

    return <p>{datetime}</p>;
}