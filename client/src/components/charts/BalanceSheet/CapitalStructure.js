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





export default function BalanceSheetGraphs() {
  const { balanceSheet, setBalanceSheet } = React.useContext(DataContext)
  console.log("BALANCESHEET :", balanceSheet);
 const chartRefs = React.useRef([]);

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
  const capitalStructureOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Capital Structure',
        font: {
          size: 20, // Increase the font size here
        }
      },


    },
  };
  const capitalDeploymentoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Capital Deployment',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const RealAssestDeployedoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend in Real Assets Deployed',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const TrendNonCurrentAssetsoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend in Non-Current Assets',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const TrendCurrentAssetsoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend in Current Assets',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const TrendInCurrentLiabilities = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend in Current Liabilities',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const TrendNonCurrentLiabilities = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend in Non-Current Liabilities',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };


  // Area chart Data here :----
  const labels = balanceSheet.map((ele) => ele.year)
  const capitalStructure = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Total Current Liabilities',
        data: balanceSheet.map((ele) => ele.total_current_liabilities),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Non Current Liabilities',
        data: balanceSheet.map((ele) => ele.total_non_current_liabilities),
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Shareholders Equity',
        data: balanceSheet.map((ele) => ele.total_shareholders_equity),
        borderColor: 'black',
        backgroundColor: 'lightgrey',
        borderWidth: 1.5
      },
    ],
  };
  const capitalDeployment = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Total Current Liabilities',
        data: balanceSheet.map((ele) => ele.total_current_liabilities),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Non Current Liabilities',
        data: balanceSheet.map((ele) => ele.total_non_current_liabilities),
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Shareholders Equity',
        data: balanceSheet.map((ele) => ele.total_shareholders_equity),
        borderColor: 'black',
        backgroundColor: 'lightgrey',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Liability and  Shareholders Equity',
        data: balanceSheet.map((ele) => ele.total_liabilities_and_shareholders_equity),
        borderColor: 'black',
        backgroundColor: 'yellow',
        borderWidth: 1.5
      },
    ],
  };
  const AssestDeployment = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Total Current Assests ',
        data: balanceSheet.map((ele) => ele.total_current_assets),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Non Current Assests',
        data: balanceSheet.map((ele) => ele.total_non_current_assets),
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Assests',
        data: balanceSheet.map((ele) => ele.total_assets),
        borderColor: 'black',
        backgroundColor: 'lightgrey',
        borderWidth: 1.5
      },

    ],
  };
  const TrendNonCurrentAsset = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Property Plant Equipment Net ',
        data: balanceSheet.map((ele) => ele.non_current_assets.Property_Plant_Equipment_Net),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Other Non Current Assests',
        data: balanceSheet.map((ele) => ele.non_current_assets.Other_Non_Current_Assets),
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Marketable Securities',
        data: balanceSheet.map((ele) => ele.non_current_assets.marketable_securities),
        borderColor: 'black',
        borderWidth: 1.5,
        backgroundColor: 'lightgrey',
      },
      {
        fill: true,
        label: 'Total Non Current Assets',
        data: balanceSheet.map((ele) => ele.total_non_current_assets),
        borderColor: 'black',
        backgroundColor: 'lightblue',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Assets',
        data: balanceSheet.map((ele) => ele.total_assets),
        borderColor: 'red',
        backgroundColor: 'lightpink',
        borderWidth: 1.5
      },


    ],
  };
  const TrendCurrentAsset = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Inventories ',
        data: balanceSheet.map((ele) => ele.current_assets.inventories),
        borderColor: 'black',
        backgroundColor: '#FFF2CC',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Account Recievable Net',
        data: balanceSheet.map((ele) => ele.current_assets.accounts_receivablenet),
        borderColor: 'black',
        backgroundColor: '#FFD966',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Vendor NonTrade Recievable',
        data: balanceSheet.map((ele) => ele.current_assets.vendor_non_trade_receivables),
        borderColor: 'black',
        backgroundColor: '#F4B183',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Cash and Cash Equivalent',
        data: balanceSheet.map((ele) => ele.current_assets.cash_and_cash_equivalents),
        borderColor: 'black',
        backgroundColor: '#FFF2CC',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Marketable Securities',
        data: balanceSheet.map((ele) => ele.current_assets.marketable_securities),
        borderColor: 'black',
        backgroundColor: 'lightgrey',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Current Assets',
        data: balanceSheet.map((ele) => ele.total_current_assets),
        borderColor: 'black',
        backgroundColor: '#FFF2CC',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Total Assets',
        data: balanceSheet.map((ele) => ele.total_assets),
        borderColor: 'black',
        backgroundColor: 'lightgrey',
        borderWidth: 1.5
      },


    ],
  };
  const TrendNonCurrentLiabilitiesData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Deferred Revenue ',
        data: balanceSheet.map((ele) => ele.non_current_liabilities.Deferred_Revenue),
        borderColor: 'black',
        backgroundColor: 'grey',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Other Non-Current Liabilities',
        data: balanceSheet.map((ele) => ele.non_current_liabilities.Other_Non_Current_Liabilities),
        borderColor: 'black',
        backgroundColor: 'lightgrey',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Term Debt',
        data: balanceSheet.map((ele) => ele.non_current_liabilities.Term_Debt),
        borderColor: 'black',
        backgroundColor: '#4D4D4D',
        borderWidth: 1.5
      },



    ],
  };
  const TrendCurrentLiabilitiesData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Term Debt ',
        data: balanceSheet.map((ele) => ele.current_liabilities.Term_Debt),
        borderColor: 'black',
        backgroundColor: 'grey',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Deferred Revenue',
        data: balanceSheet.map((ele) => ele.current_liabilities.Deferred_Revenue),
        borderColor: 'black',
        backgroundColor: 'lightgrey',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Commercial Paper',
        data: balanceSheet.map((ele) => ele.current_liabilities.Commercial_Paper),
        borderColor: 'black',
        backgroundColor: '#8D7B68',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Accrued Expenses',
        data: balanceSheet.map((ele) => ele.current_liabilities.Accrued_Expenses),
        borderColor: 'black',
        backgroundColor: '#A4907C',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Other Current Liabilities ',
        data: balanceSheet.map((ele) => ele.current_liabilities.Other_Current_Liabilities),
        borderColor: 'black',
        backgroundColor: '#C8B6A6',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Accounts Payable',
        data: balanceSheet.map((ele) => ele.current_liabilities.Accounts_Payable),
        borderColor: 'black',
        backgroundColor: '#F1DEC9',
        borderWidth: 1.5
      },



    ],
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '75%', alignItems: 'center' }}>
    <Line options={capitalStructureOptions} data={capitalStructure}  ref={(ref) => handleChartLoad(ref, 0)} />
        <Button variant="contained" onClick={() => handleDownload(0)}>
          Download Chart 1
        </Button>
        <Typography style={{ marginBottom: '5px' }}></Typography>

      <Line options={capitalDeploymentoptions} data={capitalDeployment}  ref={(ref) => handleChartLoad(ref, 1)} />
      <Button variant="contained" onClick={() => handleDownload(1)}>Download Chart 2</Button>
      <Typography style={{ marginBottom: '5px' }}></Typography>

      <Line options={RealAssestDeployedoptions} data={AssestDeployment}  ref={(ref) => handleChartLoad(ref, 2)} />
      <Button variant="contained" onClick={() => handleDownload(2)}>Download Chart 3</Button>
      <Typography style={{ marginBottom: '5px' }}></Typography>

      <Line options={TrendNonCurrentAssetsoptions} data={TrendNonCurrentAsset}  ref={(ref) => handleChartLoad(ref, 3)} />
      <Button variant="contained" onClick={() => handleDownload(3)}>Download Chart 4</Button>
      <Typography style={{ marginBottom: '5px' }}></Typography>

      <Line options={TrendCurrentAssetsoptions} data={TrendCurrentAsset}  ref={(ref) => handleChartLoad(ref, 4)} />
      <Button variant="contained" onClick={() => handleDownload(4)}>Download Chart 5</Button>
      <Typography style={{ marginBottom: '5px' }}></Typography>

      <Line options={TrendNonCurrentLiabilities} data={TrendNonCurrentLiabilitiesData} ref={(ref) => handleChartLoad(ref, 5)} />
      <Button variant="contained" onClick={() => handleDownload(5)}>Download Chart 6</Button>
      <Typography style={{ marginBottom: '5px' }}></Typography>

      <Line options={TrendInCurrentLiabilities} data={TrendCurrentLiabilitiesData}  ref={(ref) => handleChartLoad(ref, 6)} />
      <Button variant="contained" onClick={() => handleDownload(6)}>Download Chart 7</Button>
    </div>
  </div>
  )
}
