
# Public Domain Reader - 

There is a large amount of data on the web that is accessible, but not necessarily usable. Project Gutenberg (https://www.gutenberg.org/) has been digitizing the vast body literature in the public domain since 1971. Project Gutenberg makes all the works availible in a number of digital formats, but doesn't provide a great interface for exploring or reading the materials online. This project seeks to address some of these issues using React.js, Ruby on Rails, and the Gutendex API (https://github.com/garethbjohnson/gutendex). 

# Home
Users land at a home page when they create an account. Here users can create collections of books, view books in their current collections, view the books other users are currently reading, and jump back into the last book they were reading.

<figure class="video_container">
  <iframe src="https://giphy.com/embed/3l5fa8cIvpJjkYe9WE" width="480" height="238" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</figure>

Browse 
Users can look through pages of all the books in the database or browse by category (subject, author, bookshelf). User's can view all the books in a given category and read or add books to a collection. 

Search
You can quickly search through all categories containing a keywords. You can also filter search results by category. 

Read 
Public Domain Reader mounts the books as HTML. This is convenient for a number of reasons. Since Project Gutenberg is largely a voluneer effort, every book is formatted a little differently. We can use some simple Javascript to create consistent format across all books as well as provide the user with some additional controls over the reading experience. Users can bookmark paragraphs, change the size of the text, and read in "night mode". 


