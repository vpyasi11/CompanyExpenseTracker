import * as React from 'react';
import { Typography, Button } from '@mui/material';
import html2pdf from "html2pdf.js"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DataContext from '../../../context/DataContext';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);





export default function IncomeSheetChart() {
  const { incomeSheet,setIncomeSheet} = React.useContext(DataContext)
  console.log("incomeSheet :", incomeSheet);
 const chartRefs = React.useRef([]);

 // LOGIC TO DOWLOAD THE FILE
 const handleDownload = async (chartIndex) => {
  console.log(chartIndex,"chart index");
  if (chartRefs.current[chartIndex]) {
    console.log(chartRefs.current[chartIndex],"element");
    const chartInstance = chartRefs.current[chartIndex].chartInstance;
    // console.log(chartInstance,"CHART INSTANCE");

    // await chartInstance.ensureScalesHaveImages();
    await chartInstance.draw();

    const chartElement = chartInstance.canvas;
    const opt = {
      margin: 10,
      filename: 'chart.pdf',
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 1, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };
    
    html2pdf().set(opt).from(chartElement).save();
  }
};

const handleChartLoad = (chartInstance, chartIndex) => {
  console.log(chartInstance,chartIndex,":chartInstance and ChartIndex");
  chartRefs.current[chartIndex] = {
    chartInstance: chartInstance,
  };
};



  // Area chart all options here
  const RevenueBreakdownoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Breakdown - Products and Services',
        font: {
          size: 20, // Increase the font size here
        }
      },


    },
  };
  const costBehaviouroptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cost Behaviour - Products & Services',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const RevenueAndCostProductoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue and Cost Behaviour - Products',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const ExpenseBehaviouroptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Behaviour',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const IncomeAndMarginBehaviouroptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income and Margin Behaviour',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
 

  // Area chart Data here :----
  const labels = incomeSheet.map((ele) => ele.year)
  const RevenueBreakdown = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Revenue from Sales of Services',
        data: incomeSheet.map((ele) => ele.revenue.services),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Revenue from Sales of Products',
        data: incomeSheet.map((ele) => ele.revenue.product),
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Net Revenues',
        data: incomeSheet.map((ele) => ele.totalRevenue),
        borderColor: 'black',
        backgroundColor: 'lightgrey',
        borderWidth: 1.5
      },
    ],
  };

  const costBehaviour = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Cost of Goods Sold - Services ',
        data: incomeSheet.map((ele) => ele.costOfGoodsSold.services),
        borderColor: 'black',
        backgroundColor: '#FFF2CC',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Cost of Goods Sold - Products ',
        data: incomeSheet.map((ele) => ele.costOfGoodsSold.product),
        borderColor: 'black',
        backgroundColor: '#FFD966',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Cost of Goods Sold',
        data: incomeSheet.map((ele) =>  ele.totalcostOfGoodsSold),
        borderColor: 'black',
        backgroundColor: '#F4B183',
        borderWidth: 1.5
      },
   
     
     


    ],
  };
  const RevenueAndCostProduct = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Cost of Goods Sold - Product ',
        data: incomeSheet.map((ele) => ele.costOfGoodsSold.product),
        borderColor: 'black',
        backgroundColor: '#FFF2CC',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Revenue from Sales of Products ',
        data: incomeSheet.map((ele) => ele.revenue.product),
        borderColor: 'black',
        backgroundColor: '#FFD966',
        borderWidth: 1.5
      },
    
   
     
     


    ],
  };
  const ExpenseBehaviour = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Interest Expense',
        data: incomeSheet.map((ele) => ele.nonOperatingExpenses.interestExpense),
        borderColor: 'black',
        backgroundColor: '#F5F5F5',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Research and Development (R&D)',
        data: incomeSheet.map((ele) => ele.operatingExpenses.researchAndDevelopment),
        borderColor: 'black',
        backgroundColor: '#F2EAD3',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Selling, General & Administrative (SG&A)',
        data: incomeSheet.map((ele) => ele.operatingExpenses.sellingGeneralAndAdministrative),
        borderColor: 'black',
        backgroundColor: '#DFD7BF',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Provision for Tax',
        data: incomeSheet.map((ele) => ele.provisionForTax),
        borderColor: 'black',
        backgroundColor: '#3F2305',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Cost of Goods Sold',
        data: incomeSheet.map((ele) => ele.totalcostOfGoodsSold),
        borderColor: 'black',
        backgroundColor: '#F2EAD3',
        borderWidth: 1.5
      },
    
   
     
     


    ],
  };
  const IncomeAndMarginBehaviour = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Interest & Dividend Income',
        data: incomeSheet.map((ele) => ele.nonOperatingExpenses.interestAndDividendIncome),
        borderColor: 'black',
        backgroundColor: '#F5F5F5',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Net Income',
        data: incomeSheet.map((ele) => ele.netIncome),
        borderColor: 'black',
        backgroundColor: '#F2EAD3',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Earnings Before Tax',
        data: incomeSheet.map((ele) => ele.earningsBeforeTax),
        borderColor: 'black',
        backgroundColor: '#DFD7BF',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Operating Income',
        data: incomeSheet.map((ele) => ele.operatingIncome),
        borderColor: 'black',
        backgroundColor: '#3F2305',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Gross Margin',
        data: incomeSheet.map((ele) => ele.grossMargin),
        borderColor: 'black',
        backgroundColor: '#F2EAD3',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Net Revenues',
        data: incomeSheet.map((ele) => ele.totalRevenue),
        borderColor: 'black',
        backgroundColor: '#F2EAD3',
        borderWidth: 1.5
      },

    
   
     
     


    ],
  };
 



  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '75%', alignItems: 'center' }}>
    <Line options={RevenueBreakdownoptions} data={RevenueBreakdown}  ref={(ref) => handleChartLoad(ref, 0)} />
        <Button variant="contained" onClick={() => handleDownload(0)}>
          Download Chart 1
        </Button>
        <Typography style={{ marginBottom: '5px' }}></Typography>

       <Line options={costBehaviouroptions} data={costBehaviour}  ref={(ref) => handleChartLoad(ref, 1)} />
      <Button variant="contained" onClick={() => handleDownload(1)}>Download Chart 2</Button>
      <Typography style={{ marginBottom: '5px' }}></Typography>

      <Line options={RevenueAndCostProductoptions} data={RevenueAndCostProduct}  ref={(ref) => handleChartLoad(ref, 2)} />
      <Button variant="contained" onClick={() => handleDownload(2)}>Download Chart 3</Button>
      <Typography style={{ marginBottom: '5px' }}></Typography>

      <Line options={ExpenseBehaviouroptions} data={ExpenseBehaviour}  ref={(ref) => handleChartLoad(ref, 3)} />
      <Button variant="contained" onClick={() => handleDownload(3)}>Download Chart 4</Button>
      <Typography style={{ marginBottom: '5px' }}></Typography>

    <Line options={IncomeAndMarginBehaviouroptions} data={IncomeAndMarginBehaviour}  ref={(ref) => handleChartLoad(ref, 4)} />
      <Button variant="contained" onClick={() => handleDownload(4)}>Download Chart 5</Button> 
      

     
    </div>
  </div>
  )
}

