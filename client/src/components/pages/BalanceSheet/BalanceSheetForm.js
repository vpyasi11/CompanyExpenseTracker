import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Modal,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import baseUrl from "../../../conn";

function BalanceSheetForm() {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    companyId: "",
    balanceSheets: [
      {
        year: "",
        current_assets: {
          cash_and_cash_equivalents: "",
          marketable_securities: "",
          accounts_receivablenet: "",
          inventories: "",
          vendor_non_trade_receivables: "",
          other_current_assets: "",
          deferred_taxes_sets: "",
          other_items_2: "",
        },
        non_current_assets: {
          marketable_securities: "",
          Property_Plant_Equipment_Net: "",
          Other_Non_Current_Assets: "",
          Goodwill: "",
          Acquired_Intangible_Assets: "",
        },
        current_liabilities: {
          Accounts_Payable: "",
          Other_Current_Liabilities: "",
          Deferred_Revenue: "",
          Commercial_Paper: "",
          Term_Debt: "",
          Accrued_Expenses: "",
          Other_Item_2: "",
        },
        non_current_liabilities: {
          Term_Debt: "",
          Other_Non_Current_Liabilities: "",
          Deferred_Revenue: "",
          Other_Item_2: "",
        },
        share_holders_equity: {
          common_stock_and_additional_paid_in_capital: "",
          retained_earnings_accumulated_deficit: "",
          accumulated_other_comprehensive_income_Loss: "",
          Other_Item_1: "",
          Other_Item_2: "",
        },
      },
    ],
  });

  const [balanceSheetData, setBalanceSheetData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {

    localStorage.removeItem("companyId");
    const fetchData = async () => {
      try {
        const response = await axios(`${baseUrl}/company/companies`);
        console.log(response.data);
        if (response.data.length > 0) {
          let currentCompanyid = response.data[response.data.length - 1]._id;
          console.log(currentCompanyid);
          setFormData((prevState) => ({
            ...prevState,
            companyId: currentCompanyid,
          }));
          localStorage.setItem("companyId", currentCompanyid); // Set companyId in localStorage
        }else{
            alert("No company added.. move to add company")
            localStorage.removeItem("companyId")
            navigate("/company")
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);



  const handleYearChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      balanceSheets: [
        {
          ...prevState.balanceSheets[0],
          year: value,
        },
      ],
    }));
  };

  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split(".");
    setFormData((prevState) => {
      const updatedFormData = { ...prevState };
      if (!updatedFormData.balanceSheets[0][section]) {
        updatedFormData.balanceSheets[0][section] = {};
      }
      updatedFormData.balanceSheets[0][section][key] = value;
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
        "http://localhost:3001/balancesheet/create",
        formData
      );

      if (response.data) {
        console.log(response.data);
        alert("Balance sheet created successfully!");
      } else {
        
        alert("Error creating balance sheet");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating balance sheet");
    }
  };

  const handleShowData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/balancesheet");

      if (response.status === 200) {
        console.log(response.data);
        setBalanceSheetData(response.data);
      } else {
        console.error(response.data);
        alert("Error fetching balance sheet data");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching balance sheet data");
    }
  };

  return (
    <Container maxWidth="md">
      <h1>Balance Sheet</h1>
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
              value={formData.balanceSheets[0].year}
              onChange={handleYearChange}
            />
          </Grid>
          {Object.entries(formData.balanceSheets[0]).map(([section, sectionData]) => {
            if (section === "year") return null;
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
          {/* <Button variant="contained" color="secondary" onClick={handleShowData}>
            Show Data
          </Button> */}
          <Button variant="contained" color="secondary" onClick={()=>navigate('/incomestatement')}>
           Next
          </Button>
        </Grid>
      </form>
      {balanceSheetData.length > 0 && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Balance Sheet Data
          </Typography>
          <pre>{JSON.stringify(balanceSheetData, null, 2)}</pre>
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
            Want to submit balancheet again ? click submit 
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
  );
}

export default BalanceSheetForm;
