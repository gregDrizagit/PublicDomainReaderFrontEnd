class Adapter
{
  static authorizeUser(user_name, password)
  {
    return fetch('https://public-domain-reader.herokuapp.com/api/v1/auth',{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_name: user_name, password: password})
    })
  }

  static deleteCollection(id)
  {
    return fetch(`https://public-domain-reader.herokuapp.com/api/v1/collections/${id}`,{
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({collection_id: id})
    })
  }

  static showCategory(id, cat)
  {
    return fetch(`https://public-domain-reader.herokuapp.com/api/v1/${cat}/${id}`).then(resp => resp.json())
  }

  static getBooks()
  {
    return fetch(`https://public-domain-reader.herokuapp.com/api/v1/books`,{
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => res.json())
  }

  static getCurrentlyReadingForAllUsers()
  {
    return fetch(`https://public-domain-reader.herokuapp.com/api/v1/currently_reading`,{
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => res.json())
  }

  static getCollections()
  {
    return fetch(`https://public-domain-reader.herokuapp.com/api/v1/collections`,{
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => res.json())
  }

  static postBookToCollection(id, selectedCollection)
  {
    return fetch('https://public-domain-reader.herokuapp.com/api/v1/collections',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({book_id: id, collection: selectedCollection})
    })
  }

  static getPage(pageNum, results, route)
  {
    return fetch(`https://public-domain-reader.herokuapp.com/api/v1/${route}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({page: pageNum, results_per_page: results})
    }).then(resp => resp.json())
  }

  static createNewCollection(collectionName, currentUser)
  {
    return fetch("https://public-domain-reader.herokuapp.com/api/v1/new",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({collection_name: collectionName, current_user: currentUser })
    }).then(resp => resp.json())
  }

  static getBookmarksForBook(id)
  {
    return fetch(`https://public-domain-reader.herokuapp.com/api/v1/load_bookmark`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({book_id: id})
    }).then(resp => resp.json())
  }

  static getHtmlForBook(url)
  {
    return fetch('https://public-domain-reader.herokuapp.com/api/v1/get_book',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({html_url: url})
    }).then(resp => resp.text())
  }

  static searchBooks(query)
  {
    return fetch('https://public-domain-reader.herokuapp.com/api/v1/search', {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({query: query})

    }).then(resp => resp.json())
  }

  static setBookmark (user_id, book_id, paragraph)
  {
    return fetch('https://public-domain-reader.herokuapp.com/api/v1/bookmarks',{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({user_id: user_id, book_id: book_id, paragraph: paragraph})
    }).then(resp => resp.json())
  }

  static getCurrentUser() {
    const token = localStorage.getItem('token')

    return fetch(`https://public-domain-reader.herokuapp.com/api/v1/current_user`, {
      headers: {
        Authorization: token
      }
    }).then(res => res.json());

  };
}
export default Adapter;
