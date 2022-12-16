import {useState} from 'react';
import axios from "axios";

function Search(props){
    const [city, setCity] = useState("");

    function searchInput(e){
        e.preventDefault();

        let currentValue = document.querySelector('input[name=searchInput]').value;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;

        axios.get(url).then((res)=>{

            const info = {
                name: 
                    res.data.name,
                country: 
                    res.data.sys.country,
                description: 
                    res.data.weather[0].description,
                temp:
                    res.data.main.temp,
                sys: 
                    res.data.sys,
                weather:
                    res.data.weather,   
            }   



            if(info.sys !== undefined){
                if(info.weather !== undefined){

                    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${info.weather[0]["icon"]}.svg`;

                    setCity(`
                    <div>
                        <p>Temperature: ${info.temp}°C</p>
                        <p>Country: ${info.country}</p>
                        <p>City: ${info.name}</p>
                        <p>Description: ${info.weather[0]['description']}</p>
                        <img src="${icon}" />
    
                    </div>
    
                    `);
                }
            }else{setCity("")}
        })
    }

    return(
        <div className='searchWraper'>
            <div className="search">
                <h2>Enter the city you want to know the forecast.</h2>
                <form onSubmit={(e)=>searchInput(e)}>
                    <input placeholder={props.placeholder} onSubmit={searchInput} type="text" name="searchInput"/>
                    <input type="submit" value="Search by city!" />
                </form>
            </div>

            {
                (city !== "")?
                <div dangerouslySetInnerHTML={{__html: city}}/>:
                <div><p>Search for something above...</p></div>
            }
        </div>
    )
}

export default Search;