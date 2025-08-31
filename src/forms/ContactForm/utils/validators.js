const nameValidator = (value) => {
    if (!value || value.trim() === '') {
        return 'Name is required';
    }
    if (value.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return null;
};

const phoneValidator = (value = {}) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Simple international phone number regex
    const phoneNumber = value?.countryCode || '' + value?.phoneNumber || '';
    if (!phoneNumber || phoneNumber.trim() === '') {
        return 'Phone number is required';
    }
    if (!phoneRegex.test(phoneNumber)) {
        return 'Invalid phone number format';
    }
    return null;
};

const emailValidator = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || value.trim() === '') {
        return 'Email is required';
    }
    if (!emailRegex.test(value)) {
        return 'Invalid email format';
    }
    return null;
};

const requiredValidator = (value) => {
    if (!value || value.trim() === '') {
        return 'This field is required';
    }
    return null;
};

export default {nameValidator, phoneValidator, emailValidator, requiredValidator};