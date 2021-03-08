import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NameSelect from "./NameSelect";
import ChatRoom from "./ChatRoom";
import PrivateRoom from "./PrivateRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={NameSelect} />
        <Route exact path="/chat/:name" component={ChatRoom} />
        <Route exact path="/private/:name" component={PrivateRoom} />
      </Switch>
    </Router>
  );
}

export default App;
