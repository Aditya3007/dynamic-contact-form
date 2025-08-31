import React, { useState, useEffect } from "react";
import styles from "./PhoneNumberField.module.css";
import FormFieldLabel from "../FormFieldLabel/FormFieldLabel";
import FormFieldMessages from "../FormFieldMessages/FormFieldMessages";

const PhoneNumberField = ({
  name,
  label,
  value,
  required,
  onChange,
  countries = [],
  placeholder = "Enter phone number",
  messages= [],
}) => {
  // Extract initial state from value
  const initialCountry =
    countries.find((c) => c.code === value?.countryCode) || countries[0];
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [phone, setPhone] = useState(value?.phoneNumber || "");

  // Keep parent in sync whenever selection changes
  useEffect(() => {
    if (selectedCountry && onChange) {
      onChange({
        countryCode: selectedCountry.code,
        phoneNumber: phone,
      });
    }
  }, [selectedCountry, phone, onChange]);

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.code === e.target.value);
    setSelectedCountry(country);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div className={styles.fieldContainer}>
      <FormFieldLabel name={name} label={label} required={required} />
      <div className={styles.phoneInputWrapper}>
        {/* Country dropdown */}
        <select
          className={styles.countrySelect}
          value={selectedCountry?.code || ""}
          onChange={handleCountryChange}
        >
          {countries.map((c, index) => (
            <option key={index} value={c.code}>
              {c.flag} {c.code}
            </option>
          ))}
        </select>

        {/* Phone number input */}
        <input
          id={name}
          name={name}
          type="tel"
          placeholder={placeholder}
          value={phone}
          onChange={handlePhoneChange}
          className={styles.phoneInput}
        />
      </div>
      <FormFieldMessages messages={messages} />
    </div>
  );
};

export default PhoneNumberField;
