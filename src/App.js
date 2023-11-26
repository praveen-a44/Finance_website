
import './App.css';
import Header from './Pages/Header';
import NavBar from './Pages/Navbar';
import Midpage from './Pages/Midpage';
import Travel from './Pages/Travel';
import TotalMoney from './Pages/TotalMoney';
import { Route ,Routes} from 'react-router';
import Investment from './Pages/Investment';
import Budgeting from './Pages/Budgeting';
import Reminder from './Pages/Remainder';
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<NavBar />}/>
        <Route path="/travel_form" element={<Travel />} />
        <Route path="/total_balance" element={<TotalMoney />} />
        <Route path="/Investment" element={<Investment />} />
        <Route path="/budget_form" element={<Budgeting />} />
        <Route path="/remainder_form" element={<Reminder />} />
       </Routes>
    </div>
    
  );
}

export default App;
