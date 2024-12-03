import React, { useEffect, useTransition, useState } from 'react';
import { getCountry } from '../api/AxiosClient'
import Loader from '../Component/Loader/Loder';
import { CountryCard } from '../Component/CountryCard/CountryCard';
import { Searchfilter } from '../Component/Search Filter/Searchfilter';


function Country() {

  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState("All");
  const[CurrentPage, SetCurrentPage]= useState(1);
  

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountry();
      setCountries(res.data);
    });

  }, []);

  if (isPending) return <Loader />
  console.log(search, filter);

  const searchCountry = (country) => {
    if (search) {

      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return country;
  };


  const filterRegion = (country) => {
    if (filter === "All") return country;
    return country.region === filter;
  }


  const filterCountries = countries.filter((country) => searchCountry(country) && filterRegion(country));
  const countriesPerPage = 8;
  const indexofLastCountry=CurrentPage * countriesPerPage;
  const indexofFirstCountry= indexofLastCountry - countriesPerPage;
  const currentCountries= filterCountries.slice(indexofFirstCountry , indexofLastCountry)

  const totalpages=Math.ceil(
    filterCountries.length/countriesPerPage
  );

  const handleNextPage=() =>{
    if(CurrentPage<totalpages){
      SetCurrentPage((prev)=>prev+1);
    }
  }
const handlePrevioustPage =() =>{
  if(CurrentPage > 1){
    SetCurrentPage((prev) => prev-1);
  }
}

  return (
    <section className='country-section'>
      <Searchfilter search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries} />
      <ul className='grid grid-four-cols'>
        {
          currentCountries.map((item, index) => {
            return <CountryCard country={item} key={index} />
          })
        }

      </ul>
      {filterCountries.length > countriesPerPage && (
        <div className='pagination'>
      <button 
      onClick={handlePrevioustPage}
      disabled={CurrentPage === 1}
      className='pagination-btn'>
      Prev
      </button>
      <span className="page-info">
       pages {CurrentPage} of {totalpages}
      </span>
      <button 
      onClick={handleNextPage}
      disabled={CurrentPage === totalpages}
      className='pagination-btn'>
          Next
      </button>
      </div>
      )};
    </section>
  )
}

export default Country