

export default class FloorMap {
    private readonly bounds: google.maps.LatLngBoundsLiteral;
    private readonly image: string;
    private overlay: google.maps.GroundOverlay;
    private readonly map: google.maps.Map;
    private shown: boolean;

    constructor(bounds: google.maps.LatLngBoundsLiteral, image: string, map: google.maps.Map) {
        this.bounds = bounds;
        this.image = image;
        this.overlay = new google.maps.GroundOverlay(
            image,
            bounds
        )
        this.map = map;
        this.overlay.setMap(this.map);
        this.shown = true;
    }

    toggle() {
        this.shown = !this.shown;
        this.overlay.setMap(this.shown ? this.map : null);
    }

    setVisible(visible: boolean) {
        this.overlay.setMap(visible ? this.map : null);
        this.shown = visible;
    }
}