import { createFileRoute, Link } from '@tanstack/react-router';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pages, navigation, topicLabels } from '@/lib/site-content';

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search['q'] === 'string' ? search['q'] : '' }),
  head: () => ({ meta: [{ title: 'Search Spouzy' }, { name: 'description', content: 'Find Spouzy relationship and wellbeing resources.' }, { property: 'og:title', content: 'Search Spouzy' }, { property: 'og:description', content: 'Find Spouzy relationship and wellbeing resources.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }, { name: 'robots', content: 'noindex' }] }),
  component: SearchPage,
});
function SearchPage() {
  const { q } = Route.useSearch();
  const term = q.trim().toLowerCase();
  const items = [...Object.entries(pages).map(([href,page])=>({href,title:page.title,description:page.description})), ...navigation.flatMap(n=>n.children.filter(([,href])=>!pages[href]).map(([title,href])=>({href,title:topicLabels[href.split('/').pop() || ''] || title,description:`Explore ${title.toLowerCase()} with Spouzy.`})))];
  const results = term ? items.filter(item=>[item.title,item.description,item.href].some(value=>value.toLowerCase().includes(term))).slice(0,18) : [];
  return <main className="container-site py-16 lg:py-24"><p className="eyebrow text-primary">Find your way</p><h1 className="section-title mt-4">Search Spouzy</h1><form action="/search" method="get" className="mt-9 flex max-w-2xl gap-2"><label htmlFor="search-query" className="sr-only">Search topics</label><input id="search-query" name="q" defaultValue={q} placeholder="Try marriage, wellbeing, workplace..." className="min-w-0 flex-1 rounded-md border border-border bg-card px-5 py-3 focus:ring-2 focus:ring-ring"/><Button type="submit" className="h-auto rounded-md"><Search className="size-4"/> Search</Button></form>{term ? <div className="mt-12 max-w-3xl"><h2 className="mb-6 text-xl font-semibold">{results.length ? `Results for “${q}”` : `No results for “${q}”`}</h2>{results.map(result=><Link key={result.href} to={result.href} className="flex items-start justify-between gap-5 border-t border-border py-6 hover:text-primary"><div><h3 className="text-lg font-semibold">{result.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{result.description}</p></div><ArrowRight className="mt-1 size-5 shrink-0"/></Link>)}{!results.length && <p className="text-muted-foreground">Try another word or browse the topics in the menu.</p>}</div> : <p className="mt-10 text-muted-foreground">Search relationships, wellbeing and workplace resources.</p>}</main>;
}
