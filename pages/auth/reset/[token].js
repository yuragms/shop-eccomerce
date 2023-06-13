import Header from '@/components/header';
import styles from '../../../styles/forgot.module.scss';
import Footer from '@/components/footer';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import CircledIconBtn from '@/components/buttons/circledIconBtn';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import LoginInput from '@/components/inputs/loginInput';
import DotLoaderSpinner from '@/components/loaders/dotLoader';

export default function reset({ token }) {
  console.log('token', token);
  const [password, setPassword] = useState('');
  const [conf_password, setConf_password] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required('Please enter your new password.')
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });
  const resetHandler = async () => {
    try {
      setLoading(true);

      setError('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner Loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password? <Link href="/">Login instesd</Link>
            </span>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="conf_password"
                  icon="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConf_password(e.target.value)}
                />

                <CircledIconBtn type="submit" text="Submit" />
                <div style={{ marginTop: '10px' }}>
                  {error && <span className={styles.error}>{error}</span>}
                  {success && <span className={styles.success}>{success}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const token = query.token;

  return {
    props: {
      token,
    },
  };
}
