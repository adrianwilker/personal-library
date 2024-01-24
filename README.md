# Personal Library

<p>This project was developed in the <a href="https://www.freecodecamp.org/learn/quality-assurance" target="_blank">freeCodeCamp's Quality Assurance course</a>.</p>

<p>To complete this project I had to implement the API with the <code>GET</code>, <code>POST</code> and <code>DELETE</code> methods. To do this, establish a connection with MongoDB, a NoSQL database. After that, I implemented and performed the necessary unit tests.</p>

<p>It's also available on replit: <a href="https://replit.com/@adrianwilker/personal-library" target="_blank">replit.com/@adrianwilker/personal-library</a>.</p>
<p>Deploy: <a href="https://personal-library-xese.onrender.com/" target="_blank">personal-library-xese.onrender.com</a></p>

<strong>In this project were used:</strong>
<ul>
  <li>Bootstrap</li>
  <li>Chai</li>
  <li>Express</li>
  <li>JavaScript</li>
  <li>Mocha</li>
  <li>MongoDB</li>
  <li>Mongoose</li>
  <li>Node.js</li>
</ul>

<hr>

<p>Tests:</p>
<ul>
  <li>You can send a <b>POST</b> request to <code>/api/books</code> with <code>title</code> as part of the form data to add a book. The returned response will be an object with the <code>title</code> and a unique <code>_id</code> as keys.  If <code>title</code> is not included in the request, the returned response should be the string <code>missing required field title</code>.</li>
  <li>You can send a <b>GET</b> request to <code>/api/books</code> and receive a JSON response representing all the books. The JSON response will be an array of objects with each object (book) containing <code>title</code>, <code>_id</code>, and <code>commentcount</code> properties.</li>
  <li>You can send a <b>GET</b> request to <code>/api/books/{_id}</code> to retrieve a single object of a book containing the properties <code>title</code>, <code>_id</code>, and a <code>comments</code> array (empty array if no comments present). If no book is found, return the string <code>no book exists</code>.</li>
  <li>You can send a <b>POST</b> request containing <code>comment</code> as the form body data to <code>/api/books/{_id}</code> to add a comment to a book. The returned response will be the books object similar to <b>GET</b> <code>/api/books/{_id}</code> request in an earlier test. If <code>comment</code> is not included in the request, return the string <code>missing required field comment</code>. If no book is found, return the string <code>no book exists</code>.</li>
  <li>You can send a <b>DELETE</b> request to <code>/api/books/{_id}</code> to delete a book from the collection. The returned response will be the string <code>delete successful</code> if successful. If no book is found, return the string <code>no book exists</code>.</li>
  <li>You can send a <b>DELETE</b> request to <code>/api/books</code> to delete all books in the database. The returned response will be the string <code>complete delete successful</code> if successful.</li>
</ul>
