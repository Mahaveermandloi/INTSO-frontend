// import { useState, useEffect } from "react";

// const useFormValidation = (formData) => {
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (isSubmitting) {
//       validate(formData);
//     }
//   }, [formData]);

//   const validate = (values) => {
//     let errors = {};

//     if (!values.school_name) {
//       errors.school_name = "School Name is required";
//     }
//     if (!values.student_name) {
//       errors.student_name = "Student Name is required";
//     }
//     if (!values.email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//       errors.email = "Email address is invalid";
//     }
//     if (!values.address) {
//       errors.address = "Address is required";
//     }
//     if (!values.city) {
//       errors.city = "City is required";
//     }
//     if (!values.state) {
//       errors.state = "State is required";
//     }
//     if (!values.district) {
//       errors.district = "District is required";
//     }
//     if (!values.pincode) {
//       errors.pincode = "Pin Code is required";
//     } else if (!/^\d{6}$/.test(values.pincode)) {
//       errors.pincode = "Pin Code is invalid";
//     }
//     if (!values.STD_code) {
//       errors.STD_code = "STD Code is required";
//     }
//     if (!values.landline) {
//       errors.landline = "Landline number is required";
//     }
//     if (!values.mobile_number) {
//       errors.mobile_number = "Mobile number is required";
//     } else if (!/^\d{9}$/.test(values.mobile_number)) {
//       errors.mobile_number = "Mobile number is invalid";
//     }
//     if (!values.principal_name_prefix) {
//       errors.principal_name_prefix = "Prefix is required";
//     }
//     if (!values.principal_name) {
//       errors.principal_name = "Principal Name is required";
//     }
//     if (!values.syllabus) {
//       errors.syllabus = "Syllabus is required";
//     }

//     setErrors(errors);
//     setIsSubmitting(false);
//   };

//   return { errors, validate, setIsSubmitting };
// };

// export default useFormValidation;

import { useState, useEffect } from "react";
const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      validate(formData);
    }
  }, [formData]);
  const validate = (values) => {
    let errors = {};
    if (!values.school_name) {
      errors.school_name = "School Name is required";
    }
    if (!values.student_name) {
      errors.student_name = "Student Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.address) {
      errors.address = "Address is required";
    }
    if (!values.city) {
      errors.city = "City is required";
    }
    if (!values.state) {
      errors.state = "State is required";
    }
    if (!values.district) {
      errors.district = "District is required";
    }
    if (!values.pincode) {
      errors.pincode = "Pin Code is required";
    } else if (!/^\d{6}$/.test(values.pincode)) {
      errors.pincode = "Pin Code is invalid";
    }
    if (!values.STD_code) {
      errors.STD_code = "STD Code is required";
    }
    if (!values.landline) {
      errors.landline = "Landline number is required";
    }
   
    if (!values.mobile_number) {
      errors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(values.mobile_number)) {
      errors.mobile_number = "Mobile number must be 10 digits long";
    }

    if (!values.principal_name_prefix) {
      errors.principal_name_prefix = "Prefix is required";
    }
    if (!values.principal_name) {
      errors.principal_name = "Principal Name is required";
    }
    if (!values.syllabus) {
      errors.syllabus = "Syllabus is required";
    }
    setErrors(errors);
    setIsSubmitting(false);
  };
  return { errors, validate, setIsSubmitting };
};
export default useFormValidation;
