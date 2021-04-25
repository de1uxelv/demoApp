import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from './Table'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Paginator from './paginator'




const App = () => {

  

  //datepicker
  const [selectedDate, setSelectedDate] = useState()
  const [startDate, setStartDate] = useState(new Date("2020/03/21"));
  const [endDate, setEndDate] = useState(new Date("2020/12/14"));

  //page const
  const [totalCountRow, setTotalCountRow] = useState(0)
  const [totalCountPage, setTotalCountPage] = useState(0)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const limitCountPage = 20
  const [buttonDisabled, setButtonDisabled] = useState('')
  const [searchText, setSearchText] = useState('')

  const [directionSort, setDirectionSort] = useState(true)


const sortData = (field) => {
  const copyData = data.concat();

  let sortData;
  if (directionSort) {
    sortData = copyData.sort(
      (a, b) => {return a[field] > b[field] ? 1 : -1}
    )} 
    sortData = copyData.reverse(
      (a, b) => {return a[field] > b[field] ? 1 : -1}
  )

  setData(sortData)
  setDirectionSort(!directionSort)
}


  //getting data
  const baseUrl = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/'
  const [data, setData] = useState ([])
  useEffect(() =>{
    axios.get(baseUrl)
    .then (
      (res) => {
        setData(res.data.records.splice(0, 100))  //temp splice 341
      }
    )
  },  [])



  //filter
  const getFilteredData = () => {
    if (!searchText){ return data } return data.filter(el => {
      return el['countriesAndTerritories'].toLowerCase().includes(searchText.toLowerCase())
    })
  } 


  

  const filteredData = getFilteredData()
  const onSearchSend = (text) => {
    setSearchText(text)
  }

 //pages
  const lastBlockRow = currentPageNumber * limitCountPage
  const firstBlockRow = lastBlockRow - limitCountPage + 1
  const currentBlockRows = filteredData.slice(firstBlockRow, lastBlockRow)  // data - - filteredData
  const currentPage = (pg) => {
    setCurrentPageNumber(pg)
    setButtonDisabled('')
  }
  useEffect(() => {
    setTotalCountRow(filteredData.length)
    const getTotalCountPage = Math.ceil(totalCountRow / limitCountPage) 
    setTotalCountPage(getTotalCountPage)
  },[setTotalCountRow, filteredData.length, totalCountRow])
  let pages = []
  for(let i = 1; i <= totalCountPage; i++){
    pages.push(i)
  }
  //buttons
const onNextClick = () => {
  if(currentPageNumber > totalCountPage - 1) {
    setButtonDisabled('disabled')
    return 
  } 
  setCurrentPageNumber(currentPageNumber + 1)
}
const onPreviousClick = () => {
  if(currentPageNumber < 2) {
    setButtonDisabled('disaled')
     return
  }
  setCurrentPageNumber(currentPageNumber - 1)
}

const andData = {
  country: 'Albania',
  averageDeaths: '',
  averageCases:''
}

//tempdata not used :)
const getDNA = () => {

    const countryTemp = data.reduce((acc, item) => {
      if(acc != item.countriesAndTerritories)
      {
        acc = acc + item.countriesAndTerritories
      } return acc
    }, '')

    const deathsTemp = data.reduce((acc, item) => {
        acc = acc + item.deaths + ","
      return acc;
    }, '')
    var deatharr = deathsTemp.split(',')
    deatharr.pop()

    const dateTemp = data.reduce((acc, item) => {
        acc = acc + item.dateRep + ","
      return acc;
    }, '')
    var datearr = dateTemp.split(',')
    datearr.pop()

    const casesTemp = data.reduce((acc, item) => {
      //let seccases = 0;
        acc = acc + item.cases + ","
      return acc;
      }, '')

      //console.log(casesTemp)
      var arr = casesTemp.split(',')
      arr.pop()
     // for(let i = 0; i< arr.length; i+= 2){
     // console.log(arr[i], deatharr[i], datearr [i], countryarr[i])
     // }
    return arr;
}

//temp
const dnaData = getDNA()




//table
  return (
    <div className="container" style = {{margin:"25px"}}>

<DatePicker 
        selected = {startDate}
        onChange = {date => setSelectedDate(date)}
        dateFormat = 'dd/MM/yyyy'
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        />


      
      <Table
      //data={data}
      dnaData={dnaData}
      data={currentBlockRows}
      selectedDate = {selectedDate}
      sortData = {sortData}
      directionSort = {directionSort}
      onSearchSend = {onSearchSend} />

      <Paginator pages = {pages}
      currentPage = {currentPage}
      onNextClick = {onNextClick}
      onPreviousClick = {onPreviousClick}
      buttonDisabled = {buttonDisabled} />

    </div>
  );
}

export default App;
