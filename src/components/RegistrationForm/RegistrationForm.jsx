import styles from "./RegistrationForm.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../Button/Button.jsx";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/auth_operation";
import routes from "../../routes";
import { NavLink } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your Email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter password")
    .min(6, "Password must be longer than 6 characters")
    .required("Password is required"),
});

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(register(values)).unwrap();
        navigate(routes.login);
        resetForm();
      } catch (error) {
        console.error("Registration failed:", error);
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
    sx: { mb: 5, height: 35.5 },
  };

  return (
    <div className={styles.registrationForm}>
      <form className={styles.formAuth} onSubmit={formik.handleSubmit}>
        <h2 className={styles.formTitle}>Registration</h2>

        <TextField
          {...commonFieldProps}
          id="name"
          name="name"
          placeholder="Name *"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          {...commonFieldProps}
          id="email"
          name="email"
          placeholder="Email *"
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
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 7.5, height: 35.5 }} 
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
          <NavLink to={routes.login}>
            <div className={styles.button}>
              <Button text="Login" type="submit" customType="secondary" />
            </div>
          </NavLink>

          <div className={styles.button}>
            <Button
              text="Register"
              type="submit"
              customType="primary"
              disabled={formik.isSubmitting || !formik.dirty}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
