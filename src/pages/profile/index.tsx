import 'react-dates/initialize';

import DatePicker from "@/shared/ui/datePicker/DatePicker";
import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import {useState} from "react";


const Profile = () => {
    const [date,setDate] = useState('')

    return (
        <div>
            {date}
            <DatePicker callback={setDate} label={'Date of birthday'}/>
        </div>
    );
};

Profile.getLayout = getLayout
export default Profile;