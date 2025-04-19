const chestNutHillId: string = 'ChIJLwkLvP5444kRGTnWxi0zsnM';
declare global {
    interface Window {
        initMap: () => void;
        google: typeof google;
    }
}
class AutocompleteDirectionsHandler {
    map: google.maps.Map;
    originPlaceId: string;
    destinationPlaceId: string;
    travelMode: google.maps.TravelMode;
    directionsService: google.maps.DirectionsService;
    directionsRenderer: google.maps.DirectionsRenderer;

    constructor(map: google.maps.Map) {
        this.map = map;
        this.originPlaceId = '';
        this.destinationPlaceId = '';
        this.travelMode = google.maps.TravelMode.DRIVING;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(map);

        const originInput = document.getElementById('origin-input') as HTMLInputElement;
        // const destinationInput = document.getElementById('destination-selector') as HTMLInputElement;
        const modeSelector = document.getElementById('mode-selector') as HTMLSelectElement;

        const originAutocomplete = new google.maps.places.Autocomplete(originInput, {
            fields: ['place_id'],
        });

        // const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, {
        //     fields: ['place_id'],
        // });


        this.setupClickListener(
            "changemode-walking",
            google.maps.TravelMode.WALKING
        );
        this.setupClickListener(
            "changemode-transit",
            google.maps.TravelMode.TRANSIT
        );
        this.setupClickListener(
            "changemode-driving",
            google.maps.TravelMode.DRIVING
        )
        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        // this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');


        //This helps to put the search bar/drop down onto the map

        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
    }

    setupClickListener(id: string, mode: google.maps.TravelMode) {
        const radioButton = document.getElementById(id) as HTMLInputElement;
        radioButton.addEventListener('click', () => {
            this.travelMode = mode;
            this.route();
        });
    }

    setupPlaceChangedListener(
        autocomplete: google.maps.places.Autocomplete,
        mode: string
    ) {
        autocomplete.bindTo("bounds", this.map);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.place_id) {
                window.alert('Please select an option from the dropdown list.');
                return;
            }

            if (mode === 'ORIG') {
                this.originPlaceId = place.place_id;
            }
            // } else {
            //     this.destinationPlaceId = place.place_id;
            // }

            this.route();
        });
    }


    // This draws the line between origin and destination
    route() {


        if (!this.originPlaceId) return;

        this.directionsService.route(
            {
                origin: { placeId: this.originPlaceId },
                // destination: { placeId: this.destinationPlaceId },
                destination: { placeId: chestNutHillId },
                travelMode: this.travelMode,
            },
            (response, status) => {
                if (status === 'OK') {
                    this.directionsRenderer.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            }
        );
    }
}


export default AutocompleteDirectionsHandler;
