import ApiProvider from "./components/context/ApiContext";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <ApiProvider>
      <DashBoard />
    </ApiProvider>
  );
}

export default App;
