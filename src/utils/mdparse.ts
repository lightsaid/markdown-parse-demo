import { Marked } from "marked";
import type { Tokens } from "marked";

import hljs from 'highlight.js/lib/core'; // 导入核心，不需要把全部语言都导进来，后面通过注册所需语言
import javascript from 'highlight.js/lib/languages/javascript';
import go from 'highlight.js/lib/languages/go';

import "highlight.js/styles/a11y-dark.min.css";

// import hljs from "highlight.js";


// import "highlight.js/styles/default.min.css"

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("go", go)

hljs.highlightAll()



// 预定注册部分语言
// const supportLang = ["go", "javascript", "python", "sql", "dockerfile", "java", "json", "yaml", "xml", "bash"]

// supportLang.forEach(async (lang: string)=>{
//   await import(`highlight.js/lib/languages/${lang}`).then((module) =>{
//     hljs.registerLanguage('javascript', module);
//   })
// })




export class MarkdownParse {
  private marked: Marked
  constructor() {
    // 创建 marked 实例
    this.marked = new Marked()



    // 配置 marked
    this.marked.use({
      async: true,
      gfm: true,
      renderer: {
        code(text: string, lang: string, escaped: boolean) {
          console.log("text: ", text)
          console.log("lang: ", lang)
          console.log("escaped: ", escaped)
          let className = `hljs language-${lang}`

          // return hljs.highlight(`<pre> <code> ${text} </code> </pre>`, {language: lang}).value
          return `<pre><code class="${className}" > ${text} </code></pre>`;
        },

        heading(text: string, depth: number): string {
          const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
          return `
            <h${depth}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${depth}>
          `;
        }
      },
    })
  }


  parseToHTML(text: string): Promise<string> {
    return this.marked.parse(text) as Promise<string>
  }
}

