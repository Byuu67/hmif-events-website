const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const session = require("express-session");
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(session({
  secret: "hmif-secret", 
  resave: false,
  saveUninitialized: true
}));



app.get("/", (req, res) => {
  db.all("SELECT * FROM events", (err, rows) => {
    if (err) return res.send("Error database");

    res.render("index", { events: rows });
  });
});



app.post("/register/:id", (req, res) => {
  const id = req.params.id;


  db.get("SELECT quota FROM events WHERE id = ?", [id], (err, event) => {
    if (!event) return res.redirect("/");
    if (event.quota <= 0) return res.redirect("/");

    const newQuota = event.quota - 1;

    db.run("UPDATE events SET quota = ? WHERE id = ?", [newQuota, id], () => {
      res.redirect("/");
    });
  });
});

function requireAdmin(req, res, next) {
  if (req.session.isAdmin) next();
  else res.redirect("/login");
}


app.get("/login", (req, res) => {
  res.render("login", { error: null });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    res.redirect("/admin");
  } else {
    res.render("login", { error: "Username atau password salah" });
  }
});


app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});


app.get("/admin", requireAdmin, (req, res) => {
  db.all("SELECT * FROM events", (err, rows) => {
    res.render("admin-index", { events: rows });
  });
});

app.get("/admin/create", requireAdmin, (req, res) => {
  res.render("admin-create");
});

app.post("/admin/create", requireAdmin, (req, res) => {
  const { name, description, date, location, quota } = req.body;

  db.run(
    "INSERT INTO events (name, description, date, location, quota) VALUES (?, ?, ?, ?, ?)",
    [name, description, date, location, quota],
    () => res.redirect("/admin")
  );
});

app.get("/admin/edit/:id", requireAdmin, (req, res) => {
  db.get("SELECT * FROM events WHERE id = ?", [req.params.id], (err, row) => {
    res.render("admin-edit", { event: row });
  });
});

app.post("/admin/edit/:id", requireAdmin, (req, res) => {
  const { name, description, date, location, quota } = req.body;

  db.run(
    "UPDATE events SET name=?, description=?, date=?, location=?, quota=? WHERE id=?",
    [name, description, date, location, quota, req.params.id],
    () => res.redirect("/admin")
  );
});

app.post("/admin/delete/:id", requireAdmin, (req, res) => {
  db.run("DELETE FROM events WHERE id=?", [req.params.id], () => {
    res.redirect("/admin");
  });
});


app.listen(3000, () => console.log("Server running at http://localhost:3000"));
