import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";

import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";
import routes from "../../routes";

import {
  dailyCalories,
  dailyCaloriesAuth,
} from "../../redux/dailyCalories/dailyCalories_operation";
import { getIsAuthenticated } from "../../redux/auth/auth_selector";
import {
  getDailyCalories,
  getNotAllowedProducts,
} from "../../redux/dailyCalories/dailyCalories_selector";
import { getUserId } from "../../redux/user/user_selector";
import styles from "./DailyCaloriesForm.module.css";
import { NavLink } from "react-router-dom";

const DailyCaloriesForm = () => {
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const IsAuthenticated = useSelector(getIsAuthenticated);
  const calories = useSelector(getDailyCalories);
  const notAllowedProducts = useSelector(getNotAllowedProducts);

  const body = document.querySelector("body");

  const toggleModal = () => {
    if (body.classList.contains(styles.hidden)) {
      body.classList.remove(styles.hidden);
    } else {
      body.classList.add(styles.hidden);
    }
    setModal(!modal);
  };

  const handleSubmit = (values, userId) => {
    localStorage.setItem("bloodType", values.bloodType);

    localStorage.setItem("age", values.age);
    localStorage.setItem("currentWeight", values.currentWeight);
    localStorage.setItem("desiredWeight", values.desiredWeight);
    localStorage.setItem("height", values.height);
    localStorage.setItem("blood", values.bloodType);

    if (userId) {
      dispatch(dailyCaloriesAuth({ values, userId }));
    } else {
      dispatch(dailyCalories(values));
    }

    if (!IsAuthenticated) {
      toggleModal();
    }
  };

  const isChecked = () => {
    const store = localStorage.getItem("bloodType");
    if (store) {
      return store;
    }
    return "";
  };

  const validationsSchema = yup.object().shape({
    height: yup
      .number()
      .typeError("Must be a number")
      .min(100, "Minimum value 120 cm")
      .max(260, "Maximum value 260 cm")
      .required("Required field"),
    age: yup
      .number()
      .typeError("Must be a number")
      .min(10, "Minimum value 10 years")
      .max(120, "Maximum value 120 years")
      .required("Required field"),
    currentWeight: yup
      .number()
      .typeError("Must be a number")
      .min(20, "Minimum value 20 kg")
      .max(250, "Maximum value 250 kg")
      .required("Required field"),
    desiredWeight: yup
      .number()
      .typeError("Must be a number")
      .min(25, "Minimum value 25 kg")
      .max(
        yup.ref("currentWeight"),
        "Maximum value cannot be greater than current weight"
      )
      .required("Required field"),
    bloodType: yup.number().required("Required field"),
  });

  const heading = () => {
    if (IsAuthenticated) {
      return "Find out your daily calorie norm";
    }
    return "Calculate your daily calorie norm right now";
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            height: "",
            age: "",
            currentWeight: "",
            desiredWeight: "",
            bloodType: `${isChecked()}`,
          }}
          validateOnBlur
          onSubmit={(values, actions) => {
            handleSubmit(values, userId);
            if (IsAuthenticated) {
              localStorage.removeItem("bloodType");
              localStorage.removeItem("calc-form");
              actions.resetForm();
            }
          }}
          validationSchema={validationsSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
          }) => (
            <Form className={styles.caloriesForm} onSubmit={handleSubmit}>
              <h2>{heading()}</h2>
              <div className={styles.formContainerMain}>
                <div className={styles.formContainerLeft}>
                  <div className={styles.labelContainer}>
                    <InputField
                      label="Height *"
                      type="number"
                      name={"height"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.height}
                    />
                    <div className={styles.caloriesFormErrorContainer}>
                      {touched.height && errors.height && (
                        <p className={styles.caloriesFormError}>
                          {errors.height}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.labelContainer}>
                    <InputField
                      label="Age *"
                      type="number"
                      name={"age"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.age}
                    />
                    <div className={styles.caloriesFormErrorContainer}>
                      {touched.age && errors.age && (
                        <p className={styles.caloriesFormError}>{errors.age}</p>
                      )}
                    </div>
                  </div>
                  <div className={styles.labelContainer}>
                    <InputField
                      label="Current Weight *"
                      type="number"
                      name={"currentWeight"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.currentWeight}
                    />
                    <div className={styles.caloriesFormErrorContainer}>
                      {touched.currentWeight && errors.currentWeight && (
                        <p className={styles.caloriesFormError}>
                          {errors.currentWeight}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.formContainerRight}>
                  <div className={styles.labelContainer}>
                    <InputField
                      label="Desired Weight *"
                      type="number"
                      name={"desiredWeight"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.desiredWeight}
                    />
                    <div className={styles.caloriesFormErrorContainer}>
                      {touched.desiredWeight && errors.desiredWeight && (
                        <p className={styles.caloriesFormError}>
                          {errors.desiredWeight}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.radioButtonContainer}>
                    <h3>Blood Type *</h3>

                    <ul className={styles.radioButtonList}>
                      <RadioButton
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="bloodType"
                        value="1"
                        id="1-radio-button"
                      />
                      <RadioButton
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="bloodType"
                        value="2"
                        id="2-radio-button"
                      />
                      <RadioButton
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="bloodType"
                        value="3"
                        id="3-radio-button"
                      />
                      <RadioButton
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="bloodType"
                        value="4"
                        id="4-radio-button"
                      />
                    </ul>
                    <div className={styles.caloriesFormErrorContainer}>
                      {touched.bloodType && errors.bloodType && (
                        <p className={styles.caloriesFormError}>
                          {errors.bloodType}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.form_button}>
                <Button
                  disabled={!isValid || !dirty}
                  onClick={handleSubmit}
                  type="submit"
                  text="Lose Weight"
                  customType="primary"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {modal && (
        <Modal onClose={toggleModal}>
          <h1 className={styles.modal_title}>
            Your recommended daily calorie intake is
          </h1>
          <p className={styles.modal_caloriesNumber}>
            {calories}
            <span className={styles.modal_calories}> kcal</span>
          </p>
          <h2 className={styles.modal_subTitle}>
            Products that are not recommended for you to consume
          </h2>
          <ul className={styles.modal_list}>
            {notAllowedProducts ? (
              notAllowedProducts.map((product) => (
                <li className={styles.modal_el} key={product} id={product}>
                  {product}
                </li>
              ))
            ) : (
              <li className={styles.modal_el}>You can eat everything</li>
            )}
          </ul>
          <div className={styles.modal_button}>
            <NavLink to={routes.registration}>
              <Button
                text="Start Losing Weight"
                customType="primary"
                type="button"
                onClick={toggleModal}
              />
            </NavLink>
          </div>
          <button
            type="button"
            className={styles.modal_closeBtn}
            onClick={toggleModal}
          ></button>
        </Modal>
      )}
    </>
  );
};

const InputField = ({ label, type, value, name, onChange, onBlur }) => (
  <label>
    <Field
      required
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
    />
    <div className={styles.labelText}>{label}</div>
  </label>
);

const RadioButton = ({ name, value, id, onChange, onBlur }) => (
  <li>
    <Field
      type="radio"
      value={value}
      name={name}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
    />
    <label htmlFor={id}>{value}</label>
    <div className={styles.check}>
      <div className={styles.inside}></div>
    </div>
  </li>
);

export default DailyCaloriesForm;
