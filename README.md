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

## 🧩 Components Breakdown

### `DynamicForm`
- **Purpose**: Root form renderer.  
- **Responsibilities**:
  - Receives the schema (`title`, `description`, `layout`).  
  - Renders each `section` via `DynamicSection`.  
- **Notes**: No state or validation logic, purely schema → components mapping.  

---

### `DynamicSection`
- **Purpose**: Represents a form section (e.g. "Contact", "Additional Information").  
- **Responsibilities**:
  - Renders header (`header`, `subHeader`).  
  - Toggles **collapsed/expanded** state (local UI state only).  
  - Maps each `field` to `FormComponentFactory`.  
- **Notes**: No awareness of values or Redux, just UI layout.  

---

### `FieldGroup`
- **Purpose**: Groups multiple related fields in a single row (e.g. First Name + Last Name).  
- **Responsibilities**:
  - Lays out its child fields using flex/grid.  
  - Passes schema into `FormComponentFactory`.  
- **Notes**: Layout-only, no state or validation.  

---

### `FormComponentFactory`
- **Purpose**: Chooses which component to render for each field type.  
- **Responsibilities**:
  - Reads `type` from schema (`string`, `number`, `email`, `select`, `long-text`, etc.).  
  - Returns the correct field component (`TextField`, `SelectField`, `PhoneNumberField`, `TextAreaField`).  
  - Passes down resolved props from hooks (`useFieldData`).  
- **Notes**: No rendering logic of its own, just a switchboard.  

---

### Field Components

#### `TextField`
- **Purpose**: Renders a single-line text input.  
- **Props**: `name`, `label`, `value`, `onChange`, `required`, `messages`.  
- **Notes**: Calls `onChange(newValue)` when input changes.  

#### `TextAreaField`
- **Purpose**: Renders a multi-line text area.  
- **Props**: Same as `TextField`, with `rows` optional.  

#### `SelectField`
- **Purpose**: Renders a dropdown/select input.  
- **Props**: `items`, `placeHolder`, `value`, `onChange`, `messages`.  

#### `PhoneNumberField`
- **Purpose**: Renders a country code dropdown + phone number input.  
- **Props**: `countries` (list of `{ code, flag }`), `value` (object `{ countryCode, phoneNumber }`).  
- **Notes**: Maintains local state (selected country + phone), calls `onChange({ countryCode, phoneNumber })`.  

---

### Utility Components

#### `FormFieldLabel`
- **Purpose**: Renders field label with optional `*` for required fields.  
- **Props**: `name`, `label`, `required`.  

#### `FormFieldMessages`
- **Purpose**: Renders validation messages (error, warning, info, success).  
- **Props**: `messages` (array of `{ type, text }`).  

---

# ⚒️ Hooks Documentation

This project uses several **custom hooks** to keep components dumb and move all data/logic into hooks.  
Each hook has a **single responsibility**: selecting values, handling updates, or resolving conditional props.  

---

## `useFormData`

**Purpose**: Access the current form’s unique identifier (`formId`, `formPath`) from context.  

**Why**: Keeps context stable; components only need `formId` & `formPath`, not the entire form state.  

**Usage**:
```js
const {formId, formPath} = useFormData();

## `useFieldValue`

**Purpose**: Subscribe to a single field’s value from Redux state.  

**Why**: Ensures isolation — only re-renders the field when its value changes. 

**Usage**:
```js
const value = useFieldValue('firstName', 'someFormId', 'contactForm');


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
