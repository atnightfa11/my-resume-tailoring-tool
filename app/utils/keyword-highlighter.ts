export function highlightKeywords(text: string, keywords: string[]): string {
  let highlightedText = text;
  keywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    highlightedText = highlightedText.replace(regex, `**${keyword}**`);
  });
  return highlightedText;
}

