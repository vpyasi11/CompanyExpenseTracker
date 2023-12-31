import React,{useContext} from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';


const StyledAppBar = styled(AppBar)`
  
 
  
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  background-color: #EEEEEE;
`;

const StyledButton = styled(Button)`
  color: #333;
  &:hover {
    background-color: #333;
    color: #f8f8f8;
  }
`;


const Navbar = () => {
const navigate =useNavigate()
const {setUserAuth,userAuth} =useContext(DataContext);
  const navigateTocreateCompany =()=>{
   navigate('/company')
  }

  function handleLogout(){
    //handling logout logic
    localStorage.removeItem('useremail');
    localStorage.removeItem('companyId');
    setUserAuth({
      ...userAuth,
      isLoggedIn: false
    })
    navigate("/")
  }
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6" style={{color:"black"}}>Company Expense Tracker</Typography>
        <div>
          <StyledButton color="inherit"onClick={()=>navigate('/dashboard')}>Home</StyledButton>
          <StyledButton color="inherit" onClick={navigateTocreateCompany}>Create CompanyInfo</StyledButton>
          <StyledButton color="inherit" onClick={()=>navigate('/register')}>Register</StyledButton>
          <StyledButton color="inherit" onClick={handleLogout}>Logout</StyledButton>
        </div>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
