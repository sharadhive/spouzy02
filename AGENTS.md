<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Spouzy's public pages in TanStack Start SSR routes; this preserves indexable HTML within the project's fixed framework.
- Store shared navigation and page copy in `src/lib/site-content.ts`; this keeps labels and topic destinations consistent.
- Use generated editorial imagery and the latest uploaded Spouzy logo asset across brand placements, with its letter as the favicon; this avoids external hotlinked media and preserves the supplied brand.
- Give each public content destination its own TanStack Start route and share its presentation through ContentView; this keeps navigation type-safe and page metadata distinct.
- Keep responsive type sizes at explicit breakpoints, touch controls at least 44px, and modal keyboard/scroll handling in the shared shell; this makes device behavior consistent across pages.
