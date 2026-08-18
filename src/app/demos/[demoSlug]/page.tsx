import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Target } from "lucide-react";
import { getDemo, industries } from "@/data/catalog";
import { SimulationRenderer } from "@/features/simulations/simulation-renderer";
import { TechnologyStackCard } from "@/components/technology-stack-card";
import { CompetitiveSoftware } from "@/components/competitive-software";

export function generateStaticParams() { return industries.flatMap((item) => item.demos).map((item) => ({ demoSlug: item.slug })); }
export default async function DemoPage({ params }: { params: Promise<{ demoSlug: string }> }) {
  const { demoSlug } = await params; const demo = getDemo(demoSlug); if (!demo) notFound();
  const industry = industries.find((item) => item.name === demo.industry)!;
  return <div className="shell pt-10"><Link href={`/industries/${industry.slug}`} className="muted inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/> {demo.industry}</Link>
    <section className="grid items-end gap-8 py-12 lg:grid-cols-[1fr_340px]"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-500">{demo.industry}</span><span className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold">{demo.workload}</span></div><h1 className="gradient-text mt-6 text-5xl font-black tracking-[-.055em] md:text-7xl">{demo.name}</h1><p className="mt-5 max-w-2xl text-xl font-semibold leading-8">{demo.value}</p><p className="muted mt-4 max-w-2xl leading-7">{demo.problem}</p></div><div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-sm leading-6"><p className="font-bold text-blue-500">Interactive simulation</p><p className="muted mt-1">Scripted mock data only. No model execution, inference, or customer data.</p></div></section>
    <SimulationRenderer demo={demo}/>
    <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_360px]"><div className="space-y-6"><InfoSection icon={Target} title="Business challenge"><p className="muted leading-7">{demo.problem} This affects the people responsible for timely, consistent decisions and creates avoidable operational friction when information must be gathered manually.</p></InfoSection><CompetitiveSoftware demo={demo}/></div><aside><TechnologyStackCard demo={demo}/></aside></div>
  </div>;
}
function InfoSection({ icon: Icon, title, children }: { icon: typeof Target; title: string; children: React.ReactNode }) { return <section className="panel rounded-3xl p-7"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-500"><Icon size={19}/></span><h2 className="text-xl font-black">{title}</h2></div><div className="mt-6">{children}</div></section> }
