import { Layout } from '../components/Layout';
import { Register } from '../components/Register';
import styles from '../page.module.scss';

export default function LoginPage() {
  return (
    <Layout className={styles.container}>
      <Register/>
    </Layout>
  );
}
