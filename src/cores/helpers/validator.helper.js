export default function validator(data) {
  const {value, type} = data;
  let valid = true;
  switch (type) {
    case 'required':
      if (value === '' || value === null || value === undefined) {
        valid = false;
      }
      break;

    case 'number':
      if (!isNaN(+value)) {
        valid = false;
      }
      break;

    case 'minLength':
      const {minLength} = data;
      if (value.length < minLength) {
        valid = false;
      }
      break;

    case 'maxLength':
      const {maxLength} = data;
      if (value.length > maxLength) {
        valid = false;
      }
      break;

    case 'minValue':
      const {minValue} = data;
      if (!isNaN(+value) || value < minValue) {
        valid = false;
      }
      break;

    case 'maxValue':
      const {maxValue} = data;
      if (!isNaN(+value) || value > maxValue) {
        valid = false;
      }
      break;

    case 'email':
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      valid = regex.test(value);
      break;
  }

  return valid;
}
