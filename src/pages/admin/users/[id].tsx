import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Avatar from '/public/assets/noAvatar.png';

import { useFormatter } from 'next-intl';

import { getLayoutAdmin } from '@/components/Layout/AdminLayout/AdminLayout';
import Spinner from '@/shared/ui/spinner/Spinner';

import s from './user.module.scss';

const USER = gql`
    query getUserById($id: String!) {
        getUserById(id: $id) {
            id
            createdAt
            updatedAt
            photo
            login
            email
            firstName
            lastName
        }
    }
`;

const User = () => {
    const router = useRouter();
    const { loading, error, data } = useQuery(USER, {
        variables: { id: router.query.id }
    });
    const format = useFormatter();
    const dateTime = new Date(+data?.getUserById?.createdAt);

    if (loading) return <Spinner />;
    if (error) return `Error! ${error.message}`;

    return (
        <div className={s.user}>
            <div className={s.user__container}>
                <div className={s.user__info}>
                    <Image
                        className={s.user__photo}
                        src={data.getUserById.photo ?? Avatar}
                        alt={data.getUserById.login}
                        width={60}
                        height={60}
                    />
                    <div className={s.user__data}>
                        <h1 className={s.user__name}>
                            {data.getUserById.firstName} {data.getUserById.lastName}
                        </h1>
                        <p className={s.user__login}>
                            <Link href="#" target="_blank">
                                {data.getUserById.login}
                            </Link>
                        </p>
                    </div>
                </div>
                <div className={s.user__addition}>
                    <div>
                        <p>UserID</p>
                        <p>{data.getUserById.login}</p>
                    </div>
                    <div>
                        <p>Profile Creation Date</p>
                        <p>{format.dateTime(dateTime)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

User.getLayout = getLayoutAdmin;

export default User;
