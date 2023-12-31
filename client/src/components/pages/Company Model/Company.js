import React, { useState, useContext, useEffect } from 'react';
import { Autocomplete, Button, Container, Grid, TextField, Typography } from '@mui/material';
import baseUrl from '../../../conn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../../../context/DataContext';
function Company() {
  const navigate = useNavigate();
  const { newcompany, setNewCompany } = useContext(DataContext)

  // const [namedata, setNames] = useState([])
  // const [value, setValue] = useState(namedata[0]);
  // const [inputValue, setInputValue] = useState('');



  useEffect(() => {

    localStorage.removeItem("userId");
    const fetchData = async () => {
      try {
        const response = await axios(`${baseUrl}/users`);
        // console.log(response.data);
        if (response.data.length > 0) {
          let userId= response.data[response.data.length - 1]._id;
          
          setNewCompany((prevState) => ({
            ...prevState,
            userId: userId,
          }));
          localStorage.setItem("userId", userId); // Set companyId in localStorage
        }else{
            alert("No user..please register")
            localStorage.removeItem("userId")
            navigate("/register")
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const handleChange = (e) => {
    setNewCompany({
      ...newcompany,
      [e.target.name]: e.target.value
    })
  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newcompany);


    try {
      const response = await axios.post(`${baseUrl}/company/addcompany`, newcompany)


      if (response.data) {

        console.log(response.data,"THIS IS FROM COMPANY COMPONENT");
        alert('Company model created successfully!');
        navigate('/balancesheetform')
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert('Error creating Company model');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating Company model');
    }

  };



  return (
    <Container maxWidth="md">

      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Company name"
            name="companyName"
            value={newcompany.companyName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Company detail"
            name="companyDetail"
            type="text"
            value={newcompany.companyDetail}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Project detail"
            name="projectDetail"
            type="text"
            value={newcompany.projectDetail}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Company sector"
            name="companySector"
            type="text"
            value={newcompany.companySector}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Company Data Creation Date"
            name="companyDataCreationDate"
            type="date"
            value={newcompany.companyDataCreationDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id={namedata.map((ele,i)=>i)}
            options={namedata}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="username" />}
          /> */}



        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginRight: 1 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>

      </Grid>

      {Company.length > 0 && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Company Data
          </Typography>
          <pre>{JSON.stringify(Company, null, 2)}</pre>
        </>
      )}
    </Container>
  );
}

export default Company;
