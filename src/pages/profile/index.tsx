import 'react-dates/initialize';

import DatePicker from "@/shared/ui/datePicker/DatePicker";


const Profile = () => {

    return (
        <div>
            <DatePicker label={'Date of birthday'}/>
        </div>
    );
};

export default Profile;