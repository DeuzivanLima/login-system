import { Layout } from '../components/Layout';
import { NavigationBar } from '../components/NavigationBar';
import { Register } from '../components/Register';
import styles from '../page.module.scss';

export default function LoginPage() {
  return (
    <Layout className={styles.container}>
      <NavigationBar title='Register'/>
      <Register/>
    </Layout>
  );
}
