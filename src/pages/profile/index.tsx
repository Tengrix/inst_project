import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import Sidebar from '@/components/Sidebar/Sidebar';

const Profile = () => {
    return (
        <div>
            <Sidebar />
        </div>
    );
};

Profile.getLayout = getLayout;
export default Profile;
