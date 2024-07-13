***
*** Imports:
***

import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
passport: Authentication middleware for Node.js.

passport-local: Strategy for username and password authentication with Passport.

express-session: Middleware for managing sessions in Express.

***
*** Session Middleware Setup:
***

app.use(
session({
secret: "TOPSECRETWORD",
resave: false,
saveUninitialized: true,
})
);
Configures the Express session middleware with a secret key, which is used to sign the session ID cookie.

resave: Determines whether the session should be saved back to the session store, even if it hasn't been modified during the request.

saveUninitialized: Determines whether a session should be created for an uninitialized (new) session.

***
*** Passport Middleware Setup:
***

app.use(passport.initialize());
app.use(passport.session());
Initializes Passport and sets it up to use sessions for authentication.

***
*** Secrets Route:
***

app.get("/secrets", (req, res) => {
if (req.isAuthenticated()) {
res.render("secrets.ejs");
} else {
res.redirect("/login");
}
});
Checks if the user is authenticated using Passport's isAuthenticated() method.

If authenticated, renders the secrets page; otherwise, redirects to the login page.

***
*** Login POST Route:
***

app.post(
"/login",
passport.authenticate("local", {
successRedirect: "/secrets",
failureRedirect: "/login",
})
);
Handles the login form submission using Passport's local strategy.

If authentication succeeds, redirects to the secrets page; otherwise, redirects back to the login page.

***
*** Passport Local Strategy Setup:
***

passport.use(
new Strategy(async function verify(username, password, cb) {
// Verification logic
})
);
Defines a new Passport local strategy for authenticating users.

The strategy's verify function is called with the provided username and password.

It queries the database to find the user by email and compares the hashed password.

***
*** Passport Serialization and Deserialization:
***

passport.serializeUser((user, cb) => {
cb(null, user);
});
passport.deserializeUser((user, cb) => {
cb(null, user);
});
passport.serializeUser: is a function provided by Passport that determines which data of the user object should be stored in the session.

Once you've determined what data to store, you call the callback cb with null (to indicate that there's no error) and the data you want to store.

passport.deserializeUser: is a function provided by Passport that retrieves the data stored in the session and converts it into a user object.

Once you've retrieved the user object, you call the callback cb with null (to indicate that there's no error) and the user object.

***
*** cb:
***

cb (short for callback) is a function provided by Passport to communicate the outcome of the authentication process back to Passport.

if (valid) { return cb(null, user); } else { return cb(null, false); }

cb(null, user) passes null (indicating no error) and the authenticated user object user to Passport, indicating a successful authentication.

If the password is invalid, Passport needs to indicate that the authentication failed.

cb(null, false) passes null (indicating no error) and false to Passport, indicating that the authentication failed.
