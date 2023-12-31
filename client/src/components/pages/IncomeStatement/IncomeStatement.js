
import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import baseUrl from '../../../conn';
function IncomeSheetForm() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({

        companyId: "",
        incomeSheets: [
            {
                year: "",
                grossMargin: "",
                operatingIncome: "",
                earningsBeforeTax: "",
                provisionForTax: "",
                netIncome: "",
                revenue: {
                    product: "",
                    services: "",
                    
                },
                costOfGoodsSold: {
                    product: "",
                    services: ""
                  
                },

                operatingExpenses: {
                    researchAndDevelopment: "",
                    sellingGeneralAndAdministrative: "",
                    otherItems: ""
                  
                },
                nonOperatingExpenses: {
                    interestAndDividendIncome: "",
                    interestExpense: "",
                    otherIncomeOrExpenseNet: "",
                    netInterestIncomeOrExpense: "",
                    otherItems: "",
    
                   
                }
            }
        ]
    })

    const [incomeSheetData, setIncomeSheetData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
      let companyId =localStorage.getItem('companyId');
      setFormData((prevState) => ({
        ...prevState,
        companyId: companyId,
      }));
        
       
      }, []);
    //handling year change
    const handleYearChange = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            incomeSheets: [
                {
                    ...prevState.incomeSheets[0],
                    year: value,
                },
            ],
        }));
    };

    // handling groos margin change here
    const handlegrossMargin = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            incomeSheets: [
                {
                    ...prevState.incomeSheets[0],
                    grossMargin: value,
                },
            ],
        }));
    };
    const handleearningsBeforeTax = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            incomeSheets: [
                {
                    ...prevState.incomeSheets[0],
                    earningsBeforeTax: value,
                },
            ],
        }));
    };
    const handleprovisionForTax = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            incomeSheets: [
                {
                    ...prevState.incomeSheets[0],
                    provisionForTax: value,
                },
            ],
        }));
    };
    // handleing operating income change here
    const handlenetIncome = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            incomeSheets: [
                {
                    ...prevState.incomeSheets[0],
                    netIncome: value,
                },
            ],
        }));
    };
    const handleoperatingIncome = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            incomeSheets: [
                {
                    ...prevState.incomeSheets[0],
                    operatingIncome: value,
                },
            ],
        }));
    };


      const handleSectionChange = (e) => {
        const { name, value } = e.target;
        const [section, key] = name.split(".");
        setFormData((prevState) => {
          const updatedFormData = { ...prevState };
          if (!updatedFormData.incomeSheets[0][section]) {
            updatedFormData.incomeSheets[0][section] = {};
          }
          updatedFormData.incomeSheets[0][section][key] = value;
          return updatedFormData;
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    const handleContinueSubmit = async () => {
        setModalOpen(false);
        let companyId = localStorage.getItem("companyId");
        try {
            const response = await axios.post(
                `${baseUrl}/incomestatement/create`,
                formData
            );

            if (response.data) {
                console.log(response.data);
                alert("INCOME SHEET CREATED SUCCESFULLY!");
            } else {

                alert("ERROR IN CREATING SHEET");
            }
        } catch (error) {
            console.error(error);
            alert("ERROR");
        }
    };

    





    return (
        <Container maxWidth="md">
            <h1>Income Sheet</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            label="Year"
                            name="year"
                            type="number"
                            value={formData.incomeSheets[0].year}
                            onChange={handleYearChange}
                        />
                        <TextField
                            fullWidth
                            required
                            label="grossMargin"
                            name="grossMargin"
                            type="number"
                            value={formData.incomeSheets[0].grossMargin}
                            onChange={handlegrossMargin}
                        />
                        <TextField
                            fullWidth
                            required
                            label="operatingIncome"
                            name="operatingIncome"
                            type="number"
                            value={formData.incomeSheets[0].operatingIncome}
                            onChange={handleoperatingIncome}
                        />
                        <TextField
                            fullWidth
                            required
                            label="earningsBeforeTax"
                            name="earningsBeforeTax"
                            type="number"
                            value={formData.incomeSheets[0].earningsBeforeTax}
                            onChange={handleearningsBeforeTax}
                        />
                        <TextField
                            fullWidth
                            required
                            label="provisionForTax"
                            name="provisionForTax"
                            type="number"
                            value={formData.incomeSheets[0].provisionForTax}
                            onChange={handleprovisionForTax}
                        />
                        <TextField
                            fullWidth
                            required
                            label="netIncome"
                            name="netIncome"
                            type="number"
                            value={formData.incomeSheets[0].netIncome}
                            onChange={handlenetIncome}
                        />
                    </Grid>
                    {Object.entries(formData.incomeSheets[0]).map(([section, sectionData]) => {
                        if (section === "year" || section==="grossMargin" || section==="operatingIncome" || section==="earningsBeforeTax" ||section==="provisionForTax" ||section==="netIncome"  ) return null;
                        return (
                            <React.Fragment key={section}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">{section.replace(/_/g, " ")}</Typography>
                                </Grid>
                                {Object.entries(sectionData).map(([key, value]) => (
                                    <Grid item xs={12} sm={6} key={`${section}_${key}`}>
                                        <TextField
                                            fullWidth
                                            label={key.replace(/_/g, " ")}
                                            name={`${section}.${key}`}
                                            type="number"
                                            value={value}
                                            onChange={handleSectionChange}
                                        />
                                    </Grid>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
                        Submit
                    </Button>

                    <Button variant="contained" color="secondary" onClick={() => navigate('/cashFlow')}>
                        Next
                    </Button>
                </Grid>
            </form>
            {incomeSheetData.length > 0 && (
                <>
                    <Typography variant="h4" align="center" gutterBottom>
                        INCOME SHEET DATA
                    </Typography>
                    <pre>{JSON.stringify(incomeSheetData, null, 2)}</pre>
                </>
            )}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        position: "absolute",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Confirm Submission
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Want to submit incomesheet again ? click submit
                        Or move to next form ...
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" marginTop={2}>
                        <Button onClick={() => setModalOpen(false)} sx={{ marginRight: 2 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleContinueSubmit} variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    )
}

// export const Form = () => {
//     const [firstName, setFirstName] = useState("")
//     const [lastName, setLastName] = useState("")
//     const [age, setAge] = useState("")

//     interface FormDataType {firstName:string, lastName: string, age: string}
//     const responseBody: FormDataType = {firstName: "", lastName: "", age: "0"}

//     const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         responseBody.firstName = firstName
//         responseBody.lastName = lastName
//         responseBody.age = age
//         console.log(JSON.stringify(responseBody))
// 	//Form submission happens here
//     }
//     const inputChangeHandler = (setFunction: React.Dispatch<React.SetStateAction<string>>, event: React.ChangeEvent<HTMLInputElement>) => {
//         setFunction(event.target.value)
//     }

//     return(
//         <form onSubmit={onSubmitHandler}>
//             <div><label htmlFor="first_name">First Name</label></div>
//             <div><input id="first_name" onChange={(e)=>inputChangeHandler(setFirstName, e)} type="text"/></div>
//             <div><label htmlFor="last_name">Last Name</label></div>
//             <div><input id="last_name" onChange={(e)=>inputChangeHandler(setLastName, e)} type="text"/></div>
//             <div><label htmlFor="age">Age</label></div>
//             <div><input id="age" onChange={(e)=>inputChangeHandler(setAge, e)} type="number"/></div>
//             <input type="submit"/>
//         </form>
//     )
// }


export default IncomeSheetForm