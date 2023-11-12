import './styles.css';

function Input(props) {
  return (
    <div className="input">
        <i className={props?.lefticon}/>
        <input value={props?.value} type={props?.type} placeholder={props?.placeholder} ref={props?.refs}/>
        <i className={props?.righticon} onClick={props?.iconClick}/>
    </div>
  );
}

export default Input;