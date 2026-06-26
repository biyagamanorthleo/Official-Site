'use client';

import { useRef } from 'react';
import { Bold, Italic, Heading, List, Link2 } from 'lucide-react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
};

/**
 * Plain-text editor with a lightweight Markdown formatting toolbar.
 * Supported syntax (rendered by <RichText>): **bold**, *italic*, ## heading,
 * - bullet list, [text](url) links. No external dependencies.
 */
export default function MarkdownEditor({ value, onChange, rows = 14, placeholder }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Wrap the current selection with `before`/`after`, or insert a placeholder.
  function wrap(before: string, after: string, placeholderText: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || placeholderText;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    // Restore focus and select the inner text after React re-renders.
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = start + before.length;
      el.selectionEnd = start + before.length + selected.length;
    });
  }

  // Prefix the start of each selected line (for headings / list items).
  function prefixLines(prefix: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const block = value.slice(lineStart, end);
    const updated = block
      .split('\n')
      .map(line => (line.startsWith(prefix) ? line : prefix + line))
      .join('\n');
    const next = value.slice(0, lineStart) + updated + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = lineStart;
      el.selectionEnd = lineStart + updated.length;
    });
  }

  function insertLink() {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || 'link text';
    const url = window.prompt('Link URL', 'https://');
    if (!url) return;
    const snippet = `[${selected}](${url})`;
    const next = value.slice(0, start) + snippet + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = start + 1;
      el.selectionEnd = start + 1 + selected.length;
    });
  }

  const tools = [
    { icon: Bold,    label: 'Bold',    onClick: () => wrap('**', '**', 'bold text') },
    { icon: Italic,  label: 'Italic',  onClick: () => wrap('*', '*', 'italic text') },
    { icon: Heading, label: 'Heading', onClick: () => prefixLines('## ') },
    { icon: List,    label: 'List',    onClick: () => prefixLines('- ') },
    { icon: Link2,   label: 'Link',    onClick: insertLink },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-black overflow-hidden focus-within:border-red-700 transition-colors">
      <div className="flex items-center gap-1 px-2 py-2 border-b border-white/10 bg-white/[0.02]">
        {tools.map(({ icon: Icon, label, onClick }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            onClick={onClick}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-muted hover:text-white hover:bg-white/10 transition-all"
          >
            <Icon size={15} />
          </button>
        ))}
        <span className="ml-auto pr-1 text-ink-muted text-[9px] font-bold uppercase tracking-widest hidden sm:block">Markdown</span>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-transparent px-5 py-4 text-white text-sm focus:outline-none resize-none font-mono"
      />
    </div>
  );
}
