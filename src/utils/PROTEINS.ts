import Adenovirus_160_outer from "../components/GLTFs/viruses/Adenovirus_160_outer";
import Rice_dwarf_100 from "../components/GLTFs/viruses/Rice_dwarf_100";
import Faust_1200_1 from "../components/GLTFs/viruses/Faust_1200_1";

type Protein = {
  /** Particle component to render */
  particle: (props: any) => JSX.Element;
  /** display name */
  name: string;
  /** url to Protein Data Bank entry */
  PDBurl?: string;
  /** weight in kDA. heavier = spins less & interacts more heavily with other objects */
  mass: number;
  /** how many atoms? used to estimate particle radius */
  atomCount: number /* TECHDEBT: can find actual particleRadius instead? */;
  /** how big is the rendered particle compared to the actual model size */
  scale?: number;
  /** path to the model's .gltf file (unused?) */
  pathToGLTF: string;
  /** does the particle bump into others? (may cost more CPU) */
  interactive: boolean;
};

export const PROTEINS: Protein[] = [
  {
    particle: Adenovirus_160_outer,
    name: "Adenovirus",
    PDBurl: "https://www.rcsb.org/structure/6CGV",
    mass: 1532.27,
    atomCount: 99723,
    pathToGLTF: "/models/viruses/adenovirus_160_outer.glb",
    interactive: true,
  },
  {
    particle: Faust_1200_1,
    name: "Faustovirus",
    PDBurl: "https://www.rcsb.org/structure/5J7V",
    mass: 215.35,
    atomCount: 14478,
    pathToGLTF: "/models/viruses/faust_1200_1.glb",
    interactive: true,
  },
  {
    particle: Rice_dwarf_100,
    name: "Rice dwarf virus",
    PDBurl: "https://www.rcsb.org/structure/1UF2",
    mass: 889.08,
    atomCount: 58130,
    pathToGLTF: "/models/viruses/faust_1200_1.glb",
    interactive: true,
  },
];