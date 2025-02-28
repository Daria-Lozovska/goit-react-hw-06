import PropTypes from "prop-types";
import styles from "./Contact.module.css";

const Contact = ({ id, name, number, onDeleteContact }) => (
  <li className={styles.list_item}>
    <p className={styles.text}>{name}: {number}</p>
    <button type="button" onClick={() => onDeleteContact(id)} className={styles.button}>
      Delete
    </button>
  </li>
);

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contact;
