export function highlightKeywords(text: string, keywords: string): string {
  const keywordList = keywords.toLowerCase().split(/\s+/)
  const regex = new RegExp(`\\b(${keywordList.join('|')})\\b`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

