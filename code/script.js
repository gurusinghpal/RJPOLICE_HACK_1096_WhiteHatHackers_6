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
                    title: item.Location_name
                });

                marker.addListener('click', () => {
                    const targetZoom = 18;
                    const targetLocation = marker.getPosition();

                    map.panTo(targetLocation);
                    smoothZoom(map, targetZoom);

                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                            <div style="text-align: center; color: black;">
                                <h3>${item.Location_name}</h3>
                                <p>Camera Model: ${item.Camera_model}</p>
                                <p>Owner: ${item.Owner_name}</p>
                            </div>
                        `
                    });

                    infoWindow.open(map, marker);
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Assuming you have markersData and addMarker function defined
    markersData.forEach(markerData => {
        addMarker(map, markerData);
    });
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
    } else {
        document.getElementById('switchView').style.left = '10px';
        document.getElementById('city').style.left = '10px';
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
