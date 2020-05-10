const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// When a new user is registered, a new record will be created
// for that user.
exports.onNewUser = functions
  .region("europe-west1")
  .auth.user()
  .onCreate((user) => {
    admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        uid: user.uid,
        email: user.email,
        name: null,
        photoUrl: null,
        role: "registered",
        phoneNumber: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    return null;
  });

// After update any user it will update also the user profile
exports.onUpdateUser = functions
  .region("europe-west1")
  .firestore.document("users/{userId}")
  .onUpdate((change, context) => {
    const newChanges = change.after.data();
    console.log(newChanges);
    admin.auth().updateUser(context.params.userId, {
      displayName: newChanges["name"],
      phoneNumber: "+34" + newChanges["phoneNumber"],
    });
    return null;
  });
