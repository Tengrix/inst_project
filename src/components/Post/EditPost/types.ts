import { GetUserDataResponseType } from '@/api/types';
import { PostType } from '@/components/Post/types';

export interface EditPostTypes {
    edit: boolean;
    editPostModeHandler: () => void;
    post: PostType;
    user: GetUserDataResponseType;
    isSuccess: boolean;
    isLoading: boolean;
}
