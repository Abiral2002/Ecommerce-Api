
import { useSelector,useDispatch } from 'react-redux';
import "./../../styles/Header.css"
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

function Header() {

  const user=useSelector((state)=>state.user.user)
  const dispatch=useDispatch()

  return (
    <div className="header bg-primary">
      <HeaderLeft/>
      <HeaderRight/>
    </div>
  );
}

export default Header;