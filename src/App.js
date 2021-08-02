import ApiProvider from "./components/context/ApiContext";
import DashBoard from "./components/DashBoard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FoodDetail from "./components/FoodDetail";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <Router>
      <ApiProvider>
        <SearchInput />
        <Switch>
          <Route exact path="/Restaurant-app" component={DashBoard} />
          <Route path="/Restaurant-app/fooddetail" component={FoodDetail} />
        </Switch>
      </ApiProvider>
    </Router>
  );
}

export default App;
