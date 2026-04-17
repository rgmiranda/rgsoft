import { Vector2 } from '@rgsoft/linear';
import { Polygon } from '@rgsoft/geometry';
import { triangulate } from './delaunay';
import { TessellationConfig } from './interfaces';

export const tessellate = (
  sites: Vector2[],
  config: TessellationConfig,
): Polygon[] => {
  const polygons: Polygon[] = [];

  const triangulation = triangulate(sites, { ...config, excludeRectVertex: false });
  if (!config.excludeRectVertex && config.rectBox) {
    sites = sites.concat(config.rectBox.vertex);
  }

  for (const site of sites) {
    const incidentTriangles = triangulation.filter((t) => t.hasVertex(site));

    if (incidentTriangles.length < 2) {
      continue;
    }

    const centers = incidentTriangles.map((t) => t.center);
    if (centers.length < 3) {
      continue;
    }

    centers.sort((p1, p2) => {
      const a1 = Math.atan2(p1.y - site.y, p1.x - site.x);
      const a2 = Math.atan2(p2.y - site.y, p2.x - site.x);
      return a1 - a2;
    });

    polygons.push(new Polygon(centers));
  }

  return polygons;
};
