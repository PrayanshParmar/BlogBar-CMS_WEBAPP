// utils/convertHTMLtoJSX.js
export function wrapPreWithCode(input) {
  const preRegex = /<pre\b[^>]*>(.*?)<\/pre>/gs;

  const output = input.replace(preRegex, (_, preContent) => {
    const codeContent = preContent.trim();
    return `<pre class="editor-code">${codeContent}</pre>`;
  });

  return output;
}
