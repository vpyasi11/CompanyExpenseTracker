import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../../conn';

function CashFlowStatementForm() {
  const navigate = useNavigate();
 const netChangeForWorkingCapitalChanges ="Net_Adjustments_for_Working_Capital_Changes"
  const CashEquivalent = `cash_equivalent_and_restricted_cash_at_the_beginning_of_year`;
  const CashEquivalentEndofYear= `cash_equivalent_and_restricted_cash_at_the_end_of_year`
  const [formData, setFormData] = useState({
    companyId: '',
    cashFlowSheets: [
      {
        year: '',
        [CashEquivalent]: '',
        [CashEquivalentEndofYear]:'',
        totalCashFlow :'',
        operating_activities: {
          net_income: '',
        },
        adjustment_for_non_cash_items: {
          depreciation_and_amortization: '',
          share_based_compensation_expense: '',
          other_item_1: '',
          other_item_2: '',
          [netChangeForWorkingCapitalChanges]:""
        },
        investing_activities: {
          net_sale_purchase_of_marketable_securities: '',
          capital_expenditure_purchase_of_ppe: '',
          business_acquisitions_net: '',
          other_item_1: '',
          other_item_2: '',
        },
        financing_activities: {
          dividends_and_equivalents: '',
          net_repurchase_of_common_stock: '',
          net_issuance_repayments_of_debt_and_commercial_paper: '',
          other_item_1: '',
          payments_for_taxes_related_to_net_share_settlement_of_equity_awards: '',
        },
      },
    ],
  });

  const [cashFlowData, setCashFlowData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let companyId = localStorage.getItem('companyId');
    setFormData((prevState) => ({
      ...prevState,
      companyId: companyId,
    }));
  }, []);

  // handling year change
  const handleYearChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      cashFlowSheets: [
        {
          ...prevState.cashFlowSheets[0],
          year: value,
        },
      ],
    }));
  };
  const handletotalCashFlow = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      cashFlowSheets: [
        {
          ...prevState.cashFlowSheets[0],
          totalCashFlow: value,
        },
      ],
    }));
  };

  // handling cash equivalent change here
  const handleCashEquivalentChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      cashFlowSheets: [
        {
          ...prevState.cashFlowSheets[0],
          [CashEquivalent]: value,
        },
      ],
    }));
  };
  const handleCashEquivalentEndChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      cashFlowSheets: [
        {
          ...prevState.cashFlowSheets[0],
          [CashEquivalentEndofYear]: value,
        },
      ],
    }));
  };

  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');
    setFormData((prevState) => {
      const updatedFormData = { ...prevState };
      if (!updatedFormData.cashFlowSheets[0][section]) {
        updatedFormData.cashFlowSheets[0][section] = {};
      }
      updatedFormData.cashFlowSheets[0][section][key] = value;
      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleContinueSubmit = async () => {
    setModalOpen(false);
    let companyId = localStorage.getItem('companyId');
    try {
      const response = await axios.post(`${baseUrl}/cashflowstatement/create`, formData);

      if (response.data) {
        console.log(response.data);
        alert('CASHFLOW CREATED SUCCESSFULLY!');
      } else {
        alert('ERROR IN CREATING SHEET');
      }
    } catch (error) {
      console.error(error);
      alert('ERROR');
    }
  };

  return (
    <Container maxWidth="md">
      <h1>Cash Flow Sheet</h1>
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
              value={formData.cashFlowSheets[0].year}
              onChange={handleYearChange}
            />
            <TextField
              fullWidth
              required
              label="totalCashFlow"
              name="totalCashFlow"
              type="number"
              value={formData.cashFlowSheets[0].totalCashFlow}
              onChange={handletotalCashFlow}
            />
            <TextField
              fullWidth
              required
              label={CashEquivalent}
              name={CashEquivalent}
              type="number"
              value={formData.cashFlowSheets[0][CashEquivalent]}
              onChange={handleCashEquivalentChange}
            />
            <TextField
              fullWidth
              required
              label={CashEquivalentEndofYear}
              name={CashEquivalentEndofYear}
              type="number"
              value={formData.cashFlowSheets[0][CashEquivalentEndofYear]}
              onChange={handleCashEquivalentEndChange}
            />
          </Grid>
          {Object.entries(formData.cashFlowSheets[0]).map(([section, sectionData]) => {
            if (section === 'year' || section ===`${CashEquivalent}`|| section==='totalCashFlow' || section===`${CashEquivalentEndofYear}`) return null;
            return (
              <React.Fragment key={section}>
                <Grid item xs={12}>
                  <Typography variant="h6">{section.replace(/_/g, ' ')}</Typography>
                </Grid>
                {Object.entries(sectionData).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={`${section}_${key}`}>
                    <TextField
                      fullWidth
                      label={key.replace(/_/g, ' ')}
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/dashboard')}>
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
      {cashFlowData.length > 0 && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            CASHFLOW DATA
          </Typography>
          <pre>{JSON.stringify(cashFlowData, null, 2)}</pre>
        </>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Submission
          </Typography>
          <Typography variant="body1" gutterBottom>
            Want to submit cashFlow again? Click Submit or move to the next form...
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

export default CashFlowStatementForm;
