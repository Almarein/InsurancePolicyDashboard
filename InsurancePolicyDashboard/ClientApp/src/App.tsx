import './App.css';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {PolicyDashboard} from './pages/policy-dashboard';

const App = () => (
    <Provider store={store}>
        <PolicyDashboard/>
    </Provider>
)

export default App;