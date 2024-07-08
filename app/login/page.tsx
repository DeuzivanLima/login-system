import { Layout } from '../components/Layout';
import { Login } from '../components/Login';
import styles from '../page.module.scss';

export default function LoginPage() {
  return (
    <Layout className={styles.container}>
      <Login/>
    </Layout>
  );
}
