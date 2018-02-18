class HtmlHacker
{
  static stripBook()
  {
    const importantElements = document.querySelectorAll("p, h1, h2, h3, title")
    const cleanBookArray = Array.from(importantElements).map((element) => {
      return element.outerHTML
    })
    return cleanBookArray.join("")
  }
}
export default HtmlHacker;
