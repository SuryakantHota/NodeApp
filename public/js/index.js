console.log("js file is loaded");

const getWeatherData = ( location ) => {
    return new Promise(( resolve, reject ) => {
        fetch("http://localhost:4000/weather?address=" + location).then(( resp ) => {
            return resp.json();
        }).then(( data ) => {
            if ( data.error ) {
                reject(data);
            } else {
                resolve(data);
            }
        }).catch(( err ) => {
            reject(err);
        });
    });
}

const formEle = document.querySelector("form");
const locationIp = document.querySelector("input");
const m1 = document.querySelector("#message_one");
const m2 = document.querySelector("#message_two");

formEle.addEventListener("submit", ( event ) => {
    event.preventDefault();
    m1.textContent = "Loading ...";
    m2.textContent = "";
    const location = locationIp.value;
    console.log("location", location);
    getWeatherData(location).then(( data ) => {
        console.log("data", data);
        m1.textContent = "Currently it is " + data.description + " and " + data.temperature + " degree C now at " + data.location;
    }).catch(( err ) => {
        console.log("err", err);
        m1.textContent = "";
        m2.textContent = err.error;
    })
})