import express from "express";
import axios from "axios";
import bodyparser from "body-parser";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.post("/submit-location", async(req,res) => {
    const city = req.body.city;
    const API_key = "a12d28f418588d925c96ed3758a687b6"
    const date = new Date();

    let day = date.getDate();
    let dayTmrw = date.getDate()+1;
    let dayName = getDayOfTheWeek(date.getDay());
    let dayNameTmrw = getDayOfTheWeek(date.getDay()+1);

    function getDayOfTheWeek(dayNumber){
        
        switch (dayNumber) {
            case 0:
                return "Sun";
                break;
            case 1:
                return "Mon";
                break;
            case 2:
                return "Tue";
                break;
            case 3:
                return "Wed";
            case 4:
                return "Thu";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
            default:
                break;
        }
    }
    

    try {
        const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},JPN&appid=${API_key}`);
        const latitude = result.data[0].lat;
        const longitude = result.data[0].lon;
        try {
            const weather = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&lang=en&appid=${API_key}`);
            const temperatureToday = Math.floor(weather.data.current.temp - 273);
            const temperatureTomorrow = Math.floor(weather.data.daily[1].temp.day - 273);
            const weatherToday = weather.data.current.weather[0].description;
            const weatherTomorrow = weather.data.daily[1].weather[0].description;
            
            res.render("index.ejs", {
                tempTd: temperatureToday,
                tempTmrw: temperatureTomorrow,
                weatherToday: weatherToday,
                weatherTomorrow: weatherTomorrow,
                city: city,
                dayName: dayName,
                day: day,
                dayTmrw: dayTmrw,
                dayNameTmrw: dayNameTmrw
            });
        } catch(error) {
            res.status(500)
        }
    } catch(error) {
        res.status(500)
    }
})
app.listen(port, ()=>{
    console.log("Server running on port "+port);
});
