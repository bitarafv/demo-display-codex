import { describe, expect, it } from "vitest";
import { industries } from "@/data/catalog";
import { getCompetitiveLandscape, getWorkloadStack, hardwareProfiles } from "@/data/technology";

describe("customer-facing configuration", () => {
  const demos = industries.flatMap((industry) => industry.demos);

  it("resolves a technology stack and competitive landscape for every demo", () => {
    for (const demo of demos) {
      expect(getWorkloadStack(demo.archetype).models.length).toBeGreaterThan(0);
      expect(getCompetitiveLandscape(demo.slug, demo.archetype).products.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps hardware and market content sourced and review-dated", () => {
    for (const profile of Object.values(hardwareProfiles)) {
      expect(profile.sourceUrl).toMatch(/^https:\/\//);
      expect(profile.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    for (const demo of demos) {
      const landscape = getCompetitiveLandscape(demo.slug, demo.archetype);
      expect(landscape.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      for (const product of landscape.products) expect(product.sourceUrl).toMatch(/^https:\/\//);
    }
  });

  it("retains a complete discussion guide for every demo", () => {
    for (const demo of demos) {
      expect(demo.personas.length).toBeGreaterThan(0);
      expect(demo.questions.length).toBeGreaterThan(0);
      expect(demo.painPoints.length).toBeGreaterThan(0);
      expect(demo.objections.length).toBeGreaterThan(0);
    }
  });
});
