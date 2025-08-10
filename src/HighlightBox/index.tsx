// @flow

import classnames from "classnames";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { Point, Region } from "../types/region-tools.ts";
import { MouseEvents } from "../ImageCanvas/use-mouse.ts";
import { tss } from "tss-react/mui";

const theme = createTheme();
const useStyles = tss.create(() => ({
  "@keyframes borderDance": {
    from: { strokeDashoffset: 0 },
    to: { strokeDashoffset: 100 },
  },
  highlightBox: {
    zIndex: 2,
    transition: "opacity 500ms",
    "&.highlighted": {
      zIndex: 3,
    },
    "&:not(.highlighted)": {
      opacity: 0,
    },
    "&:not(.highlighted):hover": {
      opacity: 0.6,
    },
    "& path": {
      vectorEffect: "non-scaling-stroke",
      strokeWidth: 2,
      stroke: "#FFF",
      fill: "none",
      strokeDasharray: 5,
      animationName: "$borderDance",
      animationDuration: "4s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationPlayState: "running",
    },
  },
}));

export const HighlightBox = ({
  mouseEvents,
  dragWithPrimary,
  zoomWithPrimary,
  createWithPrimary,
  onBeginMovePoint,
  onSelectRegion,
  region: r,
  pbox,
}: {
  mouseEvents: MouseEvents;
  dragWithPrimary?: boolean;
  zoomWithPrimary?: boolean;
  createWithPrimary?: boolean;
  onBeginMovePoint: (point: Point) => void;
  onSelectRegion: (r: Region) => void;
  region: Region;
  pbox: { x: number; y: number; w: number; h: number };
}) => {
  const { classes } = useStyles();
  if (!pbox.w || pbox.w === Infinity) return null;
  if (!pbox.h || pbox.h === Infinity) return null;
  if (r.type === "expanding-line" && r.unfinished) return null;

  const styleCoords =
    r.type === "point"
      ? {
          left: pbox.x + pbox.w / 2 - 30,
          top: pbox.y + pbox.h / 2 - 30,
          width: 60,
          height: 60,
        }
      : {
          left: pbox.x - 5,
          top: pbox.y - 5,
          width: pbox.w + 10,
          height: pbox.h + 10,
        };

  const pathD =
    r.type === "point"
      ? `M5,5 L${styleCoords.width - 5} 5L${styleCoords.width - 5} ${
          styleCoords.height - 5
        }L5 ${styleCoords.height - 5}Z`
      : `M5,5 L${pbox.w + 5},5 L${pbox.w + 5},${pbox.h + 5} L5,${pbox.h + 5} Z`;

  // Calculate rotation transform for rotated boxes
  const rotation = r.type === "box" && r.rotation ? r.rotation : 0;
  const rotationTransform = rotation !== 0 ? {
    transformOrigin: `${(pbox.w + 10) / 2}px ${(pbox.h + 10) / 2}px`,
    transform: `rotate(${rotation}deg)`,
  } : {};

  return (
    <ThemeProvider theme={theme}>
      <svg
        key={r.id}
        className={classnames(classes.highlightBox, {
          highlighted: r.highlighted,
        })}
        {...mouseEvents}
        {...(!zoomWithPrimary && !dragWithPrimary
          ? {
              onMouseDown: (e) => {
                if (
                  !r.locked &&
                  r.type === "point" &&
                  r.highlighted &&
                  e.button === 0
                ) {
                  return onBeginMovePoint(r);
                }
                if (e.button === 0 && !createWithPrimary)
                  return onSelectRegion(r);
                mouseEvents.onMouseDown(e);
              },
            }
          : {})}
        style={{
          ...(r.highlighted
            ? {
                pointerEvents: r.type !== "point" ? "none" : undefined,
                cursor: "grab",
              }
            : {
                cursor: !(
                  zoomWithPrimary ||
                  dragWithPrimary ||
                  createWithPrimary
                )
                  ? "pointer"
                  : undefined,
                pointerEvents:
                  zoomWithPrimary ||
                  dragWithPrimary ||
                  (createWithPrimary && !r.highlighted)
                    ? "none"
                    : undefined,
              }),
          position: "absolute",
          ...styleCoords,
          ...rotationTransform,
        }}
      >
        <path d={pathD} />
      </svg>
    </ThemeProvider>
  );
};

export default HighlightBox;
