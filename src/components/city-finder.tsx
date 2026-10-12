import { useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cities, type City } from '@/lib/locations';

export function CityFinder({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'locating' | 'denied'>('idle');
  const navigate = useNavigate();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return cities.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const open = (city: City) => {
    setQuery('');
    navigate({ to: '/locations/$region/$city', params: { region: city.region, city: city.slug } });
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) {
      setStatus('denied');
      return;
    }
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let best = cities[0];
        let bestDist = Infinity;
        for (const c of cities) {
          const d = (c.lat - pos.coords.latitude) ** 2 + (c.lng - pos.coords.longitude) ** 2;
          if (d < bestDist) {
            bestDist = d;
            best = c;
          }
        }
        setStatus('idle');
        if (best) open(best);
      },
      () => setStatus('denied'),
      { timeout: 8000 },
    );
  };

  return (
    <div className={`w-full max-w-xl ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (matches[0]) open(matches[0]);
        }}
        className="flex gap-2"
      >
        <div className="relative min-w-0 flex-1">
          <MapPin className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your city, e.g. Thane"
            aria-label="Type your city"
            className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button type="button" variant="outline" onClick={useMyLocation} disabled={status === 'locating'} aria-label={status === 'locating' ? 'Finding your location' : 'Use my location'} title="Use my location" className="shrink-0 rounded-full px-4">
          <Navigation className="size-4" />
          <span className="hidden sm:inline">{status === 'locating' ? 'Finding…' : 'Use my location'}</span>
        </Button>
      </form>
      {matches.length > 0 && (
        <ul className="mt-2 overflow-hidden rounded-md border border-border bg-card shadow-sm">
          {matches.map((c) => (
            <li key={c.slug}>
              <Button
                type="button"
                variant="ghost"
                onClick={() => open(c)}
                className="flex h-auto min-h-11 w-full items-center justify-between rounded-none px-4 py-3 text-left text-sm hover:bg-muted"
              >
                <span className="font-medium">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.region === 'gujarat' ? 'Gujarat' : 'Mumbai region'}</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
      {status === 'denied' && (
        <p className="mt-2 text-xs text-muted-foreground">
          Location is off or was not allowed. No problem — just type your city above.
        </p>
      )}
    </div>
  );
}
