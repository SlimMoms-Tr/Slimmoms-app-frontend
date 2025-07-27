import { useState } from "react";
import styles from "./DailyCaloriesForm.module.css";

export default function DailyCaloriesForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    height: "",
    desiredWeight: "",
    age: "",
    currentWeight: "",
    bloodType: "1",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Height *</label>
          <input 
            name="height" 
            placeholder="Enter height" 
            value={formData.height} 
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Desired weight *</label>
          <input 
            name="desiredWeight" 
            placeholder="Enter desired weight" 
            value={formData.desiredWeight} 
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Age *</label>
          <input 
            name="age" 
            placeholder="Enter age" 
            value={formData.age} 
            onChange={handleChange}
            className={styles.input}
          />
        </div>

          <div className={styles.bloodTypeSection}>
        <label className={styles.label}>Blood type *</label>
        <div className={styles.radioGroup}>
          {[1, 2, 3, 4].map((type) => (
            <label key={type} className={styles.radioLabel}>
              <input
                type="radio"
                name="bloodType"
                value={String(type)}
                checked={formData.bloodType === String(type)}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>{type}</span>
            </label>
          ))}
        </div>
      </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Current weight *</label>
          <input 
            name="currentWeight" 
            placeholder="Enter current weight" 
            value={formData.currentWeight} 
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>
      
      
      <button className={styles.submitButton} type="submit">
        Start losing weight
      </button>
    </form>
  );
}
