// import React, { useState } from "react";
// import Recaptcha from "./Recaptcha";
// import { IP_ADDRESS, PORT } from "../utils/constants";

// const Result = () => {
//   const [formData, setFormData] = useState({
//     level: "",
//     scs_number: "",
//     hall_ticket: "",
//     student_dob: "",
//     recaptchaValue: "",
//   });
//   const [message, setMessage] = useState("");
//   const [resultData, setResultData] = useState([]);
//   const [studentStatus, setStudentStatus] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "student_dob") {
//       const formattedDate = new Date(value).toISOString().split("T")[0];
//       setFormData({ ...formData, [name]: formattedDate });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleRecaptchaChange = (value) => {
//     setFormData({ ...formData, recaptchaValue: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.recaptchaValue) {
//       alert("Please complete the reCAPTCHA.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://${IP_ADDRESS}:${PORT}/api/v1/result/getResult`,
//         {
//           method: "POST",
//           body: JSON.stringify(formData),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setMessage(data.message);
//         setResultData(data.data);
//         console.log(resultData);
//         setStudentStatus(data.status);

//         setFormData({
//           level: "",
//           scs_number: "",
//           hall_ticket: "",
//           student_dob: "",
//           recaptchaValue: "",
//         });
//       } else {
//         console.error("Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   console.log("Result Data ", resultData);

//   return (
//     <>
//       <div className="max-w-screen-xl flex flex-col w-full items-center justify-center mx-auto lg:px-12 px-6 py-10">
//         <div className="flex flex-col items-center justify-center w-full">
//           <div className="w-full max-w-md">
//             <form onSubmit={handleSubmit}>
//               <select
//                 className="border border-gray-300 p-4 px-6 w-full rounded-lg mb-4"
//                 name="level"
//                 onChange={handleChange}
//                 value={formData.level}>
//                 <option value="">Select Level</option>
//                 <option value="1">Check Result - Level- 1</option>
//                 <option value="2">Check Result - Level- 2</option>
//               </select>
//               <table className="w-full table-auto">
//                 <tbody>
//                   <tr>
//                     <th className="text-left">Enter SCS No.</th>
//                     <td>
//                       <input
//                         className="border border-gray-300 p-2 px-4 rounded-lg w-full"
//                         type="text"
//                         name="scs_number"
//                         onChange={handleChange}
//                         value={formData.scs_number}
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-left">Enter Hall Ticket No.</th>
//                     <td>
//                       <input
//                         className="border border-gray-300 p-2 px-4 rounded-lg w-full"
//                         type="text"
//                         name="hall_ticket"
//                         onChange={handleChange}
//                         value={formData.hall_ticket}
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-left">Enter DOB</th>
//                     <td>
//                       <input
//                         className="border border-gray-300 p-2 px-4 rounded-lg w-full"
//                         type="date"
//                         name="student_dob"
//                         onChange={handleChange}
//                         value={formData.student_dob}
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-center" colSpan="2">
//                       <Recaptcha onChange={handleRecaptchaChange} />
//                     </th>
//                   </tr>
//                   <tr>
//                     <td colSpan="2" className="text-center">
//                       <button
//                         type="submit"
//                         className="bg-blue-500 text-white p-2 px-4 rounded-lg">
//                         Submit
//                       </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className="lg:px-12 p-6 flex flex-col items-center">
//         {message && (
//           <div className="mt-4 p-4 text-3xl bg-gray-200 rounded text-center ">
//             {message}
//           </div>
//         )}
//         {( (resultData.level === "2" ) && (resultData.status === "Pass" ) ) ?  (
//           <>No Data
//           <p></p>
//           </>
//         ) : (
//           <>
//             <table className="w-full bg-white border border-gray-200 mt-5">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="py-2">S.No</th>
//                   <th className="py-2">SCS Number</th>
//                   <th className="py-2">Student Name</th>
//                   <th className="py-2">Hall Ticket</th>
//                   <th className="py-2">Class</th>
//                   <th className="py-2">Exam</th>
//                   <th className="py-2">Prize</th>
//                   <th className="py-2">Prize Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {  resultData.map((item, index) => (
//                   <tr key={item.id}>
//                     <td className="border px-4 py-2">{index + 1}</td>
//                     <td className="border px-4 py-2">{item.scs_number}</td>
//                     <td className="border px-4 py-2">{item.student_name}</td>
//                     <td className="border px-4 py-2">{item.hall_ticket}</td>
//                     <td className="border px-4 py-2">{item.student_class}</td>
//                     <td className="border px-4 py-2">{item.exam}</td>
//                     <td className="border px-4 py-2">{item.prize}</td>
//                     <td className="border px-4 py-2">{item.prize_details}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Result;
import React, { useState } from "react";
import Recaptcha from "./Recaptcha";
import { IP_ADDRESS, PORT } from "../utils/constants";

const Result = () => {
  const [formData, setFormData] = useState({
    level: "",
    scs_number: "",
    hall_ticket: "",
    student_dob: "",
    recaptchaValue: "",
  });
  const [message, setMessage] = useState("");
  const [resultData, setResultData] = useState([]);
  const [studentStatus, setStudentStatus] = useState("");
  const [level, setLevel] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "student_dob") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRecaptchaChange = (value) => {
    setFormData({ ...formData, recaptchaValue: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.recaptchaValue) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/v1/result/getResult`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessage(data.message);
        setResultData(data.data);
        console.log(resultData);
        setLevel(data.level);
        setStudentStatus(data.status);

        setFormData({
          level: "",
          scs_number: "",
          hall_ticket: "",
          student_dob: "",
          recaptchaValue: "",
        });
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  console.log("Result Data ", resultData);

  return (
    <>
      <div className="max-w-screen-xl flex flex-col w-full items-center justify-center mx-auto lg:px-12 px-6 py-10">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
              <select
                className="border border-gray-300 p-4 px-6 w-full rounded-lg mb-4"
                name="level"
                onChange={handleChange}
                value={formData.level}>
                <option value="">Select Level</option>
                <option value="1">Check Result - Level- 1</option>
                <option value="2">Check Result - Level- 2</option>
              </select>
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <th className="text-left">Enter SCS No.</th>
                    <td>
                      <input
                        className="border border-gray-300 p-2 px-4 rounded-lg w-full"
                        type="text"
                        name="scs_number"
                        onChange={handleChange}
                        value={formData.scs_number}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Enter Hall Ticket No.</th>
                    <td>
                      <input
                        className="border border-gray-300 p-2 px-4 rounded-lg w-full"
                        type="text"
                        name="hall_ticket"
                        onChange={handleChange}
                        value={formData.hall_ticket}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Enter DOB</th>
                    <td>
                      <input
                        className="border border-gray-300 p-2 px-4 rounded-lg w-full"
                        type="date"
                        name="student_dob"
                        onChange={handleChange}
                        value={formData.student_dob}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center" colSpan="2">
                      <Recaptcha onChange={handleRecaptchaChange} />
                    </th>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-center">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 px-4 rounded-lg">
                        Submit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
      <div className="lg:px-12 p-6 flex flex-col items-center">
        {message && (
          <div className="mt-4 p-4 text-3xl bg-gray-200 rounded text-center">
            {message}
          </div>
        )}
        {resultData.length > 0 &&
        studentStatus === "Pass" &&
        parseInt(level) === 2 ? (
          <table className="w-full bg-white border border-gray-200 mt-5">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2">S.No</th>
                <th className="py-2">SCS Number</th>
                <th className="py-2">Student Name</th>
                <th className="py-2">Hall Ticket</th>
                <th className="py-2">Class</th>
                <th className="py-2">Exam</th>
                <th className="py-2">Prize</th>
                <th className="py-2">Prize Details</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.scs_number}</td>
                  <td className="border px-4 py-2">{item.student_name}</td>
                  <td className="border px-4 py-2">{item.hall_ticket}</td>
                  <td className="border px-4 py-2">{item.student_class}</td>
                  <td className="border px-4 py-2">{item.exam}</td>
                  <td className="border px-4 py-2">{item.prize}</td>
                  <td className="border px-4 py-2">{item.prize_details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Result;
