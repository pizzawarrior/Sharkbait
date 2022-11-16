import { useState } from 'react';
import "../Form.css"


function Form() {
    const [SubmitForm, setSubmitForm] = useState({
      name: "",
      location: "",
      date: "",
    });

    const handleSubmit = (event) => {
          //Can we cover what happened here again? (event)
         event.preventDefault() //here too ??

         console.log(SubmitForm)

         fetch('/RecordedIncident', {
           method: 'POST', // or 'PUT'
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(SubmitForm),
         })
           .then((response) => response.json())
           .then((incident) => {
             console.log('Success:', incident);
           })
           .catch((error) => {
             console.error('Error:', error);
           });
  }

    // console.log(SubmitForm.name)
    

    return (
      <form
      className = "incident-form"
        onSubmit = {handleSubmit}
      >
        <label
        className = "form-fields"
        >
          Name:
          <input
          value={SubmitForm.name}
          onChange={e => {
            setSubmitForm({
              ...SubmitForm,
              name: e.target.value
            });
          }}
          className = "form-inputs"
          />
        </label>
        <label
        className = "form-fields"
        >
          Location:
        <input
          value={SubmitForm.location}
          onChange={e => {
            setSubmitForm({
              ...SubmitForm,
              location: e.target.value
            })
          }}
          className = "form-inputs"
        />
        </label>
        <label
        className = "form-fields"
        >
          Date:
        <input
            value={SubmitForm.date}
            onChange={e => {
              setSubmitForm({
                ...SubmitForm,
                date: e.target.value
              });
           }}
           className = "form-inputs"
        />
      </label>
      <button 
        className = "form-fields"
        type = 'submit'
      >
         submit 
      </button>
      </form>
    );
   }

   export default Form