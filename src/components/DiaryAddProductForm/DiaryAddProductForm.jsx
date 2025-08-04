import { useState, useEffect } from "react";
import styles from "./DiaryAddProductForm.module.css";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "../Button/Button.jsx";
import { useFormik } from "formik";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/day/day_operation";
import { date } from "../../redux/day/day_selector";
import api from "../../utils/api";

const useStyles = makeStyles({
  input: {
    width: "100%",
  },
  nameInput: {
    marginBottom: 30,
    "@media (min-width: 768px)": {
      width: 240,
      marginRight: 30,
    },
  },
  weightInput: {
    marginBottom: 60,
    "@media (min-width: 768px)": {
      width: 105,
      marginRight: 48,
    },
    "@media (min-width: 1280px)": {
      width: 105,
      marginRight: 75,
    },
  },
});

const validationSchema = yup.object({
  productName: yup.string("Enter product").required("Product is required!"),
  productWeight: yup
    .number("Enter a number")
    .typeError("Enter a number")
    .positive()
    .integer()
    .min(10, "Enter a larger weight")
    .max(1000, "Enter a smaller weight")
    .required("Weight is required!"),
});

const DiaryAddProductForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentDate = useSelector(date);
  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const formik = useFormik({
    initialValues: {
      productName: "",
      productWeight: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      const productWeight = values.productWeight;
      if (currentDate === today) {
        dispatch(
          addProduct({
            date: currentDate,
            product: selectedData,
            weight: productWeight,
          })
        );
        resetForm({ values: "" });
        setSearchProductRes([]);
        setSelectedData("");
      }
    },
  });

  const [searchProductRes, setSearchProductRes] = useState([]);

  const { productName } = formik.values;

  const [t, setT] = useState(null);
  useEffect(() => {
    if (t) clearTimeout(t);

    if (productName.length >= 3) {
      setT(setTimeout(() => fetchData(productName), 500));
    }
  }, [productName]);

  const fetchData = async (name) => {
    try {
      const { data } = await api.get(`/products?search=${name}`);
      setSearchProductRes(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setSearchProductRes([]);
    }
  };

  const [selectedData, setSelectedData] = useState(searchProductRes[0] || "");

  return (
    <div className={styles.diaryAddProductForm}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <TextField
              className={`${classes.input} ${classes.nameInput}`}
              id="productName"
              name="productName"
              placeholder="Enter product name"
              value={formik.values.productName}
              onChange={formik.handleChange}
              error={
                formik.touched.productName && Boolean(formik.errors.productName)
              }
              helperText={
                formik.touched.productName && formik.errors.productName
              }
            />
            {searchProductRes.length > 0 && (
              <ul className={styles.searchResults}>
                {searchProductRes.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => {
                      setSelectedData(product);
                      formik.setFieldValue("productName", product.title);
                      setSearchProductRes([]);
                    }}
                  >
                    {product.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.inputContainer}>
            <TextField
              className={`${classes.input} ${classes.weightInput}`}
              id="productWeight"
              name="productWeight"
              placeholder="Grams"
              type="number"
              value={formik.values.productWeight}
              onChange={formik.handleChange}
              error={
                formik.touched.productWeight &&
                Boolean(formik.errors.productWeight)
              }
              helperText={
                formik.touched.productWeight && formik.errors.productWeight
              }
            />
          </div>

          <Button
            type="submit"
            customType="primary"
            disabled={
              formik.isSubmitting || !formik.dirty || currentDate !== today
            }
          >
            <AddIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DiaryAddProductForm;
