import { cookies } from 'next/headers'
import { Layout } from '../../components/Layout'
import styles from '../page.module.scss'
import { Profile } from '../../components/Profile';

export default function LoginPage() {
  return (
    <Layout className={styles.container}>
      { <Profile/> }
    </Layout>
  );
}
