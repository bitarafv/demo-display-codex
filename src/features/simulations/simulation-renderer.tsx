import { MockApp } from "@/components/mock-app";
import type { Demo } from "@/lib/types";
import { getSimulationModule } from "./registry";

export function SimulationRenderer({ demo }: { demo: Demo }) {
  const simulation = getSimulationModule(demo.slug);
  if (!simulation) return <MockApp demo={demo}/>;
  const Component = simulation.Component;
  return <Component demo={demo}/>;
}
