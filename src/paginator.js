import React from 'react'

const Paginator = ({pages, currentPage, onNextClick, onPreviousClick}) => {
    return(
        <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li className="page-item"><a className="page-link" onClick = {() => {onPreviousClick()}}>Previous</a></li>
    {pages.map((p) => { 
        return (
    <li className="page-item"><a className="page-link" onClick = {() => {currentPage(p)}}>{p}</a></li>);
    })}
    <li className="page-item"><a className="page-link" onClick = {() => {onNextClick()}}>Next</a></li>
  </ul>
</nav>
    )
}


export default Paginator