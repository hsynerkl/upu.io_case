import { useState, useEffect } from "react";
import Top from "./partials/Top";
import TabNavigation from "./partials/TabNavigation";
import type { DesignType } from "./types";
import Board from "./partials/board";

const Home = () => {
  const [design, setDesign] = useState<DesignType>("grid");

  const handleDesignChange = (newDesign: DesignType) => {
    setDesign(newDesign);
  };

  return (
    <section>
      <Top design={design} onDesignChange={handleDesignChange} />
      <TabNavigation />
      <Board design={design} />
    </section>
  );
};

export default Home;
