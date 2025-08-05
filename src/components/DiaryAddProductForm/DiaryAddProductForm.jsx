import { useState, useEffect } from "react";
import styles from "./DiaryAddProductForm.module.css";
import TextField from "@mui/material/TextField";
import Button from "../Button/Button.jsx";
import { useFormik } from "formik";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/day/day_operation";
import { date } from "../../redux/day/day_selector";
import { productApi } from "../../api";

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
  const dispatch = useDispatch();
  const currentDate = useSelector(date);
  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const effectiveDate = currentDate || today;

  const formik = useFormik({
    initialValues: {
      productName: "",
      productWeight: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      const productWeight = values.productWeight;
      dispatch(
        addProduct({
          date: effectiveDate,
          product: selectedData,
          weight: productWeight,
        })
      );
      resetForm({ values: { productName: "", productWeight: "" } });
      setSearchProductRes([]);
      setSelectedData("");
    },
  });

  const [searchProductRes, setSearchProductRes] = useState([]);
  const { productName } = formik.values;
  const [selectedData, setSelectedData] = useState("");
  const [t, setT] = useState(null);

  useEffect(() => {
    if (t) clearTimeout(t);

    if (productName.length >= 3) {
      setT(setTimeout(() => fetchData(productName), 500));
    } else {
      setSearchProductRes([]);
    }
  }, [productName, t]);

  const fetchData = async (name) => {
    try {
      console.log("Searching for:", name);
      const { data } = await productApi.searchProducts(name);
      console.log("API Response:", data);
      setSearchProductRes(data.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
      console.error("Error details:", error.response?.data);
      setSearchProductRes([]);
    }
  };

  return (
    <div className={styles.diaryAddProductForm}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <TextField
              sx={{
                width: "100%",
                mb: 0,
                "& .MuiInputBase-root": {
                  borderBottom: "1px solid #9b9faa",
                  minHeight: "40px",
                  padding: "0",
                  margin: "0",
                },
                "& .MuiInputBase-input": {
                  color: "#212121",
                  padding: "8px 0",
                  "&::placeholder": {
                    color: "#9b9faa",
                    opacity: 1,
                  },
                },
                "& .MuiFormHelperText-root": {
                  margin: "4px 0 0 0",
                },
                "@media (min-width: 768px)": {
                  width: 240,
                  marginRight: "30px",
                },
              }}
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
              variant="standard"
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
              sx={{
                width: "100%",
                mb: 0,
                "& .MuiInputBase-root": {
                  borderBottom: "1px solid #9b9faa",
                  minHeight: "40px",
                  padding: "0",
                  margin: "0",
                },
                "& .MuiInputBase-input": {
                  color: "#212121",
                  padding: "8px 0",
                  "&::placeholder": {
                    color: "#9b9faa",
                    opacity: 1,
                  },
                },
                "& .MuiFormHelperText-root": {
                  margin: "4px 0 0 0",
                },
                "@media (min-width: 768px)": {
                  width: 105,
                  marginRight: "48px",
                },
                "@media (min-width: 1280px)": {
                  width: 105,
                  marginRight: "75px",
                },
              }}
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
              variant="standard"
            />
          </div>

          <Button
            type="submit"
            customType="primary"
            disabled={
              formik.isSubmitting || 
              !selectedData || 
              !formik.values.productWeight
            }
            className={styles.addButton}
          >
            <AddIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DiaryAddProductForm;
