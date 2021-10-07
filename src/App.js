import ApiProvider from "./components/context/ApiContext";
import DashBoard from "./components/DashBoard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FoodDetail from "./components/FoodDetail";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <Router>
      <ApiProvider>
        <SearchInput />
        <Switch>
          <Route exact path="/Recipe-app" component={DashBoard} />
          <Route path="/Recipe-app/:id" component={FoodDetail} />
        </Switch>
      </ApiProvider>
    </Router>
  );
}

export default App;
