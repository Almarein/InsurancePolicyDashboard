import './App.css';
import {Provider} from "react-redux";
import {store} from "./store/store.tsx";
import {PolicyDashboard} from "./pages/policy-dashboard.tsx";

const App = ()=> (
    <Provider store={store}>
        <PolicyDashboard />
    </Provider>
)

export default App;