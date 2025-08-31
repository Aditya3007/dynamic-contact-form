# 📝 Dynamic Form System

This project implements a **schema-driven dynamic form generator** using **React + Redux**.  
The **layout JSON** defines the structure of the form, and the renderer (`DynamicForm`, `DynamicSection`, `FieldGroup`, `FormComponentFactory`, etc.) creates UI automatically.

---

## 💡 Philosophy: Dumb Components Only

Every element in the form system is a **dumb (presentational) component**:

- They **don’t know about Redux**.  
- They **don’t manage their own data** (except minimal UI state like `collapsed` for sections).  
- They **don’t run validation logic** directly.  
- They only render what they are told: labels, inputs, messages, etc.  

All state, validation, conditional logic, and data wiring is handled **outside the components** (in hooks like `useFieldData`, `useConditionalFieldsData`).

---

## 📦 JSON Schema Layout

Example schema:

```json
{
  "layout": [
    {
      "type": "section",
      "header": "Contact",
      "fields": [
        {
          "type": "field-group",
          "fields": [
            { "name": "firstName", "label": "First Name", "type": "string", "required": true, "validationFn": "nameValidator" },
            { "name": "lastName", "label": "Last Name", "type": "string", "required": true, "validationFn": "nameValidator" }
          ]
        },
        {
          "name": "phone",
          "label": "Phone Number",
          "type": "number",
          "required": true,
          "validationFn": "phoneValidator",
          "__conditions": {
            "countries": {
              "useGlobalProps": true,
              "valueFn": "mapCountryCodeAndFlags"
            }
          }
        },
        {
          "name": "email",
          "label": "Email",
          "type": "email",
          "required": true,
          "validationFn": "emailValidator"
        },
        {
          "name": "address",
          "label": "Address",
          "type": "long-text"
        }
      ]
    },
    {
      "type": "section",
      "header": "Additional Information",
      "fields": [
        {
          "name": "businessName",
          "label": "Business Name",
          "type": "string"
        },
        {
          "name": "streetAddress",
          "label": "Street Address",
          "type": "string"
        },
        {
          "name": "city",
          "label": "City",
          "type": "select",
          "__conditions": {
            "items": {
              "dependsOn": ["country"],
              "useGlobalProps": true,
              "valueFn": "filterCitiesByCountry"
            }
          }
        },
        {
          "name": "country",
          "label": "Country",
          "type": "select",
          "__conditions": {
            "items": {
              "useGlobalProps": true,
              "valueFn": "mapCountries"
            }
          }
        }
      ]
    }
  ]
}
