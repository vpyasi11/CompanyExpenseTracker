import React, { useState } from 'react'
import DataContext from './DataContext'

export default function ContextProvider({children}) {
    const [companyList, setCompanyList] = useState([])

    // LAYOUT DATA'S 
    const [balanceSheet, setBalanceSheet] = React.useState([]);
    const [incomeSheet, setIncomeSheet] = React.useState([]);
    const [cashFlowSheet, setCashFlowSheet] = React.useState([]);
    //making new company
    const [newcompany,setNewCompany]=useState({
      companyName: "",
      companyDetail: "",
      projectDetail: "",
      companySector: "",
      companyDataCreationDate: "",
      userId: "",
    })

    //userAuthentication
    const [userAuth, setUserAuth] = useState({
      email: "",
      password: "",
      isLoggedIn: false
    })
    
    // making cookies
  return (
    <DataContext.Provider value={
        {
            companyList,setCompanyList,newcompany,setNewCompany,userAuth,setUserAuth,
            balanceSheet,setBalanceSheet,incomeSheet,setIncomeSheet,cashFlowSheet, setCashFlowSheet
            
        }
    } >
    {children}
    </DataContext.Provider>
  )
}
