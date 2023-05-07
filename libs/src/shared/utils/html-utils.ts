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