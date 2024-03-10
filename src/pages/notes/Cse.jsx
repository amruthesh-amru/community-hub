import { NavLink } from "react-router-dom";
import Leftbar from "../../components/Leftbar";

function Cse() {
  return (
    <div className="flex items-start justify-center  p-3">
      <Leftbar />
      <div>
        <ul>
          <NavLink to="/firstsem">
            <li>1st Sem</li>
          </NavLink>
          <li>6th sem</li>
        </ul>
      </div>
    </div>
  );
}

export default Cse;
