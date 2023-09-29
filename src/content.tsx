import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import "./style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.iitbombayx.in/login"]
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector(`h2`)

const PlasmoPricingExtra = () => (
  <span style={{
    background: "gray"
  }}>
    tonyantony300@gmail.com
  </span>
)

export default PlasmoPricingExtra
