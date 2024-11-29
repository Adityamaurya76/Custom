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
          filterCountries.map((item, index) => {
            return <CountryCard country={item} key={index} />
          })
        }

      </ul>

    </section>
  )
}

export default Country