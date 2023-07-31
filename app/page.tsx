import Image from 'next/image';
import styles from './page.module.css';
import SignUp from './signUp/page';
import { Header } from '@/components/header/Header';

export default function Home() {
    return <SignUp />;
}
