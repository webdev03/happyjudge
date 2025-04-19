import { micromark } from 'micromark';
import { math, mathHtml } from 'micromark-extension-math';

/**
 * Parses markdown into HTML. Supports LaTeX.
 * @param markdown The markdown to parse into HTML.
 */
export function parseMarkdown(markdown: string) {
  return micromark(markdown, {
    extensions: [math()],
    htmlExtensions: [
      mathHtml({
        output: 'mathml',
      }),
    ],
  });
}
