import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NameSelect from "./NameSelect";
import ChatRoom from "./ChatRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={NameSelect} />
        <Route exact path="/chat/:name" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;
