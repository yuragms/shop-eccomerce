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
        {data.map((option, i) => (
          <MenuItem key={i} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      {meta.touched && meta.error && (
        <p className={styles.error__msg}>
          <ErrorMessage name={field.name} />
        </p>
      )}
    </div>
  );
}
