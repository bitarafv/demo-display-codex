import { describe, expect, it } from "vitest";
import type { SimulationModule } from "./contracts";
import { requiredSimulationStates } from "./contracts";
import { validateSimulationModules } from "./registry";

describe("simulation registry contract", () => {
  it("accepts the empty migration registry while fallback modules remain active", () => {
    expect(validateSimulationModules()).toEqual({ uniqueSlugs: true, complete: true });
  });

  it("detects duplicate module slugs", () => {
    const minimal = { slug: "duplicate", validation: { supportsReset: true, states: requiredSimulationStates, reviewedAt: "2026-08-18" }, content: { competitive: {}, discussion: {}, workload: {} } } as unknown as SimulationModule;
    expect(validateSimulationModules([minimal, minimal]).uniqueSlugs).toBe(false);
  });
});
