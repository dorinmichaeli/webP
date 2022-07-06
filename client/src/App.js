import { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { StateContext, DispatchContext } from "./context/GlobalContext";
import Index from "./pages";
import About from "./pages/about";
import Contact from "./pages/contact";

function App() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Switch>
  );
}

export default App;
