import React from 'react'
import Header from '../../components/header/Header'
import JobList from '../../components/joblist/JobList'
import SearchBar from '../../components/others/SearchBar'

const HomePage = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <JobList />
    </div>
  )
}

export default HomePage