import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { Name: "", Email: "", phoneNumber: "" ,Address:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.Name) {
      errors.username = "Name is required!";
    }
    if (!values.Email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.Email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "PhoneNumer is required";
    } else if (values.phoneNumber.length < 6) {
      errors.password = "PhoneNumber must be more than 6 characters";
    } else if (values.phoneNumber.length > 10) {
      errors.password = "PhoneNumberr cannot exceed more than 10 characters";
    }
    if (!values.Address) {
      errors.Address = "Address is required!";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Add Member successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Fitness Club Registration</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={formValues.Name}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Name}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="Email"
              placeholder="Email"
              value={formValues.Email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Email}</p>
          <div className="field">
            <label>Phone Number</label>
            <input
              type="text"
              name="PhoneNumber"
              placeholder="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phoneNumber}</p>
          <div className="field">
            <label>Address</label>
            <input
              type="text"
              name="Address"
              placeholder="Address"
              value={formValues.Address}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Address}</p>
          <button className="fluid ui button blue">Add Member</button>
        </div>
      </form>
    </div>
  );
}

export default App;
