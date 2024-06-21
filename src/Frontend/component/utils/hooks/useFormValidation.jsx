import { useState } from "react";

const validateFields = (formData, formType) => {
  let errors = {};
  let isValid = true;

  if (formType === "school") {
    if (!formData.school_name?.trim()) {
      errors.school_name = "School name is required";
      isValid = false;
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.address?.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!formData.city?.trim()) {
      errors.city = "City is required";
      isValid = false;
    }

    if (!formData.state?.trim()) {
      errors.state = "State is required";
      isValid = false;
    }

    if (!formData.district?.trim()) {
      errors.district = "District is required";
      isValid = false;
    }

    if (!formData.pincode?.trim()) {
      errors.pincode = "Pincode is required";
      isValid = false;
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Pincode must be exactly 6 digits";
      isValid = false;
    }

    if (!formData.STD_code?.trim()) {
      errors.STD_code = "STD code is required";
      isValid = false;
    } else if (!/^\d{3,5}$/.test(formData.STD_code)) {
      errors.STD_code = "STD code must be between 3 to 5 digits";
      isValid = false;
    }

    if (!formData.landline?.trim()) {
      errors.landline = "Landline number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.landline)) {
      errors.landline = "Landline number must be  atleast 10 digits";
      isValid = false;
    }

    if (!formData.mobile_number?.trim()) {
      errors.mobile_number = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      errors.mobile_number = "Mobile number must be exactly 10 digits";
      isValid = false;
    }

    if (!formData.principal_name_prefix?.trim()) {
      errors.principal_name_prefix = "Principal name prefix is required";
      isValid = false;
    }

    if (!formData.principal_name?.trim()) {
      errors.principal_name = "Principal name is required";
      isValid = false;
    }

    if (!formData.syllabus?.trim()) {
      errors.syllabus = "Syllabus is required";
      isValid = false;
    }
  } else if (formType === "student") {
    if (!formData.name?.trim()) {
      errors.name = "Student name is required";
      isValid = false;
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.address?.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!formData.city?.trim()) {
      errors.city = "City is required";
      isValid = false;
    }

    if (!formData.state?.trim()) {
      errors.state = "State is required";
      isValid = false;
    }

    if (!formData.pincode?.trim()) {
      errors.pincode = "Pincode is required";
      isValid = false;
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Pincode must be exactly 6 digits";
      isValid = false;
    }

    if (!formData.mobile_number?.trim()) {
      errors.mobile_number = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      errors.mobile_number = "Mobile number must be exactly 10 digits";
      isValid = false;
    }

    if (!formData.syllabus?.trim()) {
      errors.syllabus = "Syllabus is required";
      isValid = false;
    }

    if (!formData.school_name?.trim()) {
      errors.school_name = "School name is required";
      isValid = false;
    }

    if (!formData.student_class?.trim()) {
      errors.student_class = "Class is required";
      isValid = false;
    }
  }

  return errors;
};

const useFormValidation = (formData, formType) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const validationErrors = validateFields(formData, formType);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return { errors, validate, setIsSubmitting };
};

export default useFormValidation;
