import { useEffect } from "react";
import PlannedArticles from "../../components/Articles/PlannedArticles";
import OverviewDairyItems from "../../components/Dairy/OverviewDairyItems";
import { DuplicateCollectionToDev } from "../../services/Articles";

const OverviewPosts = () => {

  return (
    <div>
      <PlannedArticles />
      {/* <OverviewArticles /> */}
      {/* <OverviewDairyItems /> */}
    </div>
  );
};

export default OverviewPosts;
