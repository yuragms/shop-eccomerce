import { useState } from 'react';
import styles from './styles.module.scss';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import AdminInput from '@/components/inputs/admininput';

export default function Create() {
  const [name, setName] = useState('');
  const validate = Yup.object({
    name: Yup.string(),
  });
  const submitHandler = async () => {};
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Create a Category</div>
            <AdminInput
              type="text"
              Label="Name"
              name="name"
              placholder="Category name"
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className={`${styles.btn} ${styles.btn__primary}`}
            >
              <span>Add Category</span>
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
