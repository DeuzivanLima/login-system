import { cookies } from 'next/headers'
import { Layout } from '../components/Layout'
import styles from '../page.module.scss'
import { Profile } from '../components/Profile';
import { Post } from '../components/Post';

export default function PostPage() {
  const cookieStore = cookies()

  return (
    <Layout className={styles.container}>
      { cookieStore.get('session') == null ? <></> : <Post session={cookieStore.get('session')?.value}/> }
    </Layout>
  );
}
