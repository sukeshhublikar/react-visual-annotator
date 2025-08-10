// @flow

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCompress,
  faCrosshairs,
  faDrawPolygon,
  faEdit,
  faExpand,
  faGripLines,
  faHandPaper,
  faMask,
  faMousePointer,
  faSearch,
  faTag,
  faVectorSquare,
} from "@fortawesome/free-solid-svg-icons";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

const faStyle = { marginTop: 4, width: 16, height: 16, marginBottom: 4 };

export const iconDictionary: Record<
  string,
  OverridableComponent<SvgIconTypeMap>
> = {
  select: () => (
    <FontAwesomeIcon
      style={faStyle}
      size="xs"
      fixedWidth
      icon={faMousePointer}
      className="fa-icon"
    />
  ),
  pan: () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faHandPaper} className="fa-icon" />
  ),
  zoom: () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faSearch} className="fa-icon" />
  ),
  "show-tags": () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faTag} className="fa-icon" />
  ),
  "create-point": () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faCrosshairs} className="fa-icon" />
  ),
  "create-box": () => (
    <FontAwesomeIcon
      style={faStyle}
      size="xs"
      fixedWidth
      icon={faVectorSquare}
      className="fa-icon"
    />
  ),
  "create-polygon": () => (
    <FontAwesomeIcon
      style={faStyle}
      size="xs"
      fixedWidth
      icon={faDrawPolygon}
      className="fa-icon"
    />
  ),
  "create-expanding-line": () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faGripLines} className="fa-icon" />
  ),
  "create-line": () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faChartLine} className="fa-icon" />
  ),
  "show-mask": () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faMask} className="fa-icon" />
  ),
  "modify-allowed-area": () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faEdit} className="fa-icon" />
  ),
  "create-keypoints": () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faExpand} className="fa-icon" />
  ),
  fullscreen: () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faExpand} className="fa-icon" />
  ),
  window: () => (
    <FontAwesomeIcon style={faStyle} size="xs" fixedWidth icon={faCompress} className="fa-icon" />
  ),
};

export default iconDictionary;
