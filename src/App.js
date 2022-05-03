import React , {useState, useEffect, useCallback} from 'react'
import './App.css';
import {DatePicker} from '@shopify/polaris';
//import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    
  const [{month, year}, setDate] = useState({month:2, year: 2022});
 /*const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2022 00:00:00 GMT-0500 (EST)'),
    end: new Date('Mon Mar 12 2022 00:00:00 GMT-0500 (EST)'),
  });*/

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  const [post, setPostArray] = useState([])
  const [loadingData, setLoadingData] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState(new Date())
  const [isRefund, setIsRefund] = useState([])

  console.log(selectedDates)

  var startDate = selectedDates.start; 
  console.log("Start Date : " + startDate)

  var endDate = selectedDates.end; 
  console.log("End Date : " +endDate)

  const clearDates =() => {
    startDate  = null;
    endDate = null
  }

  const t= [];
  const p =[];
  const d =[];
  var pT , gT, nT;
  
  
useEffect(()  => {
  if (isOpen){
     var response = fetch(`/admin/api/2022-04/orders.json?processed_at_min=${startDate}&processed_at_max=${endDate}&limit=250&status=closed`) 
    .then(response => response.json())
    .then(json => {
    setPostArray(json);
    setLoadingData(false); 

    })

    
  
}},[isOpen]);

//console.log({isRefund})
const renderBody = () => {  

  return (
    <div>
      {
        loadingData ? <div>Loading...</div> :  
        <ul>
   {
            post.orders.map((post, index) => {
   
              let rows=[];
             
              let grossTotal=0;
              let netArr = []
              let netArr1 = []
             
              let sum=0
              let  discountTotal=0;
              let priceTotal =0
              let nettotal =0

              t.push(post.subtotal_price)  
              p.push(post.total_price_usd) 

              d.push(post.total_discounts)
              //console.log(d)
              let netT; 
              //console.log(p)
                  // push for Total Sales
                  rows.push( post.total_price_usd)  
                  rows.push( post.total_tax)  
 
                  for (var i = 0; i < rows.length; i++) {
                    sum = ( parseFloat(rows[0] )+parseFloat(rows[1] ) );
                  }
               
                  for (var i = 0; i < t.length; i++) {
                    grossTotal = grossTotal + parseFloat( t[i])
                  }
                  
                  gT =grossTotal.toFixed(2)
                //console.log(grossTotal)

                 for (var i = 0; i < p.length; i++) {
                  priceTotal = priceTotal +  parseFloat(p[i]) 
                 
                    }
                  pT = priceTotal.toFixed(2)
                    //console.log(priceTotal)

                for (var i = 0; i < d.length; i++) {
                  discountTotal =  discountTotal +  parseFloat(d[i])            
                    }
  
                //console.log(discountTotal)
                  
                  /*total = rows.reduce(function (a,b) {
                    return a+b;
                  })*/

                  // push for net Sales
                  netArr.push(post.subtotal_price)
                  netArr1.push(post.total_discounts)
                  
                  //console.log (netArr)
                  
                  for (var i = 0; i < netArr.length; i++) {
                    netT =   (parseFloat(netArr[i])-parseFloat(netArr1[i] )).toFixed(2) ;
                  }

                  /*net = netArr.reduce(function (a,b) {
                    return ((a-b),0);
                  })*/

                 nettotal = grossTotal - discountTotal;
                //console.log (nettotal)

                nT =nettotal.toFixed(2)
              return (
                  
                  <tr key={index} >
                      <td > {post.order_number} </td>
                      <td > {post.total_discounts} </td>
                      <td > {post.total_tax} </td>
                     
                      <td > {post.total_price_usd} </td>
                      <td > {post.subtotal_price}     </td>
                      <td > {netT}   </td>
                     
                  </tr>
   
              )
             
            }) 
           
          }
       
        </ul>
      }
      <button onClick={()=>console.log(post.orders)}/>

    </div>
    );
  } 

  return (

      <div className="App">
        
      <h1 id='title'>Order Summary </h1>  
     
      <DatePicker placeholderText ="Select Your Date"
          month={month}
          year={year}
          selected={selectedDates}
          onChange={date => { 
          setSelectedDates(date);
           
          }}
        onMonthChange={handleMonthChange}
        dateFormat="yyyy/MM/dd"    
        isClearable
        multiMonth
        allowRange
    />
    
    
    <button style = {{
                    width:100, 
                    height: 30, 
                    alignItems:"center"
                    }} 
            onClick={()=>setIsOpen(true)}>Search</button>
    
    <button style = {{
                    width:100, 
                    height: 30, 
                    marginLeft : 20,
                    alignItems:"center"
                    }} 
                    onclick={()=>clearDates()}>Reset</button>

    <table id="ex_table" style = {{marginTop : 100}}>
         
      <thead style ={{width :100}}>   
        <tr>
          <th>ID </th>
          <th>Discount </th>
          <th>Tax</th>
         
          <th>Total Sales  </th>
          <th>Gross Sales  </th>
          <th>Net Sales  </th>
        </tr>

      </thead>
      
      <tbody id = 'ex_row'>
          {renderBody()}
      </tbody>

    </table>

    <tfoot id = 'ex_foot'>
      <tr>
       <th  width = '410px'> Totals </th>
       <th  width = '150px'>{pT}</th>
       <th  width = '60px'>{gT}</th>
       <th  width = '180px'>{nT}</th>
      </tr>

    </tfoot> 
  </div>
  
 
  );
  
}

export default App;
