import { ErrorMessage, useField } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import styles from './styles.module.scss';

export default function SingularSelect({
  data,
  placeholder,
  handleChange,
  ...rest
}) {
  const [field, meta] = useField(rest);
  console.log(data);
  return (
    <div style={{ marginBottom: '1rem' }}>
      <TextField
        variant="outlined"
        name={field.name}
        select
        label={placeholder}
        value={field.value}
        onChange={handleChange}
        className={`${styles.select} ${
          meta.touched && meta.error && styles.error__select
        }`}
      >
        <MenuItem key={''} value={''}>
          No Selected / Or Empty
        </MenuItem>
        {data.map((option) => (
          <MenuItem key={option._id} value={option._id || option.name}>
            {option.name}
          </MenuItem>
        ))}
        {/* {data.map((option, i) => (
          <MenuItem key={i} value={option.name}>
            {option.name}
          </MenuItem>
        ))} */}
      </TextField>
      {meta.touched && meta.error && (
        <p className={styles.error__msg}>
          <ErrorMessage name={field.name} component="div">
            {' '}
            {(errorMessage) => <div>{errorMessage}</div>}
          </ErrorMessage>
        </p>
      )}
    </div>
  );
}
