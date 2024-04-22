import { useState } from 'react';
import styles from './styles.module.scss';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import AdminInput from '@/components/inputs/admininput';

export default function Create() {
  const [name, setName] = useState('');
  const validate = Yup.object({
    name: Yup.string()
      .required('Category name is required.')
      .min(2, 'Category name must be between 2 and 30 characters.')
      .max(30, 'Category name must be between 2 and 30 characters.')
      .matches(/^[aA-zZ]/, 'Numbers and special charcters are not allowed.'),
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
              label="Name"
              name="name"
              placholder="Category name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Add Category</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
