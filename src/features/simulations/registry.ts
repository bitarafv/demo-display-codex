import type { SimulationModule } from "./contracts";
import { requiredSimulationStates } from "./contracts";

// Integration-owned registry. Builders export modules from their owned directory;
// the integrator adds static imports here after review so Next.js can prerender them.
export const simulationModules: SimulationModule[] = [];

export function getSimulationModule(slug: string) {
  return simulationModules.find((module) => module.slug === slug);
}

export function validateSimulationModules(modules: SimulationModule[] = simulationModules) {
  const slugs = modules.map((module) => module.slug);
  return {
    uniqueSlugs: new Set(slugs).size === slugs.length,
    complete: modules.every((module) => module.validation.supportsReset && requiredSimulationStates.every((state) => module.validation.states.includes(state)) && /^\d{4}-\d{2}-\d{2}$/.test(module.validation.reviewedAt) && Boolean(module.content.competitive) && Boolean(module.content.discussion) && Boolean(module.content.workload)),
  };
}
