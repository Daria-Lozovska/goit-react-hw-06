import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addContact } from "../../redux/contactsSlice";
import styles from './ContactForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string().min(3).max(50).required("Required"),
  number: Yup.string().required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        dispatch(addContact(values));
        actions.resetForm();
      }}
    >
      <Form className={styles.form}>
        <label className={styles.label}>Name:</label>
        <Field type="text" name="name" className={styles.input}/>
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label className={styles.label}>Number:</label>
        <Field type="text" name="number" className={styles.input}/>
        <ErrorMessage name="number" component="div" className={styles.error} />

        <button type="submit" className={styles.button}>Add Contact</button>
      </Form>
    </Formik>
  );
}