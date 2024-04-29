import styles from './styles.module.scss';
import ListItem from './ListItem';

export default function List({ categories, subCategories, setSubCategories }) {
  console.log('list data', subCategories);
  return (
    <ul className={styles.list}>
      {subCategories.map((sub) => (
        <ListItem
          subCategory={sub}
          key={sub._id}
          setSubCategories={setSubCategories}
          categories={categories}
        />
      ))}
    </ul>
  );
}
