import { useState } from "react";
import styles from "./DiaryAddProductForm.module.css";

export default function DiaryAddProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    grams: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.grams) {
      // Basit bir kalori hesaplama (gerçek uygulamada API'den gelecek)
      const calories = Math.round(parseInt(formData.grams) * 2.5);
      
      onAddProduct({
        name: formData.name,
        grams: parseInt(formData.grams),
        calories: calories
      });
      
      setFormData({ name: "", grams: "" });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          name="name"
          type="text"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <input
          name="grams"
          type="number"
          placeholder="Grams"
          value={formData.grams}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.addButton}>
        +
      </button>
    </form>
  );
}
