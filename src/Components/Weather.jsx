import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import clouds from "../images/clouds.png"
import clear from "../images/clear-day.svg"
import cloudy from "../images/cloudy.svg"
import drizzle from "../images/drizzle.svg"
import dust from "../images/dust.svg"
import fog from "../images/fog.svg"
import haze from "../images/haze.svg"
import mist from "../images/mist.svg"
import rainy from "../images/rainy-1.svg"
import smoke from "../images/smoke.svg"
import snow from "../images/snow.svg"
import thunderstorm from "../images/thunderstorms.svg"
import tornado from "../images/tornado.svg"
import wind from "../images/wind-speed.png"
import humidity from "../images/humidity.png"
import { CiSearch } from "react-icons/ci";
import "./Weather.css"

function Weather() {

    const [weatherData, setWeatherData] = useState("")
    const [changeLocation, setChangeLocation] = useState("")


    const API_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            async function callFunction() {
                try {

                    let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}`)
                    setWeatherData(res.data)
                    console.log(res.data)
                } catch (err) {
                    console.log(err)
                }
            }
            callFunction()
        })
    }, [])

    let weatherImages = {
        Clouds: clouds,
        Clear: clear,
        Drizzle: drizzle,
        Dust: dust,
        Cloudy: cloudy,
        Fog: fog,
        Haze: haze,
        Mist: mist,
        Rain: rainy,
        Smoke: smoke,
        Snow: snow,
        Thunderstorm: thunderstorm,
        Tornado: tornado,
        Wind: wind,
        humidity: humidity,

    }


    let weatherImage = weatherData ? weatherImages[weatherData.weather[0].main] : null;


    const dates = new Date().toLocaleDateString("de-DE")


    const changing = () => {


        async function callFunction() {

            try {
                let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${changeLocation}&appid=${API_KEY}`)
                setWeatherData(res.data)
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        callFunction()
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            changing()
        }
    }

    return (
        <Card className='cards'>
            <div className='one'>
                <input placeholder='Search' className='searchBar' type="text" value={changeLocation} onChange={(e) => setChangeLocation(e.target.value)} onKeyDown={handleKeyDown} />
                <CiSearch onClick={changing} className='icons' />
            </div>
            {weatherData ? (
                <Card.Body>
                    <Card.Img variant="top" src={weatherImage} className='searchImage' />

                    <h1 className='all temp'>{Math.round(weatherData.main.temp - 273.15) + "°C"}</h1>
                    <h1 className='all name'>
                        {weatherData.name}
                    </h1>
                    <h2 className='all country'>{weatherData.sys.country}</h2>
                    <h3 className='all date'>{dates}</h3>
                    <div className='speed'>
                        <h4 className='all humidity'><img src={humidity} className='speedImg' />{weatherData.main.humidity}</h4>
                        <h4 className='all wind'><img src={wind} className='speedImg' />{Math.round(weatherData.wind.speed).toFixed(2)}</h4>
                    </div>
                </Card.Body>
            ) : (
                <></>
            )}
        </Card>

    );
}

export default Weather;











