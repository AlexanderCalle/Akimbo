import { useEffect } from "react";
import PlannedArticles from "../../components/Articles/PlannedArticles";
import OverviewDairyItems from "../../components/Dairy/OverviewDairyItems";
import { DuplicateCollectionToDev } from "../../services/Articles";

const OverviewPosts = () => {

  return (
    <div>
      <PlannedArticles />
      <iframe 
        title="Plausible Analytics Dashboard"
        plausible-embed 
        src="https://plausible.akimbo-mag.com/share/akimbo-mag.com?auth=4-mf1ikWA8NrwRYpZFpsd&embed=true&theme=light&background=transparent" 
        frameborder="0"  
        loading="lazy" 
        scrolling="no"
        style={{width: "1px", minWidth: "100%", height: "1500px", overflow: "hidden"}} 
      />
        <script async src="https://plausible.akimbo-mag.com/js/embed.host.js"></script>
      {/* <OverviewArticles /> */}
      {/* <OverviewDairyItems /> */}
    </div>
  );
};

export default OverviewPosts;
