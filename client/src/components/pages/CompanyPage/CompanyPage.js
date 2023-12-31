import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../../conn";
import TableLayoutBalanceSheet from "../../layout/TableLayout";
import IncomeSheetLayout from "../../layout/IncomeSheetLayout";
import CashFlowLayout from "../../layout/CashFlowLayout";

function CompanyDashboard() {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [activeLayout, setActiveLayout] = useState(null);
  const navigate = useNavigate()
  const { id } = useParams();
  const FontStyleValue = {
    fontFamily: "sans-sarif",
    fontWeight: "10px"
  }
  const FontstyleData = {
    fontFamily: "sans-sarif",
    fontWeight: "3px"
  }
  useEffect(() => {
    // Fetch company information from the backend

    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/company/company/${id}`);
        console.log(response.data);
        if (response.data) {
          setCompanyInfo(response.data);
          localStorage.setItem("companyId", id)
        } else {
          console.error("Error fetching company information");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanyInfo();
  }, []);

  const handleLayoutClick = (layoutName) => {
    setActiveLayout((prevLayout) => (prevLayout === layoutName ? null : layoutName));
  };

  return (
    <>
      <Container style={{ marginTop: "2rem", background: "#F5EBEB", borderRadius: "12px" }}>
        {companyInfo ? (
          <>
            <Typography variant="h4" align="start" gutterBottom style={FontStyleValue} >
              {companyInfo.companyName}
            </Typography>
            <Typography align="start" style={{ border: "1px solid #B7B7B7", marginBottom: "2px" }}>

            </Typography>
            <Grid container spacing={2}>

              <Grid item xs={6} >
                <Typography variant="h5" style={FontStyleValue}>Overview</Typography>
                <Typography variant="body1" style={FontstyleData}>{companyInfo.companyName}</Typography>
                <Typography align="start" style={{ border: "1px solid #B7B7B7", marginBottom: "2px" }}>

                </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="h5" style={FontStyleValue}>CompanySector</Typography>
                <Typography variant="body1" style={FontstyleData}>{companyInfo.companySector}</Typography>
                <Typography align="start" style={{ border: "1px solid #B7B7B7", marginBottom: "2px" }}>

                </Typography>
              </Grid>
              <Grid item xs={12} >
                <Typography variant="h5" style={FontStyleValue}>Details</Typography>
                <Typography variant="body1" style={FontstyleData}>{companyInfo.companyDetail}</Typography>
                <Typography align="start" style={{ border: "1px solid #B7B7B7", marginBottom: "2px" }}>

                </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="h5" style={FontStyleValue}>ProjectDetail</Typography>
                <Typography variant="body1" style={FontstyleData}>{companyInfo.projectDetail}</Typography>

              </Grid>
              


              {/* Add more company information fields here */}
            </Grid>

          </>
        ) : (
          <Typography variant="h3" align="center">
            Loading...
          </Typography>
        )}

        {/* Render the selected layout */}

      </Container>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLayoutClick("balanceSheet")}
          disabled={activeLayout === "balanceSheet"}
          style={{ marginRight: "10px" }}
        >
          Show Company Balance Sheets
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLayoutClick("incomeSheet")}
          disabled={activeLayout === "incomeSheet"}
          style={{ marginRight: "10px" }}
        >
          Show Company Income Sheet
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLayoutClick("cashFlow")}
          disabled={activeLayout === "cashFlow"}
        >
          Show Company Cash Flow
        </Button>


      </div>
      {activeLayout === "balanceSheet" && <TableLayoutBalanceSheet />}
      {activeLayout === "incomeSheet" && <IncomeSheetLayout />}
      {activeLayout === "cashFlow" && <CashFlowLayout />}
    </>
  );
}

export default CompanyDashboard;
