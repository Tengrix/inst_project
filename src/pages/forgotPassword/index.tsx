import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";


const ForgotPassword = () => (
    <div>
        This is forgot password page
    </div>
)

ForgotPassword.getLayout = getLayout
export default ForgotPassword;
