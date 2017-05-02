export interface IPoint {
	lat: number;
	lng: number;
}

export interface IMarker extends IPoint {
	label?: string;
	title?:string;
    address?:string;
	tel?:string;
	ophour?:string;
	opday?:string;

}