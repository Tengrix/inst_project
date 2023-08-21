import 'react-dates/initialize';
import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import React, {useEffect} from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import {useState} from "react";
import CreatePostModal from "@/pages/post/createPostModal/CreatePostModal";
import {useAppSelector} from "@/store";
import {useRouter} from "next/router";

import {useScreenSize} from "@/shared/hooks/useScreenSize";


const Profile = () => {
    const [createPostModal, setCreatePostModal] = useState(false)
    const router = useRouter()
    const authData = useAppSelector(state => state.authSlice.isInit)
    const screenSize = useScreenSize()
    // useEffect(()=>{
    //     if(!authData){
    //         router.push('/sign-in')
    //     }
    // },[authData])
    return (
        <div>
            {/*{authData ?*/}
                <div>
                    <Sidebar/>
                <CreatePostModal open={createPostModal} modalHandler={setCreatePostModal}>
                    Image
                </CreatePostModal>
                </div>
            {/*    :<Spinner/>*/}
            {/*}*/}
        </div>
    );
};

Profile.getLayout = getLayout
export default Profile;
