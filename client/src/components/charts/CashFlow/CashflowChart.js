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





export default function CashflowChart() {
  const { cashFlowSheet, setCashFlowSheet } = React.useContext(DataContext)
  console.log("cashFlowSheet :", cashFlowSheet);
  const chartRefs = React.useRef([]);

  // LOGIC TO DOWLOAD THE FILE
  const handleDownload = async (chartIndex) => {
    console.log(chartIndex, "chart index");
    if (chartRefs.current[chartIndex]) {
      console.log(chartRefs.current[chartIndex], "element");
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
    console.log(chartInstance, chartIndex, ":chartInstance and ChartIndex");
    chartRefs.current[chartIndex] = {
      chartInstance: chartInstance,
    };
  };



  // Area chart all options here
  const TotalCashFlowoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cash Flow Behaviour - Total Cash Flow',
        font: {
          size: 20, // Increase the font size here
        }
      },


    },
  };
  const FinancingInvestingandOperatingoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cash Flow Behaviour - Financing, Investing and Operating',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const FIOtowardTotalCashFlowoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Contribution of Financing, Investing and Operating Cash toward Total Cash FLow',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const OpeningCashoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Opening Cash, Cash Flows and Ending Cash',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const TrendandComponentsoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend and Components in Operating Cash Flows',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };
  const TrendandCompInvestingCashFlowoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend and Components in Investing Cash Flows',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };

  const TrendandCompFinancingCashFlowoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend and Components in Financing Cash Flows',
        font: {
          size: 20, // Increase the font size here
        }
      },
    },
  };


  // Area chart Data here :----
  const labels = cashFlowSheet.map((ele) => ele.year)
  const TotalCashFlow = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Total Cash Flow',
        data: cashFlowSheet.map((ele) => ele.totalCashFlow),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1.5
      },
     
     
    ],
  };

  const FinancingInvestingandOperating = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Cash Flow from Financing Activities',
        data: cashFlowSheet.map((ele) => ele.total_financing_activities
        ),
        borderColor: 'black',
        backgroundColor: 'rgba(211, 211, 211,0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Cash Flow from Investing Activities ',
        data: cashFlowSheet.map((ele) => ele.total_investing_activities),
        borderColor: 'black',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Cash Flow from Operating Activities',
        data: cashFlowSheet.map((ele) => ele.total_operating_activities),
        borderColor: 'black',
        backgroundColor: 'rgba(211, 211, 211,0.2)',
        borderWidth: 1.5
      },





    ],
  };
  const FIOtowardTotalCashFlow = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Total Cash Flows During the Year',
        data: cashFlowSheet.map((ele) => ele.totalCashFlow
        ),
        borderColor: 'black',
        backgroundColor: 'rgba(211, 211, 211, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Cash Flow from Financing Activities',
        data: cashFlowSheet.map((ele) => ele.total_financing_activities),
        borderColor: 'black',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Cash Flow from Operating Activities',
        data: cashFlowSheet.map((ele) => ele.total_operating_activities),
        borderColor: 'black',
        backgroundColor: 'rgba(211, 211, 211, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Cash Flow from Investing Activities',
        data: cashFlowSheet.map((ele) => ele.total_investing_activities),
        borderColor: 'black',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        borderWidth: 1.5
      },





    ],
  };
  const OpeningCash = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Total Cash Flows During the Year',
        data: cashFlowSheet.map((ele) => ele.totalCashFlow
        ),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Cash, equivalent & restricted cash at the beginning of year',
        data: cashFlowSheet.map((ele) => ele.cash_equivalent_and_restricted_cash_at_the_beginning_of_year),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Cash, equivalent & restricted cash at the end of year',
        data: cashFlowSheet.map((ele) => ele.cash_equivalent_and_restricted_cash_at_the_end_of_year),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
     





    ],
  };
  const TrendandComponents = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Share based compensation expense',
        data: cashFlowSheet.map((ele) => ele.adjustment_for_non_cash_items.share_based_compensation_expense
        ),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Depreciation & Amortization',
        data: cashFlowSheet.map((ele) => ele.adjustment_for_non_cash_items.depreciation_and_amortization),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Net Adjustments for Working Capital Changes',
        data: cashFlowSheet.map((ele) => ele.adjustment_for_non_cash_items.Net_Adjustments_for_Working_Capital_Changes),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Net Income',
        data: cashFlowSheet.map((ele) => ele.operating_activities.net_income),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
     
      {
        fill: true,
        label: 'Cash Flow from Operating Activities',
        data: cashFlowSheet.map((ele) => ele.total_operating_activities),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
     





    ],
  };
  const TrendandCompInvestingCashFlow = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Business Acquisitions, Net',
        data: cashFlowSheet.map((ele) => ele.investing_activities.business_acquisitions_net
        ),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Capital Expenditure (Purchase of PP&E)',
        data: cashFlowSheet.map((ele) => ele.investing_activities.capital_expenditure_purchase_of_ppe),
        borderColor: 'black',
        backgroundColor: 'RGBA(30, 30, 30, 0.2)',
        borderWidth: 1.5
      },
     
      {
        fill: true,
        label: 'Net Sale (Purchase) of Marketable Securities',
        data: cashFlowSheet.map((ele) => ele.investing_activities.net_sale_purchase_of_marketable_securities),
        borderColor: 'black',
        backgroundColor: 'rgba(162, 162, 235, 0.2)',
        borderWidth: 1.5
      },
     
      {
        fill: true,
        label: 'Cash Flow from Investing Activities',
        data: cashFlowSheet.map((ele) => ele.total_investing_activities),
        borderColor: 'black',
        backgroundColor: 'rgba(56, 122, 12, 0.2)',
        borderWidth: 1.5
      },
     





    ],
  };
  const TrendandCompFinancingCashFlow = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Net Issuance (Repayments) of Debt & Commercial Paper',
        data: cashFlowSheet.map((ele) => ele.financing_activities.net_issuance_repayments_of_debt_and_commercial_paper
        ),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
      {
        fill: true,
        label: 'Dividends & Equivalents',
        data: cashFlowSheet.map((ele) => ele.financing_activities.dividends_and_equivalents),
        borderColor: 'black',
        backgroundColor: 'RGBA(120, 100, 12, 0.2)',
        borderWidth: 1.5
      },
     
      {
        fill: true,
        label: 'Net Repurchase of Common Stock',
        data: cashFlowSheet.map((ele) => ele.financing_activities.net_repurchase_of_common_stock),
        borderColor: 'black',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1.5
      },
     
      {
        fill: true,
        label: 'Cash Flow from Financing Activities',
        data: cashFlowSheet.map((ele) => ele.total_financing_activities),
        borderColor: 'black',
        backgroundColor: 'RGBA(59, 60, 12, 0.2)',
        borderWidth: 1.5
      },
     





    ],
  };
  // const RevenueAndCostProduct = {
  //   labels,
  //   datasets: [
  //     {
  //       fill: true,
  //       label: 'Cost of Goods Sold - Product ',
  //       data: cashFlowSheet.map((ele) => ele.costOfGoodsSold.product),
  //       borderColor: 'black',
  //       backgroundColor: '#FFF2CC',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Revenue from Sales of Products ',
  //       data: cashFlowSheet.map((ele) => ele.revenue.product),
  //       borderColor: 'black',
  //       backgroundColor: '#FFD966',
  //       borderWidth: 1.5
  //     },






  //   ],
  // };
  // const ExpenseBehaviour = {
  //   labels,
  //   datasets: [
  //     {
  //       fill: true,
  //       label: 'Interest Expense',
  //       data: cashFlowSheet.map((ele) => ele.nonOperatingExpenses.interestExpense),
  //       borderColor: 'black',
  //       backgroundColor: '#F5F5F5',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Research and Development (R&D)',
  //       data: cashFlowSheet.map((ele) => ele.operatingExpenses.researchAndDevelopment),
  //       borderColor: 'black',
  //       backgroundColor: '#F2EAD3',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Selling, General & Administrative (SG&A)',
  //       data: cashFlowSheet.map((ele) => ele.operatingExpenses.sellingGeneralAndAdministrative),
  //       borderColor: 'black',
  //       backgroundColor: '#DFD7BF',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Provision for Tax',
  //       data: cashFlowSheet.map((ele) => ele.provisionForTax),
  //       borderColor: 'black',
  //       backgroundColor: '#3F2305',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Total Cost of Goods Sold',
  //       data: cashFlowSheet.map((ele) => ele.totalcostOfGoodsSold),
  //       borderColor: 'black',
  //       backgroundColor: '#F2EAD3',
  //       borderWidth: 1.5
  //     },






  //   ],
  // };
  // const IncomeAndMarginBehaviour = {
  //   labels,
  //   datasets: [
  //     {
  //       fill: true,
  //       label: 'Interest & Dividend Income',
  //       data: cashFlowSheet.map((ele) => ele.nonOperatingExpenses.interestAndDividendIncome),
  //       borderColor: 'black',
  //       backgroundColor: '#F5F5F5',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Net Income',
  //       data: cashFlowSheet.map((ele) => ele.netIncome),
  //       borderColor: 'black',
  //       backgroundColor: '#F2EAD3',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Earnings Before Tax',
  //       data: cashFlowSheet.map((ele) => ele.earningsBeforeTax),
  //       borderColor: 'black',
  //       backgroundColor: '#DFD7BF',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Operating Income',
  //       data: cashFlowSheet.map((ele) => ele.operatingIncome),
  //       borderColor: 'black',
  //       backgroundColor: '#3F2305',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Gross Margin',
  //       data: cashFlowSheet.map((ele) => ele.grossMargin),
  //       borderColor: 'black',
  //       backgroundColor: '#F2EAD3',
  //       borderWidth: 1.5
  //     },
  //     {
  //       fill: true,
  //       label: 'Total Net Revenues',
  //       data: cashFlowSheet.map((ele) => ele.totalRevenue),
  //       borderColor: 'black',
  //       backgroundColor: '#F2EAD3',
  //       borderWidth: 1.5
  //     },







  //   ],
  // };




  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '75%', alignItems: 'center' }}>
        <Line options={TotalCashFlowoptions} data={TotalCashFlow} ref={(ref) => handleChartLoad(ref, 0)} />
        <Button variant="contained" onClick={() => handleDownload(0)}>
          Download Chart 1
        </Button>
        <Typography style={{ marginBottom: '5px' }}></Typography>

        <Line options={FinancingInvestingandOperatingoptions} data={FinancingInvestingandOperating} ref={(ref) => handleChartLoad(ref, 1)} />
        <Button variant="contained" onClick={() => handleDownload(1)}>Download Chart 2</Button>
        <Typography style={{ marginBottom: '5px' }}></Typography>

         <Line options={FIOtowardTotalCashFlowoptions} data={FIOtowardTotalCashFlow} ref={(ref) => handleChartLoad(ref, 2)} />
        <Button variant="contained" onClick={() => handleDownload(2)}>Download Chart 3</Button>
        <Typography style={{ marginBottom: '5px' }}></Typography>

        <Line options={OpeningCashoptions} data={OpeningCash} ref={(ref) => handleChartLoad(ref, 3)} />
        <Button variant="contained" onClick={() => handleDownload(3)}>Download Chart 4</Button>
        <Typography style={{ marginBottom: '5px' }}></Typography>

        <Line options={TrendandComponentsoptions} data={TrendandComponents} ref={(ref) => handleChartLoad(ref, 4)} />
        <Typography style={{ marginBottom: '5px' }}></Typography>
        <Button variant="contained" onClick={() => handleDownload(4)}>Download Chart 5</Button>

     <Line options={TrendandCompInvestingCashFlowoptions} data={TrendandCompInvestingCashFlow} ref={(ref) => handleChartLoad(ref, 5)} />
        <Typography style={{ marginBottom: '5px' }}></Typography>
        <Button variant="contained" onClick={() => handleDownload(5)}>Download Chart 5</Button>

          <Line options={TrendandCompFinancingCashFlowoptions} data={TrendandCompFinancingCashFlow} ref={(ref) => handleChartLoad(ref, 6)} />
        <Typography style={{ marginBottom: '5px' }}></Typography>
        <Button variant="contained" onClick={() => handleDownload(6)}>Download Chart 5</Button>
 

      </div>
    </div>
  )
}

