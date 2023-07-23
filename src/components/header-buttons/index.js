import React, { useState } from "react";
import { Radio } from "antd";

import "./header-buttons.css";

function HeaderButtons() {
  const [size, setSize] = useState("large");
  return (
    <div>
      <Radio.Group
        className="buttons"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <Radio.Button value="large">Search</Radio.Button>
        <Radio.Button value="small">Rated</Radio.Button>
      </Radio.Group>
    </div>
  );
}
export default HeaderButtons;
