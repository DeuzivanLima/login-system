import { cookies } from 'next/headers'
import { Layout } from '../components/Layout'
import styles from '../page.module.scss'
import { Profile } from '../components/Profile';

export default function LoginPage() {
  const cookieStore = cookies()

  return (
    <Layout className={styles.container}>
      { cookieStore.get('session') == null ? <></> : <Profile/> }
    </Layout>
  );
}
