import 'react-dates/initialize';
import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import {useState} from "react";
import CreatePostModal from "@/pages/post/createPostModal/CreatePostModal";


const Profile = () => {
    const [createPostModal, setCreatePostModal] = useState(false)

    return (
        <div>
            <Sidebar/>
        </div>
    );
};

Profile.getLayout = getLayout
export default Profile;