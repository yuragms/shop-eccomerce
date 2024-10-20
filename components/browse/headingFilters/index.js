import { Tooltip } from '@mui/material';
import styles from './styles.module.scss';

export default function HeadingFilters() {
  return (
    <div className={styles.filters}>
      <div className={styles.filters__price}>
        <span>Price :</span>
        <input type="number" placeholder="min" min="0>" />
        <input type="number" placeholder="min" min="0>" />
      </div>
      <div className="stylesfilters__priceBtns">
        <Tooltip
          title={<h2>Check out products under 10$</h2>}
          placement="top"
          arrow
        >
          <button>
            <span style={{ height: '10%' }}></span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
