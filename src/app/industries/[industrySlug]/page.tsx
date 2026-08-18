import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getIndustry, industries } from "@/data/catalog";

export function generateStaticParams() { return industries.map((item) => ({ industrySlug: item.slug })); }
export default async function IndustryPage({ params }: { params: Promise<{ industrySlug: string }> }) {
  const { industrySlug } = await params; const industry = getIndustry(industrySlug); if (!industry) notFound();
  return <div className="shell pt-9"><Link href="/markets" className="muted inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/> All markets</Link>
    <section className="mt-7"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="eyebrow">{industry.market} / {industry.name}</p><h1 className="mt-2 text-3xl font-black tracking-[-.035em]">Available experiences</h1></div><span className="muted text-sm">{industry.demos.length} demonstrations</span></div><div className="mt-5 grid gap-4 md:grid-cols-2">{industry.demos.map((demo, index) => <Link href={`/demos/${demo.slug}`} key={demo.slug} className="panel group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-blue-500/50"><div className="flex items-center justify-between"><span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500">{demo.archetype}</span><span className="muted text-xs">0{index + 1}</span></div><h2 className="mt-7 text-xl font-black">{demo.name}</h2><p className="muted mt-2 text-sm leading-6">{demo.value}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-500">Launch simulation <ArrowRight size={16} className="transition group-hover:translate-x-1"/></span></Link>)}</div></section>
  </div>;
}
