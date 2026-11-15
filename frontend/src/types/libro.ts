import img1984 from "../assets/1984.jpg";
import imgCien from "../assets/cien años de soledad.jpg";
import imgQuijote from "../assets/don quijote de la mancha.jpg";
import imgAlquimista from "../assets/el alquimista.jfif";
import imgRosa from "../assets/el nombre de la rosa.jpg";
import imgPrincipito from "../assets/el principito.jpeg";
import { type Libro } from "../components/LibroCard"


export const librosDestacados: Libro[] = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", img: imgCien, descripcion: "Una obra maestra de la literatura latinoamericana.", precio: 15000 },
  { id: 2, titulo: "El nombre de la rosa", autor: "Umberto Eco", img: imgRosa, descripcion: "Un thriller histórico y filosófico.", precio: 18000 },
  { id: 3, titulo: "1984", autor: "George Orwell", img: img1984, descripcion: "Una novela distópica sobre el totalitarismo.", precio: 14000 },
  { id: 4, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", img: imgPrincipito, descripcion: "Una historia clásica sobre la amistad y la vida.", precio: 12000 },
  { id: 5, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", img: imgQuijote, descripcion: "La obra maestra de la literatura española.", precio: 16000 },
  { id: 6, titulo: "El alquimista", autor: "Paulo Coelho", img: imgAlquimista, descripcion: "Una novela sobre el viaje en busca del tesoro.", precio: 13000 },
];