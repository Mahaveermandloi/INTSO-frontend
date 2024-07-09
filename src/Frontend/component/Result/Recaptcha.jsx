import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Recaptcha = ({ onChange }) => {
  return (
    <div className="mt-6 flex items-center justify-center  my-8">
      <ReCAPTCHA
        sitekey="6LeLsvspAAAAAE-O9jxhVBc9H_A375hRimMQmgPW"
        onChange={onChange}
      />
    </div>
  );
};

export default Recaptcha;
