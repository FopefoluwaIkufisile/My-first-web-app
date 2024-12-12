import express from "express"
import ejs from "ejs"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.set('view engine', 'ejs');

let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' }
  ];

app.get("/", (req,res)=>{
    res.render("index", {posts})
})
app.get("/create", (req,res)=> {
    res.render("create")
})
app.post("/posts", (req,res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.posttitle,
        content: req.body.postdesc
      };
      posts.push(newPost);

      console.log('New post added:', newPost);
      console.log('Updated posts array:', posts);
      res.redirect('/');
});
app.get('/posts/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
      res.render('edit', {post});
    } else {
      res.status(404).send('Post not found');
    }
  });
  
  app.post('/posts/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === postId);
    
    if (index !== -1) {
      posts[index].title = req.body.posttitle;
      posts[index].content = req.body.postdesc;
      res.redirect('/');
    } else {
      res.status(404).send('Post not found');
    }
  });

app.get("/posts/views/:id", (req,res)=>{
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('views', {post});
      } else {
        res.status(404).send('Post not found');
      }
})
app.post('/posts/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    res.redirect('/');
  });

app.listen(port, ()=>
    console.log(`Serving running on port ${port}`));
