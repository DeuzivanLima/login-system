import { cookies } from 'next/headers';
import { Layout } from './components/Layout';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Home() {
  const cookieStore = cookies()

  return (
    <Layout className={styles.container}>
      {
        cookieStore.get('session')?.value == null ?
          <div>
            Você não está logado,
            <Link href='/login'> clique aqui</Link> 
          </div>
          :
          <h1>Logado né pae</h1>
      }
    </Layout>
  );
}
