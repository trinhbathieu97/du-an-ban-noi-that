import { useDispatch } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { DataLogin, OnlogIn } from "../../redux/Reducer";
import { UserFirebase } from "../../redux/ReducerCart";
import app from "../../Firebase/Firebase";

export const LogInGoogle = () => {
  const distpatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const axx = true;
  const auth = getAuth(app);
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        alert("dang nhap thanh cong");
        distpatch(DataLogin(user.providerData));
        distpatch(UserFirebase(user.providerData));
        distpatch(OnlogIn(axx));
      })
      .catch((error) => {
        console.log("Error");
      });
  };
  return login;
};
