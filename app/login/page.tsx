import { Layout } from '../components/Layout';
import { Login } from '../components/Login';
import { NavigationBar } from '../components/NavigationBar';
import styles from '../page.module.scss';

export default function LoginPage() {
  return (
    <Layout className={styles.container}>
      <NavigationBar title='Login'/>
      <Login/>
    </Layout>
  );
}
