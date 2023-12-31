// Dashboard.js
import React, { useEffect, useContext } from 'react';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import baseUrl from '../../conn';
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: start;
  
  margin-top:5px;
  width:100vw;
  height:100vh;
  
`;

const StyledDashboard = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const StyledCard = styled(Card)`
  width:550px;
  height: 250px;
  margin: 3px;
  background-color: #BACDDB;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.03s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Dashboard = () => {
    const navigate = useNavigate();
    const { companyList, setCompanyList ,newcompany} = useContext(DataContext);
    console.log(companyList);

   useEffect(()=>{
    console.log("INSIDE USEFFECT AND TRIGERRING RERENDER");
    const fetchData = async () => {
        try {
            const response = await axios(`${baseUrl}/company/companies`);
            console.log(response.data);
            setCompanyList((prevdata) => response.data);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
   },[newcompany])

    const viewInfo = (id) => {
        navigate(`/company/${id}`)
        // Handle view info functionality
    };

    return (
        <StyledContainer>
            <StyledDashboard>
                {companyList.length !== 0 ? (
                    companyList.map((company, index) => (
                        <StyledCard key={index}>
                            <CardContent>
                                <Typography  align="start" style={{fontFamily:"sans-serif",fontSize:"1.2rem"}}>
                                    Organisation Name: {company.companyName}
                                </Typography>
                                <Typography align="start" style={{border:"1px solid #B7B7B7",marginBottom:"2px"}}>
                                    
                                </Typography>
                                <Typography  align="start" style={{fontFamily:"sans-serif",fontSize:"1.2rem"}}>
                                    Organisation Details: {company.companyDetail}
                                </Typography>
                                <Typography variant="h6" align="start" style={{border:"1px solid #B7B7B7"}}>
                                    
                                </Typography>
                                <Typography align="start" style={{fontFamily:"sans-serif",fontSize:"1.2rem"}}>
                                    Organisation Sector: {company.companySector}
                                </Typography>
                                <Typography variant="h6" align="start" style={{border:"1px solid #B7B7B7"}}>
                                    
                                </Typography>
                                <Typography variant="h6" align="start" marginTop="2px">
                                    <Button onClick={()=>viewInfo(company._id)} style={{background:"#6DA9E4",color:"#000000"}}>View info</Button>
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    ))
                ) : (
                    <Typography variant="h6" align="center">
                        No data
                    </Typography>
                )}
            </StyledDashboard>
        </StyledContainer>
    );
};

export default Dashboard;
