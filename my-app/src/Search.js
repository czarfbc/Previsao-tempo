import {useState} from 'react';
import axios from "axios";

function Search(props){
    const [city, setCity] = useState("");

    function searchInput(e){
        e.preventDefault();

        let currentValue = document.querySelector('input[name=searchInput]').value;
        const apiKey = 'b6a11e1b139fd2fc5b590160fad6f758';

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=${apiKey}&units=metric&lang=pt_br`;

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
                humidity:
                    res.data.main.humidity,
                wind:
                    res.data.wind.speed,
                sys: 
                    res.data.sys,
                weather:
                    res.data.weather,   
            }   



            if(info.sys !== undefined && info.weather !== undefined){
                const icon = `https://openweathermap.org/img/wn/${info.weather[0]["icon"]}@2x.png`;

                setCity(`
                <div>
                    <p>Temperatura: ${info.temp}°C</p>
                    <p>País: ${info.country}</p>
                    <p>Cidade: ${info.name}</p>
                    <p>Humidade: ${info.humidity}%</p>
                    <p>Vento: ${info.wind}km/h</p>
                    <p>Descrição: ${info.description}</p>
                    <img src="${icon}" />

                </div>
                `);
                
            }else{setCity("")}
        })
    }

    return(
        <div className='searchWraper'>
            <div className="search">
                <h2>{props.title}</h2>
                <form onSubmit={(e)=>searchInput(e)}>
                    <input placeholder={props.placeholder} onSubmit={searchInput} type="text" name="searchInput"/>
                    <input type="submit" value={props.searchBtn} />
                </form>
            </div>

            {
                (city !== "")?
                <div dangerouslySetInnerHTML={{__html: city}}/>:
                <div><p>Procure por algo acima...</p></div>
            }
        </div>
    )
}

export default Search;