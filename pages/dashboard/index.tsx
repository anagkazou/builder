import { NextPage } from "next";
import { useEffect } from "react";
import { setActivePage } from "../../redux/features/page-data/page-data.slice";
import "react-sliding-side-panel/src/index.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useRouter } from "next/router";


const Dashboard: NextPage = () => {

    const dispatch = useDispatch();
    const pages = useSelector(selectUser)?.currentUser.pages
    const route = useRouter();
  useEffect(() => {
    console.log( 'USER PAGE',pages)
  }, );

  const openInEditor =(page: { handle: string; pageId: string; }) => {
      dispatch(setActivePage(page));
      route.push("/editor");
  }

  return (<div className=" px-4 dashboard">
        <div className="py-40">
        <h2 className="font-bold text-white">Dashboard</h2>
          <p>Here are your pages:</p>
          <ul className="pages-list">
            {pages?.map((page, index)=> <li key={index} className="page-list__item" onClick={()=>openInEditor(page)}>{page.handle}</li>)}
          </ul>
        </div>
    </div>

    );
};

export default Dashboard;
