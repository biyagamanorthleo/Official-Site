import React from 'react';

/**
 * Minimal, dependency-free Markdown renderer for blog content.
 * Supports: **bold**, *italic*, [text](url) links, `## `/`### ` headings,
 * and `- ` bullet lists. Blocks are separated by blank lines.
 *
 * Output is built as React elements (no dangerouslySetInnerHTML), so user
 * content cannot inject markup — only the recognised syntax is rendered.
 */

const INLINE = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\))/g;

function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  INLINE.lastIndex = 0;
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;
    if (match[2] !== undefined) {
      nodes.push(<strong key={key} className="text-white font-bold">{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      nodes.push(<em key={key}>{match[3]}</em>);
    } else if (match[4] !== undefined && match[5] !== undefined) {
      const href = match[5];
      const safe = /^(https?:\/\/|\/|mailto:)/i.test(href) ? href : '#';
      nodes.push(
        <a key={key} href={safe} target="_blank" rel="noopener noreferrer"
          className="text-red-500 hover:text-red-400 underline underline-offset-2">
          {match[4]}
        </a>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function RichText({ text }: { text: string }) {
  const blocks = (text ?? '').split(/\n\n+/).map(b => b.trim()).filter(Boolean);

  return (
    <div className="max-w-none">
      {blocks.map((block, bi) => {
        const lines = block.split('\n');

        // Bullet list: every line starts with "- "
        if (lines.every(l => /^[-*]\s+/.test(l))) {
          return (
            <ul key={bi} className="list-disc pl-6 mb-6 space-y-2 text-gray-300 text-base leading-relaxed">
              {lines.map((l, li) => (
                <li key={li}>{parseInline(l.replace(/^[-*]\s+/, ''), `${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }

        // Heading: "## " or "### "
        const h = block.match(/^(#{1,3})\s+(.*)$/);
        if (h && lines.length === 1) {
          const level = h[1].length;
          const content = parseInline(h[2], `${bi}`);
          if (level <= 2) {
            return <h2 key={bi} className="text-2xl font-heading font-black text-white uppercase tracking-tight mt-10 mb-4">{content}</h2>;
          }
          return <h3 key={bi} className="text-xl font-heading font-black text-white uppercase tracking-tight mt-8 mb-3">{content}</h3>;
        }

        // Paragraph: single newlines become line breaks.
        return (
          <p key={bi} className="text-gray-300 text-base leading-relaxed mb-6">
            {lines.map((l, li) => (
              <React.Fragment key={li}>
                {li > 0 && <br />}
                {parseInline(l, `${bi}-${li}`)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
