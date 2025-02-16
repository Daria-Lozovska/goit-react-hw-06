import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
        number: Yup.string()
            .matches(/^\d{3}-\d{2}-\d{2}$/, 'Invalid phone number')
            .required('Required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        const { name, number } = values;

        // Перевірка на дублікати
        const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());

        if (isDuplicate) {
            alert(`${name} is already in contacts!`);
            return;
        }

        const newContact = {
            id: nanoid(),
            name,
            number,
        };

        dispatch(addContact(newContact)); // Додаємо контакт у Redux Store
        resetForm();
    };

    return (
        <Formik
            initialValues={{ name: '', number: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <label className={styles.label}>
                        Name
                        <Field type="text" name="name" className={styles.input} />
                        <ErrorMessage name="name" component="div" className={styles.error} />
                    </label>
                    <label className={styles.label}>
                        Number
                        <Field type="text" name="number" className={styles.input} />
                        <ErrorMessage name="number" component="div" className={styles.error} />
                    </label>
                    <button type="submit" disabled={isSubmitting} className={styles.button}>
                        Add Contact
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;
