export type Coordenadas3D = [number, number, number];

export interface Enfoque3D {
  cameraPosition: Coordenadas3D;
  target: Coordenadas3D;
}

export interface VistaAnatomica extends Enfoque3D {
  label: string;
  icon: string;
}
