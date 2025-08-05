import styles from "./LoginForm.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../Button/Button.jsx";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/auth/auth_operation";
import { getError, getLoading } from "../../redux/auth/auth_selector";
import routes from "../../routes";
import { NavLink } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const isLoading = useSelector(getLoading);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(login(values)).unwrap();
        formik.resetForm();
      } catch (error) {
        console.log("Login error:", error);
      }
    },
  });

  const commonFieldProps = {
    variant: "standard",
    className: styles.formInput,
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  return (
    <div className={styles.loginForm}>
      <form className={styles.formAuth} onSubmit={formik.handleSubmit}>
        <h2 className={styles.formTitle}>Log in</h2>

        {/* Error mesajı */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <TextField
          {...commonFieldProps}
          id="email"
          name="email"
          placeholder="Email *"
          sx={{ mb: 5 }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          {...commonFieldProps}
          id="password"
          name="password"
          placeholder="Password *"
          sx={{ mb: 5 }}
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <div className={styles.buttons}>
          <div className={styles.button}>
            <Button
              text={isLoading ? "Logging in..." : "Login"}
              type="submit"
              customType="primary"
              disabled={formik.isSubmitting || !formik.dirty || isLoading}
            />
          </div>

          <NavLink to={routes.registration}>
            <div className={styles.button}>
              <Button text="Register" type="submit" customType="secondary" />
            </div>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
