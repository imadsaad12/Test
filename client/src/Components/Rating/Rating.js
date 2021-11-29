import axios from "axios";
import React, { useState, useEffect } from "react";
import { Rating, Progress } from "semantic-ui-react";

const Ratings = ({ id, username }) => {
  console.log(username);
  const [rate, setrate] = useState({});
  const [allRate, setallRate] = useState([]);
  const [one, setone] = useState(0);
  const [two, settwo] = useState(0);
  const [three, setthree] = useState(0);
  const [four, setfour] = useState(0);
  const [five, setfive] = useState(0);
  const [avg, setavg] = useState(0);
  const [count, setCount] = useState(0);

  var total = 0;
  var OneStar = 0,
    TowStars = 0,
    ThreeStars = 0,
    FourStars = 0,
    FiveStars = 0;
  const manageRate = () => {
    total = allRate.length;
    allRate.map((i) => {
      switch (i.stars) {
        case 1:
          OneStar++;
          break;
        case 2:
          TowStars++;
          break;
        case 3:
          ThreeStars++;
          break;
        case 4:
          FourStars++;
          break;
        case 5:
          FiveStars++;
          break;
        default:
          break;
      }
    });

    setone((prev) => (OneStar / total) * 100);
    settwo((prev) => (TowStars / total) * 100);
    setthree((prev) => (ThreeStars / total) * 100);
    setfour((prev) => (FourStars / total) * 100);
    setfive((prev) => (FiveStars / total) * 100);
    setavg(
      (prev) =>
        (1 * OneStar +
          2 * TowStars +
          3 * ThreeStars +
          3 * FourStars +
          5 * FiveStars) /
        total
    );
  };

  useEffect(() => {
    axios
      .get(`/rating/${id}`)
      .then((res) => {
        setallRate(res.data.ratings);
        setCount(res.data.customers);
        manageRate();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [five, four, three, two, one, avg]);

  const handleRating = async (e, data) => {
    const { value } = e.target;
    setrate(value);
    const payload = {
      id: id,
      stars: data.rating,
      name: username,
    };
    const req = await axios.post("/rating", payload);
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 250,
        textAlign: "center",
        marginLeft: "10%",
        marginTop: "20%",
      }}
    >
      <h2 style={{ padding: "5% 0" }}>Customers reviews</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Rating
          icon="star"
          defaultRating={3}
          maxRating={5}
          rating={parseInt(avg)}
          size="huge"
          onRate={handleRating}
          style={{ width: "70%" }}
        />
        <p> {isNaN(avg) ? 0 : avg.toFixed(1)} out of 5</p>
      </div>
      <h4 style={{ padding: "2% 0", color: "gray" }}>
        {" "}
        {count} customer rating
      </h4>
      <Stars percentage={one} stars={1} id={id} />
      <Stars percentage={two} stars={2} id={id} />
      <Stars percentage={three} stars={3} id={id} />
      <Stars percentage={four} stars={4} id={id} />
      <Stars percentage={five} stars={5} id={id} />
    </div>
  );
};
const Stars = ({ percentage, stars }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", width: 250 }}>
      <p style={{ paddingTop: "4%", paddingRight: "2%", color: "lightblue" }}>
        {stars} stars{" "}
      </p>
      <Progress percent={percentage} color="yellow" style={{ width: "75%" }} />
      <p style={{ paddingTop: "4%", paddingLeft: "2%", color: "gray" }}>
        {isNaN(percentage) ? 0 : parseInt(percentage)}%
      </p>
    </div>
  );
};

export default Ratings;
