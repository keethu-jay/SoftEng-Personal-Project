import type { Coordinates } from 'common/src/constants';

//  Calculates Euclidean distance between two coordinates.

export function euclideanDistance(a: Coordinates, b: Coordinates): number {
    const dx = b.lat - a.lat;
    const dy = b.lng - a.lng;
    return Math.sqrt(dx * dx + dy * dy);
}
