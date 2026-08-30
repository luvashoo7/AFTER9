// Client-side Typo-Tolerant Elastic-style Search
export function fuzzySearch(items, query) {
  if (!query || !query.trim()) return items;

  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = items.map((item) => {
    const title = (item.name || item.title || '').toLowerCase();
    const cat = (typeof item.category === 'object' ? item.category?.name : (item.category || '')).toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const tags = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : '';
    const sku = (item.sku || '').toLowerCase();

    let score = 0;

    for (const token of tokens) {
      if (title.includes(token)) score += 4.0;
      else if (title.split(/\s+/).some((w) => w.startsWith(token) || isCloseMatch(w, token))) score += 2.5;

      if (cat.includes(token)) score += 2.5;
      if (sku.includes(token)) score += 3.0;
      if (tags.includes(token)) score += 2.0;
      if (desc.includes(token)) score += 1.0;
    }

    return { item, score };
  });

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}

function isCloseMatch(a, b) {
  if (Math.abs(a.length - b.length) > 2) return false;
  let mismatches = 0;
  const minLen = Math.min(a.length, b.length);
  for (let i = 0; i < minLen; i++) {
    if (a[i] !== b[i]) mismatches++;
    if (mismatches > 2) return false;
  }
  return mismatches <= (b.length <= 4 ? 1 : 2);
}
