
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SuccessPage from "./pages/SuccessPage";
import OrderForm from "./pages/OrderForm";

function App() {
  const [orderData, setOrderData] = useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route
          path="/order"
          render={(props) => (
            <OrderForm
              setOrderData={setOrderData}
              history={props.history}
            />
          )}
        />

        <Route
          path="/success"
          render={() => (
            <SuccessPage orderData={orderData} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
