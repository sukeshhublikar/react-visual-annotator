// @flow

import { memo } from "react";
import colorAlpha from "color-alpha";
import { clamp } from "../utils/clamp.ts";
import { KeypointsDefinition, Line, Region } from "../types/region-tools.ts";
import Immutable from "seamless-immutable";
import { ImagePosition } from "../types/common.ts";

type RegionComponentProps = {
  iw: number;
  ih: number;
  region: Region | Line;
  keypointDefinitions?: KeypointsDefinition;
};

const RegionComponents = {
  point: memo(({ region, iw, ih }: RegionComponentProps) => {
    if (region.type !== "point") return null;
    return (
      <g transform={`translate(${region.x * iw} ${region.y * ih})`}>
        <path
          d={"M0 8L8 0L0 -8L-8 0Z"}
          strokeWidth={2}
          stroke={region.color}
          fill="transparent"
        />
      </g>
    );
  }),
  line: memo(({ region, iw, ih }: RegionComponentProps) => {
    if (region.type !== "line") return null;
    return (
      <g transform={`translate(${region.x1 * iw} ${region.y1 * ih})`}>
        <line
          strokeWidth={2}
          x1={0}
          y1={0}
          x2={(region.x2 - region.x1) * iw}
          y2={(region.y2 - region.y1) * ih}
          stroke={colorAlpha(region.color, 0.75)}
          fill={colorAlpha(region.color, 0.25)}
        />
      </g>
    );
  }),
  box: memo(({ region, iw, ih }: RegionComponentProps) => {
    if (region.type !== "box") return null;
    const rotation = region.rotation || 0;
    
    // Calculate the center point for rotation
    const centerX = region.x * iw + (region.w * iw) / 2;
    const centerY = region.y * ih + (region.h * ih) / 2;
    
    // Apply rotation transform to the entire group, rotating around the center
    const transformString = `rotate(${rotation} ${centerX} ${centerY})`;
    
    return (
      <g transform={transformString}>
        <rect
          strokeWidth={2}
          x={region.x * iw}
          y={region.y * ih}
          width={Math.max(region.w * iw, 0)}
          height={Math.max(region.h * ih, 0)}
          stroke={colorAlpha(region.color, 0.75)}
          fill={colorAlpha(region.color, 0.25)}
        />
      </g>
    );
  }),
  polygon: memo(({ region, iw, ih }: RegionComponentProps) => {
    if (region.type !== "polygon") return null;
    const Component = region.open ? "polyline" : "polygon";
    return (
      <Component
        points={region.points
          .map(([x, y]) => [x * iw, y * ih])
          .map((a) => a.join(" "))
          .join(" ")}
        strokeWidth={2}
        stroke={colorAlpha(region.color, 0.75)}
        fill={colorAlpha(region.color, 0.25)}
      />
    );
  }),
  keypoints: ({
    region,
    iw,
    ih,
    keypointDefinitions,
  }: RegionComponentProps) => {
    if (region.type !== "keypoints") return null;
    const { points, keypointsDefinitionId } = region;
    if (!keypointDefinitions?.[keypointsDefinitionId]) {
      throw new Error(
        `No definition for keypoint configuration "${keypointsDefinitionId}"`
      );
    }
    const { landmarks, connections } =
      keypointDefinitions[keypointsDefinitionId];
    return (
      <g>
        {Object.entries(points).map(([keypointId, { x, y }], i) => (
          <g key={i} transform={`translate(${x * iw} ${y * ih})`}>
            <path
              d={"M0 8L8 0L0 -8L-8 0Z"}
              strokeWidth={2}
              // @ts-ignore
              stroke={landmarks[keypointId]?.color}
              fill="transparent"
            />
          </g>
        ))}
        {connections.map(([kp1Id, kp2Id]) => {
          const kp1 = points[kp1Id];
          const kp2 = points[kp2Id];
          const midPoint = { x: (kp1.x + kp2.x) / 2, y: (kp1.y + kp2.y) / 2 };
          return (
            <g key={`${kp1.x},${kp1.y}.${kp2.x},${kp2.y}`}>
              <line
                x1={kp1.x * iw}
                y1={kp1.y * ih}
                x2={midPoint.x * iw}
                y2={midPoint.y * ih}
                strokeWidth={2}
                // @ts-ignore
                stroke={landmarks[kp1Id].color}
              />
              <line
                x1={kp2.x * iw}
                y1={kp2.y * ih}
                x2={midPoint.x * iw}
                y2={midPoint.y * ih}
                strokeWidth={2}
                // @ts-ignore
                stroke={landmarks[kp2Id].color}
              />
            </g>
          );
        })}
      </g>
    );
  },
  "expanding-line": memo(({ region, iw, ih }: RegionComponentProps) => {
    if (region.type !== "expanding-line") return null;
    let { expandingWidth = 0.005, points } = region;
    expandingWidth = points.slice(-1)[0].width || expandingWidth;
    const pointPairs = points.map(({ x, y, angle, width }, i) => {
      if (!angle) {
        const n = points[clamp(i + 1, 0, points.length - 1)];
        const p = points[clamp(i - 1, 0, points.length - 1)];
        angle = Math.atan2(p.x - n.x, p.y - n.y) + Math.PI / 2;
      }
      const dx = (Math.sin(angle) * (width || expandingWidth)) / 2;
      const dy = (Math.cos(angle) * (width || expandingWidth)) / 2;
      return [
        { x: x + dx, y: y + dy },
        { x: x - dx, y: y - dy },
      ];
    });
    const firstSection = pointPairs.map(([p1]) => p1);
    const secondSection = Immutable.asMutable(pointPairs.map(([_, p2]) => p2));
    secondSection.reverse();
    const lastPoint = points.slice(-1)[0];
    return (
      <>
        <polygon
          points={firstSection
            .concat(region.candidatePoint ? [region.candidatePoint] : [])
            .concat(secondSection)
            .map((p) => `${p.x * iw} ${p.y * ih}`)
            .join(" ")}
          strokeWidth={2}
          stroke={colorAlpha(region.color, 0.75)}
          fill={colorAlpha(region.color, 0.25)}
        />
        {points.map(({ x, y, angle }, i) => (
          <g
            key={i}
            transform={`translate(${x * iw} ${y * ih}) rotate(${
              (-(angle || 0) * 180) / Math.PI
            })`}
          >
            <g>
              <rect
                x={-5}
                y={-5}
                width={10}
                height={10}
                strokeWidth={2}
                stroke={colorAlpha(region.color, 0.75)}
                fill={colorAlpha(region.color, 0.25)}
              />
            </g>
          </g>
        ))}
        <rect
          x={lastPoint.x * iw - 8}
          y={lastPoint.y * ih - 8}
          width={16}
          height={16}
          strokeWidth={4}
          stroke={colorAlpha(region.color, 0.5)}
          fill={"transparent"}
        />
      </>
    );
  }),
  pixel: () => null,
};

interface WrappedRegionListProps {
  regions: Region[];
  keypointDefinitions?: KeypointsDefinition;
  iw: number;
  ih: number;
}

export const WrappedRegionList = memo(
  ({ regions, keypointDefinitions, iw, ih }: WrappedRegionListProps) => {
    return regions
      .filter((r) => r.visible !== false)
      .map((r) => {
        const Component = RegionComponents[r.type];
        return (
          <Component
            key={r.id}
            region={r}
            iw={iw}
            ih={ih}
            keypointDefinitions={keypointDefinitions}
          />
        );
      });
  },
  (n, p) => n.regions === p.regions && n.iw === p.iw && n.ih === p.ih
);

interface RegionShapesProps {
  imagePosition: ImagePosition | null;
  regions: Region[];
  keypointDefinitions?: KeypointsDefinition;
}

export const RegionShapes = ({
  imagePosition,
  regions = [],
  keypointDefinitions,
}: RegionShapesProps) => {
  if (!imagePosition) return null;
  const iw = imagePosition.bottomRight.x - imagePosition.topLeft.x;
  const ih = imagePosition.bottomRight.y - imagePosition.topLeft.y;
  if (isNaN(iw) || isNaN(ih)) return null;
  return (
    <svg
      width={iw}
      height={ih}
      style={{
        position: "absolute",
        zIndex: 2,
        left: imagePosition.topLeft.x,
        top: imagePosition.topLeft.y,
        pointerEvents: "none",
        width: iw,
        height: ih,
      }}
    >
      <WrappedRegionList
        key="wrapped-region-list"
        regions={regions}
        iw={iw}
        ih={ih}
        keypointDefinitions={keypointDefinitions}
      />
    </svg>
  );
};

export default RegionShapes;
