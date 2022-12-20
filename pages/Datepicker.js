import dayjs from 'dayjs';

export default function Datepicker({month = new Date().getMonth(),year = new Date().getFullYear()}){
    const firstDateOfMonth = dayjs().month(month).year(year).startOf("month");
    const lastDateOfMonth = dayjs().month(month).year(year).endOf("month");

    const displayDatesArray = [firstDateOfMonth,lastDateOfMonth];

    console.log(displayDatesArray);

   
}
