const filterCitiesByCountry = (countryName, globalProps) => {
    const countries = globalProps?.countries || [];
    const country = countries.find(c => c.name === countryName);
    return country ? country.cities : [];
}

const mapCountries = (globalProps) => {
    return globalProps?.countries?.map(c => c.name) || [];
}

const mapCountryCodeAndFlags = (globalProps) => {
    return globalProps?.countries?.map(c => ({code: c.code, flag: c.flag})) || [];
}

export default { filterCitiesByCountry, mapCountries, mapCountryCodeAndFlags };