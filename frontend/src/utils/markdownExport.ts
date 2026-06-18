function sanitizeFileName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function createTimestamp(): string {
  return new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);
}

export function exportMarkdownDocument(
  title: string,
  content: string,
  filePrefix: string
): void {
  if (!content.trim()) {
    return;
  }

  const safeTitle = sanitizeFileName(title) || "document";
  const fileName = `${filePrefix}-${createTimestamp()}-${safeTitle}.md`;

  const markdownContent = `# ${title}

\`\`\`text
${content}
\`\`\`
`;

  const blob = new Blob([markdownContent], {
    type: "text/markdown;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
