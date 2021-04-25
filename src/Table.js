import React from 'react'
import ArrowsAngleExpand from './arrowsAngleExpand'
import SearchElement from './searchElement'



const Table  = ({data, selectedDate, sortData, onSearchSend, dnaData}) => {

    return(
        <div className="container">
            <SearchElement onSearchSend = {onSearchSend}/>
<table className="table">
    
        <thead style = {{cursor: "pointer"}} >
        <tr>
          <th onClick = {() => {sortData('countriesAndTerritories')}}>country {<ArrowsAngleExpand/>}</th>
          <th onClick = {() => {sortData('dateRep')}}>date {<ArrowsAngleExpand/>}</th>
          <th onClick = {() => {sortData('cases')}}>cases {<ArrowsAngleExpand/>}</th>
          <th onClick = {() => {sortData('deaths')}}>deaths {<ArrowsAngleExpand/>}</th>

        </tr>
        </thead>
        <tbody>
            
            
            {data.map(item=>(
                <tr>
              <td>{item.countriesAndTerritories}</td>
              <td>{item.dateRep}</td>
              <td>{item.cases}</td>
              <td>{item.deaths}</td>
              </tr>
                ))}
        </tbody>




      </table>
      </div>
    )


            }
export default Table