import * as THREE from "three";
import { MeshPhysicalMaterialParameters } from "three";

declare module "three" {
  class MorpheusMeshMaterial extends THREE.MeshPhysicalMaterial {
    constructor(parameters: MeshPhysicalMaterialParameters);
  }
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    morpheusMeshMaterial: ReactThreeFiber.MaterialNode<
      THREE.MorpheusMeshMaterial,
      typeof THREE.MorpheusMeshMaterial
    >;
  }
}
