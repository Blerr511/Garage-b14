import About from "../Abaout/About";
import Portfolio from "../Portfolio/Portfolio";
import Graduates from "../Graduates/Graduates";
import Contact from "../Contact/Contact";
import Page from "../Courses";
import bg1 from "../../assets/img/ARCHVIZ-01.jpg";
import bg2 from "../../assets/img/ROBOT.jpg";
import bg3 from "../../assets/img/PLANE-01.jpg";
import bg4 from "../../assets/img/PS-01.jpg";
import icon1 from "../../assets/img/LOGOS-01.png";
import icon2 from "../../assets/img/LOGOS-02.png";
import icon3 from "../../assets/img/LOGOS-03.png";
import icon4 from "../../assets/img/LOGOS-04.png";
import icon5 from "../../assets/img/LOGOS-05.png";
export const graduatesInfo = [
  {
    h2: "ՃԱՐՏԱՐԱՊԵՏԱԿԱՆ ԵՎ ԴԻԶԱԸՆԵՐԱԿԱՆ ՎԻԶՈՒԱԼԻԶԱՑԻԱ",
    img: [{ src: icon1, alt: "3D MAX" }, { src: icon2, alt: "CORONA" }],
    text:
      "      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, neque ratione. Minus itaque debitis facere amet atque expedita quis numquam, quae dicta dignissimos odit eaque repellat voluptas reiciendis accusamus delectus!",
    bg: `url(${bg1})`,
    id: "3dmax_corona"
  },
  {
    h2: "ԶՐՈՅԻՑ ՊՐՈՖԵՍԻՈՆԱԼ 3D ԱՐՏԻՍՏ",
    img: [
      { src: icon1, alt: "3D MAX" },
      { src: icon3, alt: "SUBSTANCE PAINTER" }
    ],
    text:
      "      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, neque ratione. Minus itaque debitis facere amet atque expedita quis numquam, quae dicta dignissimos odit eaque repellat voluptas reiciendis accusamus delectus!",
    bg: `url(${bg2})`,
    id: "3dmax_substance"
  },
  {
    h2: "Adobe Illustrator ԳԱՆԻ ՀԱԿՈԲՅԱՆԻ ՀԵՏ",
    img: [{ src: icon4, alt: "Adobe illustrator" }],
    text:
      "      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, neque ratione. Minus itaque debitis facere amet atque expedita quis numquam, quae dicta dignissimos odit eaque repellat voluptas reiciendis accusamus delectus!",
    bg: `url(${bg3})`,
    id: "adobe_illustrator"
  },
  {
    h2: "Adobe Photoshop ՊՐՈՖԵՍԻՈՆԱԼ",
    img: [{ src: icon5, alt: "Adobe Photoshop" }],
    text:
      "      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, neque ratione. Minus itaque debitis facere amet atque expedita quis numquam, quae dicta dignissimos odit eaque repellat voluptas reiciendis accusamus delectus!",
    bg: `url(${bg4})`,
    id: "adobe_photoshop"
  }
];

export const routes = [
  {
    text: "Դասընթացներ",
    route: "/",
    component: Page,
    maneuItem: false
  },
  { text: "Մեր Մասին", route: "/about", component: About, maneuItem: true },
  {
    text: "Դասընթացներ",
    route: "/courses",
    component: Page,
    maneuItem: true
  },
  {
    text: "Պորտֆոլիո",
    route: "/portfolio",
    component: Portfolio,
    maneuItem: true
  },
  {
    text: "Ավարտածներ",
    route: "/graduate",
    component: Graduates,
    maneuItem: true
  },
  { text: "Կապ", route: "/contact", component: Contact, maneuItem: true }
];
