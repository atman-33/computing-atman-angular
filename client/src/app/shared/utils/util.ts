import * as MarkdownIt from 'markdown-it';

  /**
   * mdファイル内の画像に文字列を追加
   * @param md 
   * @param prefix 
   */
  export function addMdPrefixToImageSource(md: MarkdownIt, prefix: string) {
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
      const imgToken = tokens[idx];
      const srcIndex = imgToken.attrIndex('src');
      if (imgToken.attrs !== null) {
        const srcValue = imgToken.attrs[srcIndex][1];
        const newSrcValue = prefix + srcValue;
        imgToken.attrs[srcIndex][1] = newSrcValue;
      }
      return self.renderToken(tokens, idx, options);
    };
  }

  /**
   * mdファイルのコンテンツデータを取得
   * @param str 
   * @returns 
   */
  export function getMdContent(str: string): string {
    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1);
    const content = str.slice(endIndex + 3).trim();

    return content;
  }

  /**
   * mdファイルのメタデータを取得
   * @param str 
   * @param key 
   * @returns 
   */
  export function getMetadataValue(str: string, key: string): string {
    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1);
    const metadata = str.slice(startIndex + 3, endIndex).trim();

    const keyStartIndex = metadata.indexOf(key);
    const keyEndIndex = metadata.indexOf('\n', keyStartIndex);
    const value = metadata.slice(keyStartIndex + key.length, keyEndIndex).trim();

    return value;
  }

  /**
   * htmlのタグにクラスを追加
   * @param html 
   * @param className 
   * @param tagName 
   * @returns 
   */
  export function addClassToHtml(html: string, className: string, tagName: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll(tagName);
    elements.forEach((el) => {
      el.classList.add(className);
    });
    return doc.documentElement.innerHTML;
  }

  /**
   * 要素の終了タグの後ろにテキストを追加
   * @param html
   * @param tagName 
   * @param text 
   * @returns 
   */
  export function addTextAfterClosingTag(html: string, tagName: string, text: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll(tagName);
    elements.forEach((el) => {
      const textNode = document.createTextNode(text);
      if (el.parentNode) {
        el.parentNode.insertBefore(textNode, el.nextSibling);
      }
    });
    return doc.documentElement.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
  }