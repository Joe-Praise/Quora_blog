import { useRouteLoaderData } from "react-router-dom";
import EditPostForm from "../components/Design/Home/EditPostForm";
import SideBar from "../components/Design/Home/SideBar";
import Advertisment from "../components/Design/Home/Advertisment";

function EditSinglePost() {
  const data = useRouteLoaderData("postDetail");
  return (
    <>
      <main className="main">
        <section className="body--width home-flex">
          <SideBar />
          <EditPostForm method="post" post={data.data} />
          <Advertisment />
        </section>
      </main>
    </>
  );
}

export default EditSinglePost;
