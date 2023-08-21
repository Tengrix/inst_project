// import 'react-dates/initialize';
// import {SingleDatePicker} from 'react-dates';
// import {useState} from "react";
// import moment, {Moment} from 'moment';
// import {Typography} from "@/shared/ui/typography";
//
// type PropsType = {
//     label: string
//     callback: (date: string) => void
// }
//
// const DatePicker = ({label, callback}: PropsType) => {
//     const [date, setDate] = useState<moment.Moment | null>(null)
//     const [focused, setFocused] = useState<boolean>(false)
//
//     const currentDay = moment()
//
//     const handleDateChange = (newDate: Moment | null) => {
//         setDate(newDate);
//         newDate && callback(newDate.format('DD.MM.YYYY'))
//     }
//
//     return (
//         <div>
//             <Typography variant={"regular14"} color={"form"}>
//                 {label}
//             </Typography>
//             <SingleDatePicker
//                 verticalSpacing={-6}
//                 showDefaultInputIcon
//                 inputIconPosition="after"
//                 placeholder={"dd.mm.yyyy"}
//                 daySize={36}
//                 numberOfMonths={1}
//                 hideKeyboardShortcutsPanel={true}
//                 id={'date_picker'}
//                 date={date}
//                 onDateChange={handleDateChange}
//                 focused={focused}
//                 isOutsideRange={(day) => day >= currentDay}
//                 displayFormat={"DD.MM.YYYY"}
//                 onFocusChange={({focused}) => setFocused(focused)}/>
//         </div>
//     );
// };
//
// export default DatePicker;
export {}