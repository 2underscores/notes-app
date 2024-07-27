import { useState, ChangeEvent, ChangeEventHandler } from "react";

interface FieldsType {
  [key: string | symbol]: string;
}

export function useFormFields( // Always start with use
  initialState: FieldsType
): [FieldsType, ChangeEventHandler] {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event: ChangeEvent<HTMLInputElement>) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
      return;
    },
  ];
}


// So our hook returns an array with fields and a callback function that sets the new state based on the event object. The callback function takes the event object and gets the form field id from event.target.id and the value from event.target.value. In the case of our form the elements, the event.target.id comes from the controlId that’s set in the Form.Group element:

// <Form.Group controlId="email">
//   <Form.Label>Email</Form.Label>
//   <Form.Control
//     autoFocus
//     type="email"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//   />
// </Form.Group>