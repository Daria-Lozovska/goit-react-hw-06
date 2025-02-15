import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filters.name);

  return (
    <input
      type="text"
      placeholder="Search by name"
      value={filter}
      onChange={e => dispatch(changeFilter(e.target.value))}
      className={styles.input}
    />
  );
}
