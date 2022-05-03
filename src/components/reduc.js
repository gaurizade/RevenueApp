import React , {Component } from 'react';

class Reduce extends Component {
    constructor(){
        super();
        this.state = {
            rowVal : []
        }
    }

    rowTotal = row => {
        this.setState({
            rowVal : [post.orders.total_price_usd, post.orders.total_tax]
        })
    };

    render() {
        return (
            <td>
            {this.state.rowVal.forEach(row =>
                row.reduce(function(y, x) {
                  return y + x;
                }, 0)
              )}   
            </td>
        )
    }
}


const Total =(props) =>{
    const numbers = props.employees;
    const saloTotal = numbers.reduce((totalHolder,m) => totalHolder + m.salary,0);
    return(
          <>
             <p>Total Salary:  {saloTotal}</p>
          </>
    )}


     //console.log(arr)
  /*var table = document.getElementById("myTable");
  let subTotal = Array.from(table.column).reduce((total, column) => {
    return total + parseFloat(column.cells[1].innerHTML);
  }, 0);
  document.getElementById("val").innerHTML = "SubTotal = $" + subTotal.toFixed(2);
console.log(subTotal);
  */