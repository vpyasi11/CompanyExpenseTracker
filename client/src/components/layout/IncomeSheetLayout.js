import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import baseUrl from '../../conn';
import Pagination from '@mui/material/Pagination';
import { Button, Grid, Stack, Typography } from '@mui/material';
import {useNavigate, useParams} from "react-router-dom"
import DataContext from '../../context/DataContext';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function IncomeSheetLayout() {
  const {id} =useParams()
  const navigate =useNavigate()
  const {incomeSheet, setIncomeSheet} =React.useContext(DataContext)
  const divStyle = {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  //function to convert Uppercase and remove underscore in keyNames
  function formatString(str) {
    const formattedString = str.replace(/_/g, ' ').toUpperCase();
    return formattedString;
  }
  let yearArr =[];
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    // console.log("balanchesheet :",balanceSheet);
    setPage(value);
  };


  React.useEffect(() => {
    const fetchSheet = async () => {
      try {
        // let companyId =localStorage.getItem("compnayId")
        const response = await axios.get(`${baseUrl}/incomestatement/${id}`);
        console.log("response based oncompnyId :",response.data);
        setIncomeSheet(response.data.incomeSheets);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchSheet();
  }, []);




 
  return (
    <div style={divStyle}>
       <Grid item xs={6} >
          <Button style={{ border: "1px solid #B7B7B7" ,marginTop:"4px"}} onClick={() => navigate('/income/analysis')}>View Analysis</Button>
        </Grid>

      <TableContainer component={Paper} style={{ marginTop: '8px', width: "1200px" }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead >
            <StyledTableRow>
              <StyledTableCell >
              Income Sheet for Financial Year (In $ Million)
              </StyledTableCell>
              {incomeSheet.slice(page*2-2,page*2).map((item,index) => {
                 console.log("item :",item);
                  
                return (
                  <StyledTableCell key={index}>
                    {item.year}
                  </StyledTableCell>
                )

              }
              )}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Set(incomeSheet.flatMap(sheet => Object.keys(sheet)))).map((key) => {
              if (key.toLowerCase() !== '_id') { // Exclude 'ID' key
                let formattedKey = formatString(key);
                return (
                  <StyledTableRow key={key}>
                    <StyledTableCell>{formattedKey}</StyledTableCell>
                    {incomeSheet.slice(page*2-2,page*2).map((sheet, index) => {
                      if (typeof sheet[key] === 'object' && key.toLowerCase() !== 'id') { // Exclude 'ID' key
                        return (
                          <StyledTableCell key={`${key}-${index}`}>
                            {Object.entries(sheet[key]).map(([nestedKey, nestedValue]) => {
                              if (nestedKey.toLowerCase() !== 'id') { // Exclude 'ID' key
                                return (
                                  <div key={nestedKey} style={{ fontSize: '12px' }}>
                                  <span style={{ fontSize: "12px"  }}>{formatString(nestedKey)} <span style={{fontSize: "11px"  ,color: "#CD1818"}}>[ in $ ]</span>: </span>
                                  <span style={{ marginLeft: '4px', fontSize: "13px" }}>{nestedValue}</span>
                                </div>
                                );
                              }
                              return null;
                            })}
                          </StyledTableCell>
                        );
                      } else if (key.toLowerCase() !== 'id') { // Exclude 'ID' key
                        return <StyledTableCell key={`${key}-${index}`}>{sheet[key]}</StyledTableCell>;
                      }
                      return null;
                    })}
                  </StyledTableRow>
                );
              }
              return null;
            })}
          </TableBody>



        </Table>
        <Stack spacing={2}>
          <Typography></Typography>
          <Pagination count={incomeSheet.length} page={page} size="large" onChange={handleChange} color="primary" />
        </Stack>
      </TableContainer>

    </div>
  );
}
