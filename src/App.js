import Header from "./component/Header/Header";
import Container from "./component/Container/Container";
import Footer from "./component/Footer/Footer";
import HistoRyProductCart from "./component/HistoryProductCart/HistoRyProductCart";
import "antd/dist/antd.css";
import {
  DataLogin,
  DataUserLongIn,
  getProduct,
  getProduct2,
  listProduct,
  OnlogIn,
} from "./component/redux/Reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../src/component/Firebase/Firebase";
import {
  UserFirebase,
  setLocaStore,
  setUserApp,
} from "./component/redux/ReducerCart";
import InfoUser from "./component/InfoUser/InfoUser";
import Detail from "./component/DetailProduct/Detail";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

function App() {
  const distpatch = useDispatch();
  const data = useSelector(listProduct);
  const emailUser = useSelector(DataUserLongIn);
  const axx = true;

  useEffect(
    () => async () => {
      if (emailUser.length > 0) {
        const db = getFirestore();
        const docRef2 = doc(db, "usersApp", emailUser[0].email);
        const all = await getDoc(docRef2);
        if (all._document == null) {
          await setDoc(docRef2, {
            user: {
              name: "user",
              email: emailUser[0].email,
              img: "https://hinh365.com/wp-content/uploads/2020/06/98-102-hinh-anh-ve-chim-se-tuyen-tap-nhung-tam-anh-dep-nhat-moi-ban-cung-xem-2.jpg",
              phone: "0123345",
              address: "sdasd",
            },
          });
        }

        distpatch(setUserApp(all.data().user));
      }
    },
    [emailUser]
  );

  useEffect(() => {
    distpatch(getProduct());
  }, []);

  useEffect(() => {
    distpatch(getProduct2(data.slice(0, 5)));
  }, [data]);
  // load lai trang van con tai khoan
  useEffect(() => {
    let itemUser = JSON.parse(localStorage.getItem("user"));
    let itemCart = JSON.parse(localStorage.getItem("item"));
    distpatch(setUserApp(itemUser));
    if (!itemCart) {
      itemCart = [];
      distpatch(setLocaStore(itemCart));
    }
    distpatch(setLocaStore(itemCart));

    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        distpatch(DataLogin(user.providerData));
        distpatch(UserFirebase(user.providerData));
        distpatch(OnlogIn(axx));
      }
    });
  }, []);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={Container} />
        <Route path="/a" component={HistoRyProductCart} />
        <Route path="/user" component={InfoUser} />
        <Route path="/detail/:id" component={Detail} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
