class HtmlHacker
{
  static setBookmark(e)
  {
    console.log(e)
  }
  static tagParagraphs()
  {
    const stuff = document.body.getElementsByTagName('p')
    Object.keys(stuff).forEach(key => {
      stuff[key].setAttribute("id", key)
      stuff[key].setAttribute("onclick","setBookmark()")
    })
  }
}
