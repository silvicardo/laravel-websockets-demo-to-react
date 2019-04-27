import React from 'react';

const ErrorsAlert = ({errors}) => {

  let errorsListItems = errors.map((err, index) => (<li key={index}>{err}</li>));

  return (
    <div className="alert alert-warning" role="alert">
      <ul className="list-unstyled">
        {errorsListItems}
      </ul>
    </div>
  );
}
export default ErrorsAlert;
