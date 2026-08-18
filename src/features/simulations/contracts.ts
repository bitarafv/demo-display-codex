import type { ComponentType } from "react";
import type { CompetitiveLandscape, Demo, DiscussionGuide, WorkloadStack } from "@/lib/types";

export type SimulationState = "initial" | "processing" | "success" | "empty" | "error";

export interface SimulationProps {
  demo: Demo;
}

export interface SimulationValidation {
  supportsReset: true;
  states: SimulationState[];
  reviewedAt: string;
}

export interface SimulationContent {
  discussion: DiscussionGuide;
  competitive: CompetitiveLandscape;
  workload: WorkloadStack;
}

export interface SimulationModule {
  slug: string;
  name: string;
  industrySlug: string;
  version: 1;
  Component: ComponentType<SimulationProps>;
  content: SimulationContent;
  validation: SimulationValidation;
}

export const requiredSimulationStates: SimulationState[] = ["initial", "processing", "success", "empty", "error"];
