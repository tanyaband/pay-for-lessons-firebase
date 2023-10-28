import { Button } from "../Button/component";
import styles from "./styles.module.css";
import { useState } from "react";

const DEFAULT_FORM = {
  email: "",
  password: "",
  isNewUser: false,
};

export const LoginForm = ({ onCancel, onOk }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h3>Login</h3>
        <p className={styles.line}>
          <label>Email:</label>
          <input
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
        </p>
        <p className={styles.line}>
          <label>Пароль:</label>
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
        </p>
        <p className={styles.center}>
          <input
            type="checkbox"
            id="newuser"
            value={form.isNewUser}
            onChange={(event) =>
              setForm({ ...form, isNewUser: event.target.checked })
            }
          />
          <label htmlFor="newuser">новый пользователь</label>
        </p>
        <div className={styles.actions}>
          <Button onClick={() => onOk(form)}>Ok</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
