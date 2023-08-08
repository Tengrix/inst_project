import 'react-dates/initialize';

import DatePicker from "@/shared/ui/datePicker/DatePicker";
import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";


const Profile = () => {

    return (
        <div>
            {/*<DatePicker label={'Date of birthday'}/>*/}
            <Sidebar/>
        </div>
    );
};

Profile.getLayout = getLayout
export default Profile;
