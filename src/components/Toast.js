const Toast = ({message}) => {
  return (
    <>
      <div className="toast toast-top toast-center">
        <div className="font-bold alert alert-success">
          <span>{message}</span>
        </div>
      </div>
    </>
  );
};

export default Toast;
