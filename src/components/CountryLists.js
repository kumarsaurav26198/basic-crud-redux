import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

function CountryLists(props) {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const selectCountry = () => {
    setCountry();
    console.log(country);
  };
  return (
    <>
      <div>
        <CountryDropdown value={country} onChange={selectCountry} />
      </div>
      <div>
        <RegionDropdown
          country={country}
          value={region}
          onChange={() => {
            setRegion();
          }}
        />
      </div>
    </>
  );
}

export default CountryLists;
