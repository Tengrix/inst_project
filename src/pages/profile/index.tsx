import 'react-dates/initialize';

import DatePicker from "@/shared/ui/datePicker/DatePicker";
import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";


const Profile = () => {

    return (
        <div>
            <DatePicker label={'Date of birthday'}/>
        </div>
    );
};

Profile.getLayout = getLayout
export default Profile;