import './styles.css';

function Button(props) {
  return (
    <div className="button" onClick={props?.onClick}>
        <p>{props?.title}</p>
    </div>
  );
}

export default Button;