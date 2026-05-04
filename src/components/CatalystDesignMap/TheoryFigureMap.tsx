import type { ComponentType } from "react";
import type { CatalystDirection } from "@/data/catalystDirections";
import type { FigureProps } from "./figures/FigurePrimitives";
import { BridgeDualAtomFigure } from "./figures/BridgeDualAtomFigure";
import { BuiltInElectricFieldFigure } from "./figures/BuiltInElectricFieldFigure";
import { ExternalFieldGridFigure } from "./figures/ExternalFieldGridFigure";
import { HighEntropyLocalSitesFigure } from "./figures/HighEntropyLocalSitesFigure";
import { MLDescriptorFlowFigure } from "./figures/MLDescriptorFlowFigure";
import { MultiCenterClusterFigure } from "./figures/MultiCenterClusterFigure";
import { MxeneMetalFigure } from "./figures/MxeneMetalFigure";
import { PassivationRegenerationFigure } from "./figures/PassivationRegenerationFigure";
import { PBandCatalystFigure } from "./figures/PBandCatalystFigure";
import { RareEarthSingleAtomFigure } from "./figures/RareEarthSingleAtomFigure";
import { RedoxMediatorCycleFigure } from "./figures/RedoxMediatorCycleFigure";
import { SulfideEdgeVacancyFigure } from "./figures/SulfideEdgeVacancyFigure";

export const theoryFigureMap: Record<CatalystDirection["figureType"], ComponentType<FigureProps>> = {
  "bridge-dual-atom": BridgeDualAtomFigure,
  "multi-center-cluster": MultiCenterClusterFigure,
  "rare-earth-single-atom": RareEarthSingleAtomFigure,
  "p-band-catalyst": PBandCatalystFigure,
  "built-in-electric-field": BuiltInElectricFieldFigure,
  "passivation-regeneration": PassivationRegenerationFigure,
  "sulfide-edge-vacancy": SulfideEdgeVacancyFigure,
  "mxene-metal": MxeneMetalFigure,
  "high-entropy-local-sites": HighEntropyLocalSitesFigure,
  "redox-mediator-cycle": RedoxMediatorCycleFigure,
  "external-field-grid": ExternalFieldGridFigure,
  "ml-descriptor-flow": MLDescriptorFlowFigure
};

