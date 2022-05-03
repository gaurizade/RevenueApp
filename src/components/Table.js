import React , {useState, useEffect, useCallback} from 'react'
import './App.css';
import {DatePicker} from '@shopify/polaris';
//import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const Table = ({post}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Region</th>
          <th>Memory</th>
          <th>CPUs</th>
          <th>Disk Size</th>
        </tr>
      </thead>

      <tbody>
      { post.orders.map( (post, index) => {
           return (
            <tr key={ index }>
              <td>{ post.id }</td>
              <td>{ post.id }</td>
              <td>{ post.id}</td>
              <td>{ post.id }</td>
              <td>{ post.id }</td>
              <td>{ post.id }</td>
            </tr>
          )
         })  }
        
      </tbody>
    </table>
  );
}

export default Table