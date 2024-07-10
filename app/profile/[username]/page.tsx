import { Layout } from '../../components/Layout'
import styles from '../page.module.scss'
import { Profile } from '../../components/Profile';
import { NavigationBar } from '@/app/components/NavigationBar';

export default function LoginPage({params}: any) {
  return (
    <Layout className={styles.container}>
      <NavigationBar title='View Profile'/>
      { <Profile params={params}/> }
    </Layout>
  );
}
