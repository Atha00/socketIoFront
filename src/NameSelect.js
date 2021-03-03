import { useState } from "react";
import { useHistory } from "react-router-dom";

function NameSelect() {
  let history = useHistory();
  const [name, setName] = useState("");
  const handleSubmit = event => {
    event.preventDefault();
    history.push(`/chat/${name}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
        />
      </form>
    </div>
  );
}

export default NameSelect;
