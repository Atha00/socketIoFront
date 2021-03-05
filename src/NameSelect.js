import { useState } from "react";
import { useHistory } from "react-router-dom";

function NameSelect() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [safeNameSecurity, setSafeNameSecurity] = useState("");
  const [isNameGood, setIsNameGood] = useState(true);
  const handleSubmit = event => {
    let reg = /^[a-zàäâéèêëïîöôùüû\s]*$/i;
    event.preventDefault();
    if (name.length < 4 || name.length > 20) {
      setSafeNameSecurity(
        "Votre pseudo est trop court, ou trop long ! (Entre 4 et 20 caractères)"
      );
      setIsNameGood(false);
    } else if (!reg.test(name)) {
      setSafeNameSecurity("Votre pseudo contient des caractères spéciaux !");
      setIsNameGood(false);
    } else {
      setIsNameGood(true);
      history.push(`/chat/${name}`);
    }
  };
  return (
    <div className="name-select">
      <p>Choisissez votre pseudo :</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
        />
      </form>
      {!isNameGood && <p className="alert-message">{safeNameSecurity}</p>}
    </div>
  );
}

export default NameSelect;
