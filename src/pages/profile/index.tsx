import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import React, {useEffect} from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import {useRouter} from "next/router";
import {useAppSelector} from "@/redux/store";
import {Routes} from "@/shared/routes/Routes";
import Spinner from "@/shared/ui/spinner/Spinner";
import SignIn from "@/pages/sign-in";


const Profile = () => {
    const {push} = useRouter()
    const {token,isInit} = useAppSelector(state => state.auth)


    return (
        <div>{isInit ?
            <div>
                <Sidebar/>
            </div>
            : null
        }
        </div>
    );
};

Profile.getLayout = getLayout
export default Profile;
