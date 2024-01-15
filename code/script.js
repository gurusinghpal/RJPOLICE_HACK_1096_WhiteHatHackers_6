let map;
let infoWindow; // Declare infoWindow globally

function smoothZoom(map, targetZoom) {
    const currentZoom = map.getZoom();
    const zoomStep = (targetZoom - currentZoom) / 18;

    const smoothZoomInterval = setInterval(() => {
        if (map.getZoom() < targetZoom) {
            map.setZoom(map.getZoom() + zoomStep);
        } else {
            clearInterval(smoothZoomInterval);
        }
    }, 200);

    setTimeout(() => {
        clearInterval(smoothZoomInterval);
    }, 200 * 15);
}
function startVerification() {
    // Open the sendOTP page with the location name and contact number
    console.log("Button clicked!");
    window.location.href = `http://localhost:3300`;
}
function displayContactNumber(Locationname, ownerName) {
    // URL for fetching data based on Location_name
    const apiUrl = `http://localhost:3000/data?Location_name=${Locationname}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                let contactNumberFound = false;

                // Iterate through all items in the data array
                data.forEach(cameraInfo => {
                    // Check if Contact_No exists in cameraInfo
                    if (cameraInfo && cameraInfo.Contact_No) {
                        // If the current item matches the location, display the contact number
                        if (cameraInfo.Location_name === Locationname) {
                            alert(`Contact Number for ${ownerName}: ${cameraInfo.Contact_No}`);
                            contactNumberFound = true;
                            window.open(`tel:${cameraInfo.Contact_No}`)

                        }
                    }
                });

                // If no contact number is found for the location, display an alert
                if (!contactNumberFound) {
                    alert(`Contact Number not found for ${ownerName}`);
                }
            } else {
                // If no data is returned, display an alert
                alert(`No data found for ${Locationname}`);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // If an error occurs during fetching, display an alert with the error message
            alert(`Error fetching data: ${error.message}`);
        });
}



// Call yourFunction somewhere in your code



function initMap() {
    const center = { lat: 20.5937, lng: 78.9629 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: center,
        mapTypeId: 'satellite'
    });

    document.getElementById('city').addEventListener('click', function () {
        let city = prompt('Please enter a city name:');
        if (city) {
            const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const cityLocation = {
                            lat: parseFloat(data[0].lat),
                            lng: parseFloat(data[0].lon)
                        };

                        map.setCenter(cityLocation);
                        smoothZoom(map, 14);
                    } else {
                        alert('City not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    });


    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const marker = new google.maps.Marker({
                    position: { lat: item.Latitude, lng: item.Longitude },
                    map: map,
                    title: item.Location_name,
                    icon: {
                        url: '/cctv.png', // Replace with the actual path
                        scaledSize: new google.maps.Size(30, 30) // Set the desired width and height
                    }, // Replace with the actual path
                    ownerInfo: item  // Associate owner information with each marker
                });

            marker.addListener('click', (function (currentItem, currentMarker) {
                return function () {
                    const targetZoom = 18;
                    const targetLocation = currentMarker.getPosition();

                    map.panTo(targetLocation);
                    smoothZoom(map, targetZoom);

                    if (infoWindow) {
                        infoWindow.close();
                    }

                    const infoWindowContent = `
                        <div style="text-align: center; color: black;">
                            <h3>${currentItem.Location_name}</h3>
                            <p>Camera Model: ${currentItem.Camera_model}</p>
                            <p>Owner: ${currentItem.Owner_name}</p>
                            <button id="callNow" 
                                onclick="displayContactNumber('${currentItem.Location_name}','${currentItem.Owner_name}')"
                                style="text-align: center; margin-top: 10px; margin-left: 20px; background-color: #00b3ff; color: #ffffff; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">
                                Call Now
                            </button>
                            <button id="accessVideos" onclick="startVerification()" style="text-align: center; margin-top: 10px; margin-left: 21px; background-color: #ff0000; color: #ffffff; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">
                                Access Videos
                            </button>
                        </div>
                    `;

                    infoWindow = new google.maps.InfoWindow({
                        content: infoWindowContent
                    });

                    infoWindow.open(map, currentMarker);
                };
            })(item, marker));
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}


function addMarker(map, markerData) {
    const marker = new google.maps.Marker({
        position: markerData.position,
        map: map,
        title: markerData.title,
        icon: markerData.iconUrl || null
    });

    marker.addListener('click', () => {
        const targetZoom = 20;
        const targetLocation = marker.getPosition();

        map.panTo(targetLocation);
        map.setZoom(targetZoom);

        const infoWindow = new google.maps.InfoWindow({
            content: markerData.infoContent || ''
        });

        infoWindow.open(map, marker);
    });
}

document.getElementById('switchView').addEventListener('click', function () {
    const currentMapType = map.getMapTypeId();

    if (currentMapType === 'satellite') {
        map.setMapTypeId('terrain');
        this.classList.remove('satellite');
        this.classList.add('terrain');
    } else {
        map.setMapTypeId('satellite');
        this.classList.remove('terrain');
        this.classList.add('satellite');
    }
});

function handleFullscreenChange() {
    const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement ||
        document.webkitFullscreenElement || document.msFullscreenElement;

    if (fullscreenElement) {
        document.getElementById('switchView').style.left = '20px';
        document.getElementById('city').style.left = '120px';
        document.getElementById('accessVideos').style.left = '220px';
    } else {
        document.getElementById('switchView').style.left = '10px';
        document.getElementById('city').style.left = '10px';
        document.getElementById('accessVideos').style.left = '10px';
    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

setTimeout(function () {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('map').style.display = 'block';
    initMap();
}, 3000);
