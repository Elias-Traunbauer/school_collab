import dayjs from 'dayjs';

export default function Datepicker(startdate = 1){
    let month;
    let year;

    //month = new Date().getMonth();
    year = new Date().getFullYear();
    

    //const firstDateOfMonth = dayjs().month(month).year(year).startOf("month");
    //const lastDateOfMonth = dayjs().month(month).year(year).endOf("month");

    console.log(startdate);
}
