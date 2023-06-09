import Footer from '@/components/footer';
import Header from '@/components/header';
import LoginInput from '@/components/inputs/loginInput';
import styles from '@/styles/signin.module.scss';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';

export default function signin() {
  return (
    <div>
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik>
              {(form) => (
                <Form>
                  <LoginInput icon="password" placeholder="Email Address" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="Morocco" />
    </div>
  );
}
