class Adapter
{
  static authorizeUser(user_name, password)
  {
    return fetch('http://localhost:3000/api/v1/auth',{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_name: user_name, password: password})
    })
  }

  static getBooks()
  {
    return fetch(`http://localhost:3000/api/v1/books`,{
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => res.json())
  }
  static getCollections()
  {
    return fetch(`http://localhost:3000/api/v1/collections`,{
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => res.json())
  }

  static postBookToCollection(id, selectedCollection)
  {
    return fetch('http://localhost:3000/api/v1/collections',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({book_id: id, collection: selectedCollection})
    })
  }

  static searchBooks(query)
  {
    return fetch('http://localhost:3000/api/v1/search', {
      method: "post",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({query: query})

    }).then(resp => resp.json())
  }

  static getCurrentUser() {
    const token = localStorage.getItem('token')

    return fetch(`http://localhost:3000/api/v1/current_user`, {
      headers: {
        Authorization: token
      }
    }).then(res => res.json());

  };
}
export default Adapter;
