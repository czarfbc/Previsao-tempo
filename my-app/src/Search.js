import axios from "axios";

function Search(props){
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
                
            }   
            console.log(`${info.name}-${info.country}`)
            console.log(info.description)
        })
    }

    return(
        <div className="search">
            <h2>Digite a cidade que você quer saber a previsão</h2>
            <form onSubmit={(e)=>searchInput(e)}>
                <input placeholder={props.placeholder} onSubmit={searchInput} type="text" name="searchInput"/>
                <input type="submit" value="Pesquisar por cidade!" />
            </form>
        </div>
    )
}

export default Search;