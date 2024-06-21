<<<<<<< HEAD
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
//     } else if (values.landline.length >= 15) {
//       errors.landline = "landline number must be max 15 digits long";
//     } else {
//       errors.landline = "landline number ";
//     }

//     if (!values.mobile_number) {
//       errors.mobile_number = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(values.mobile_number)) {
//       errors.mobile_number = "Mobile number must be 10 digits long";
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
  }, [formData, isSubmitting]);

  const validate = (values) => {
    let errors = {};
    if (!values.school_name) {
      errors.school_name = "School Name is required";
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
    } else if (values.landline.length > 15) {
      errors.landline = "Landline number must be max 15 digits long";
    }
    if (!values.mobile_number) {
      errors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(values.mobile_number)) {
      errors.mobile_number = "Mobile number must be 10 digits long";
    }
    if (!values.principal_name_prefix) {
      errors.principal_name_prefix = "Prefix is required";

// // // // import { useState, useEffect } from "react";
// // // // const useFormValidation = (formData) => {
// // // //   const [errors, setErrors] = useState({});
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // //   useEffect(() => {
// // // //     if (isSubmitting) {
// // // //       validate(formData);
// // // //     }
// // // //   }, [formData]);
// // // //   const validate = (values) => {
// // // //     let errors = {};
// // // //     if (!values.school_name) {
// // // //       errors.school_name = "School Name is required";
// // // //     }
// // // //     if (!values.student_name) {
// // // //       errors.student_name = "Student Name is required";
// // // //     }
// // // //     if (!values.email) {
// // // //       errors.email = "Email is required";
// // // //     } else if (!/\S+@\S+\.\S+/.test(values.email)) {
// // // //       errors.email = "Email address is invalid";
// // // //     }
// // // //     if (!values.address) {
// // // //       errors.address = "Address is required";
// // // //     }
// // // //     if (!values.city) {
// // // //       errors.city = "City is required";
// // // //     }
// // // //     if (!values.state) {
// // // //       errors.state = "State is required";
// // // //     }
// // // //     if (!values.district) {
// // // //       errors.district = "District is required";
// // // //     }
// // // //     if (!values.pincode) {
// // // //       errors.pincode = "Pin Code is required";
// // // //     } else if (!/^\d{6}$/.test(values.pincode)) {
// // // //       errors.pincode = "Pin Code is invalid";
// // // //     }
// // // //     if (!values.STD_code) {
// // // //       errors.STD_code = "STD Code is required";
// // // //     }
// // // //     if (!values.landline) {
// // // //       errors.landline = "Landline number is required";
// // // //     }

// // // //     if (!values.mobile_number) {
// // // //       errors.mobile_number = "Mobile number is required";
// // // //     } else if (!/^\d{10}$/.test(values.mobile_number)) {
// // // //       errors.mobile_number = "Mobile number must be 10 digits long";
// // // //     }

// // // //     if (!values.principal_name_prefix) {
// // // //       errors.principal_name_prefix = "Prefix is required";
// // // //     }
// // // //     if (!values.principal_name) {
// // // //       errors.principal_name = "Principal Name is required";
// // // //     }
// // // //     if (!values.syllabus) {
// // // //       errors.syllabus = "Syllabus is required";
// // // //     }
// // // //     setErrors(errors);
// // // //     setIsSubmitting(false);
// // // //   };
// // // //   return { errors, validate, setIsSubmitting };
// // // // };
// // // // export default useFormValidation;

// // // import { useState } from "react";

// // // const useFormValidation = (formData) => {
// // //   const [errors, setErrors] = useState({});
// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   const validate = () => {
// // //     const validationErrors = validateFields(formData);
// // //     setErrors(validationErrors);
// // //     return Object.keys(validationErrors).length === 0;
// // //   };

// // //   return { errors, validate, setIsSubmitting };
// // // };

// // // const validateFields = (formData) => {
// // //   let errors = {};

// // //   if (!formData.school_name.trim()) {
// // //     errors.school_name = "School name is required";
// // //   }

// // //   if (!formData.email.trim()) {
// // //     errors.email = "Email is required";
// // //   } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
// // //     errors.email = "Invalid email format";
// // //   }

// // //   if (!formData.address.trim()) {
// // //     errors.address = "Address is required";
// // //   }

// // //   if (!formData.city.trim()) {
// // //     errors.city = "City is required";
// // //   }

// // //   if (!formData.state.trim()) {
// // //     errors.state = "State is required";
// // //   }

// // //   if (!formData.district.trim()) {
// // //     errors.district = "District is required";
// // //   }

// // //   if (!formData.pincode.trim()) {
// // //     errors.pincode = "Pincode is required";
// // //   } else if (!/^\d{6}$/.test(formData.pincode)) {
// // //     errors.pincode = "Pincode must be exactly 6 digits";
// // //   }

// // //   if (!formData.STD_code.trim()) {
// // //     errors.STD_code = "STD code is required";
// // //   }

// // //   if (!formData.landline.trim()) {
// // //     errors.landline = "Landline number is required";
// // //   }

// // //   if (!formData.mobile_number.trim()) {
// // //     errors.mobile_number = "Mobile number is required";
// // //   } else if (!/^\d{10}$/.test(formData.mobile_number)) {
// // //     errors.mobile_number = "Mobile number must be exactly 10 digits";
// // //   }

// // //   if (!formData.principal_name_prefix.trim()) {
// // //     errors.principal_name_prefix = "Principal name prefix is required";
// // //   }

// // //   if (!formData.principal_name.trim()) {
// // //     errors.principal_name = "Principal name is required";
// // //   }

// // //   if (!formData.syllabus.trim()) {
// // //     errors.syllabus = "Syllabus is required";
// // //   }

// // //   return errors;
// // // };

// // // export default useFormValidation;

// import { useState } from "react";

// const validateFields = (formData, formType) => {
//   let errors = {};
//   let tempErrors = {};
//      let isValid = true;

//   if (formType === "school") {
//     if (!formData.school_name?.trim()) {
//       errors.school_name = "School name is required";
//     }

//     if (!formData.email?.trim()) {
//       errors.email = "Email is required";
//     } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//       errors.email = "Invalid email format";
//     }

//     if (!formData.address?.trim()) {
//       errors.address = "Address is required";
//     }

//     if (!formData.city?.trim()) {
//       errors.city = "City is required";
//     }

//     if (!formData.state?.trim()) {
//       errors.state = "State is required";
//     }

//     if (!formData.district?.trim()) {
//       errors.district = "District is required";
//     }

//     if (!formData.pincode?.trim()) {
//       errors.pincode = "Pincode is required";
//     } else if (!/^\d{6}$/.test(formData.pincode)) {
//       errors.pincode = "Pincode must be exactly 6 digits";
//     }

//     if (!formData.STD_code?.trim()) {
//       tempErrors.STD_code = "STD code is required";
//       isValid = false;
//     } else if (!/^\d{3}$/.test(formData.STD_code)) {
//       tempErrors.STD_code = "STD code must be exactly 3 digits";
//       isValid = false;
//     }

//     if (!formData.landline?.trim()) {
//       tempErrors.landline = "Landline number is required";
//       isValid = false;
//     } else if (!/^\d{12}$/.test(formData.landline)) {
//       tempErrors.landline = "Landline number must be exactly 12 digits";
//       isValid = false;
//     }

//     if (!formData.mobile_number?.trim()) {
//       errors.mobile_number = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobile_number)) {
//       errors.mobile_number = "Mobile number must be exactly 10 digits";
//     }

//     if (!formData.principal_name_prefix?.trim()) {
//       errors.principal_name_prefix = "Principal name prefix is required";
//     }

//     if (!formData.principal_name?.trim()) {
//       errors.principal_name = "Principal name is required";
//     }

//     if (!formData.syllabus?.trim()) {
//       errors.syllabus = "Syllabus is required";
//     }
//   } else if (formType === "student") {
//     if (!formData.name?.trim()) {
//       errors.name = "Student name is required";
//     }

//     if (!formData.email?.trim()) {
//       errors.email = "Email is required";
//     } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//       errors.email = "Invalid email format";
//     }

//     if (!formData.address?.trim()) {
//       errors.address = "Address is required";
//     }

//     if (!formData.city?.trim()) {
//       errors.city = "City is required";
//     }

//     if (!formData.state?.trim()) {
//       errors.state = "State is required";
//     }

//     if (!formData.pincode?.trim()) {
//       errors.pincode = "Pincode is required";
//     } else if (!/^\d{6}$/.test(formData.pincode)) {
//       errors.pincode = "Pincode must be exactly 6 digits";
//     }

//     if (!formData.mobile_number?.trim()) {
//       errors.mobile_number = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobile_number)) {
//       errors.mobile_number = "Mobile number must be exactly 10 digits";
//     }

//     if (!formData.syllabus?.trim()) {
//       errors.syllabus = "Syllabus is required";
//     }

//     if (!formData.school_name?.trim()) {
//       errors.school_name = "School name is required";
//     }

//     if (!formData.student_class?.trim()) {
//       errors.student_class = "Class is required";
//     }
//   }

//   return errors;
// };

// const useFormValidation = (formData, formType) => {
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validate = () => {
//     const validationErrors = validateFields(formData, formType);
//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   };

//   return { errors, validate, setIsSubmitting };
// };

// export default useFormValidation;

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
>>>>>>> 1d539e4744ca4435d8f139fccd6cb5f3448bee24
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
<<<<<<< HEAD

    setErrors(errors);
    setIsSubmitting(false);
    return errors;
=======
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
>>>>>>> 1d539e4744ca4435d8f139fccd6cb5f3448bee24
  };

  return { errors, validate, setIsSubmitting };
};

export default useFormValidation;
