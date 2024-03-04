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

function startLiveCam() {
    // Redirect to the Python file that opens a webcam in real time
    window.location.href = `http://127.0.0.1:5000/start_weapon_detection`;
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
        const cityModalContent = `
            <div class="modal fade" id="cityModal" tabindex="-1" role="dialog" aria-labelledby="cityModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content custom-modal">
                        <div class="modal-header" style="background-color: rgba(255, 255, 255, 0.8); border: none;">
                            <h5 class="modal-title" id="cityModalLabel" style="color: black">Enter City Name</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="cityForm">
                                <div class="form-group">
                                    <label for="cityInput">City Name:</label>
                                    <input type="text" class="form-control" id="cityInput" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        document.body.insertAdjacentHTML('beforeend', cityModalContent);
    
        $('#cityModal').modal('show');
    
        const cityForm = document.getElementById('cityForm');
        const cityInput = document.getElementById('cityInput');
    
        cityForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const city = cityInput.value;
    
            if (city) {
                const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
    
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        $('#cityModal').modal('hide');
    
                        if (data.length > 0) {
                            const cityLocation = {
                                lat: parseFloat(data[0].lat),
                                lng: parseFloat(data[0].lon)
                            };
    
                            // Delay before setting center and zoom
                            setTimeout(() => {
                                map.setCenter(cityLocation);
                                smoothZoom(map, 14);
                            }, 500); // Adjust the delay as needed
                        } else {
                            alert('City not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        $('#cityModal').modal('hide');
                    });
            }
        });
    
        $('#cityModal').on('hidden.bs.modal', function () {
            // Remove the modal from the DOM when it's closed
            document.body.removeChild(document.getElementById('cityModal'));
        });
    });
    
    // Rest of your code...
    

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
                
                        if (infoWindow) {
                            infoWindow.close();
                        }
                
                        const infoWindowContent = `
                            <div style="text-align: left; color: black">
                                <h3>${currentItem.Location_name}</h3>
                                <p>Camera Model: ${currentItem.Camera_model}</p>
                                <p>Owner: ${currentItem.Owner_name}</p>
                                <p>Camera IPaddress: ${currentItem.Camera_IPaddress}</p>
                                <p>Latitude: ${currentItem.Latitude} Longitude: ${currentItem.Longitude}</p>
                                <p>Camera Resolution: ${currentItem.Resolutions}</p>
                                <p>Visibility Range of Camera: ${currentItem.Visibility_range}</p>
                                <button id="callNow" 
                                    onclick="displayContactNumber('${currentItem.Location_name}','${currentItem.Owner_name}')"
                                    style="text-align: center; margin-top: 10px; margin-left: 20px; background-color: #00b3ff; color: #ffffff; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">
                                    Call Now
                                </button>
                                <button id="accessVideos" onclick="startVerification()" style="text-align: center; margin-top: 10px; margin-left: 21px; background-color: #ff0000; color: #ffffff; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">
                                    Access Videos
                                </button>
                                <button id="liveCam" onclick="startLiveCam()" style="text-align: center; margin-top: 10px; margin-left: 21px; background-color: #4caf50; color: #ffffff; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">
                                    Live Cam
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

        const infoWindow = new google.maps.InfoWindow({
            content: markerData.infoContent || ''
        });

        infoWindow.open(map, marker);
    });
}

function toggleStatusPanel() {
    var statusPanel = document.getElementById("statusPanel");

    // Toggle the "open" class on the status panel
    statusPanel.classList.toggle("open");
}

// Function to close the status panel
function closeStatusPanel() {
    var statusPanel = document.getElementById("statusPanel");

    // Remove the "open" class to close the status panel
    statusPanel.classList.remove("open");
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

document.getElementById('RecordedVideos').addEventListener('click', function() {
    // Navigate to the "index.html" file
    window.location.href = 'object.html';
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

