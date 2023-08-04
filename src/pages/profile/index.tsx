import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {SingleDatePicker} from 'react-dates';
import {useState} from "react";
import moment, {Moment} from 'moment';


const Profile = () => {
    const [date, setDate] = useState<moment.Moment | null>(null);
    const [focused, setFocused] = useState<boolean>(false);

    const handleDateChange = (newDate: Moment | null) => {
        setDate(newDate);
    };

    return (
        <div>
            <SingleDatePicker
                id={'date_picker'}
                date={date}
                onDateChange={handleDateChange}
                focused={focused}
                onFocusChange={({focused}) => setFocused(focused)}/>
        </div>
    );
};

export default Profile;