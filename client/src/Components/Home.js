import React, { useEffect, useState } from "react";
import Model from "./Home/Model";
import axios from "axios";
const Home = () => {
  const [models, setmodels] = useState([]);
  useEffect(() => {
    axios
      .get("/models")
      .then((result) => {
        setmodels(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(models);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "lightgrey",
      }}
    >
      {models.map((model) => {
        return (
          <div style={{ width: "30%" }}>
            <Model
              name={model.name}
              type={model.type}
              image={model.image}
              id={model.model_id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
