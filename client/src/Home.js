/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Spinner from "./Spinner";

import RestrauntCard from "./RestrauntCard";
import { SignedOut } from "./store/actions";

const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [backup, setBackup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [asc, setAsc] = useState(true);
  const [filter, setFilter] = useState("");
  const getData = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/restraunts/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result) {
        setLoading(false);
        setData(result.data.response.slice(0, 50));
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const token = useSelector((state) => state.auth.token);
  const [val, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);
  const sortByPrice = () => {
    setAsc(!asc);
    const nd = data;
    nd.sort((a, b) =>
      asc
        ? +a["Average Cost for two"] - +b["Average Cost for two"]
        : +b["Average Cost for two"] - +a["Average Cost for two"]
    );
    setData(nd);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/restraunts", {
        params: {
          keyword: val,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result) {
        setLoading(false);
        setBackup(result.data.response);
        setData(result.data.response);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleChangeFilter = (e) => setFilter(e.target.value);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <div
          style={{
            margin: "0 auto",
            display: "flex",
          }}
        >
          <Input
            placeholder="Enter name, place or cuisine"
            onChange={handleChange}
            value={val}
            style={{ width: 400, marginRight: 10 }}
          />
          <Button type="primary" onClick={handleSubmit}>
            Search
          </Button>
        </div>
      </Grid>

      <>
        <Grid item xs={12} md={4}>
          <Button type="primary" onClick={sortByPrice}>
            Sort By Price ({asc ? "Asc" : "Desc"})
          </Button>
        </Grid>
        <Grid item xs={12} md={4} style={{ display: "flex" }}>
          <Input
            placeholder="Place, cuisine"
            onChange={handleChangeFilter}
            style={{ width: 300, marginRight: 30 }}
            value={filter}
          />
          <Button type="primary" onClick={() => dispatch(SignedOut())}>
            Logout
          </Button>
        </Grid>
      </>

      {loading ? (
        <Spinner />
      ) : (
        data
          .filter(
            (item) =>
              item["Locality"].toLowerCase().includes(filter.toLowerCase()) ||
              item["Cuisines"].toLowerCase().includes(filter.toLowerCase()) ||
              item["Restaurant Name"]
                .toLowerCase()
                .includes(filter.toLowerCase())
          )
          .map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={item["_id"]}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <RestrauntCard
                name={item["Restaurant Name"]}
                place={item.Locality}
                rating={item["Rating text"]}
                averagePrice={item["Average Cost for two"]}
                cuisine={item.Cuisines}
              />
            </Grid>
          ))
      )}
    </Grid>
  );
};

export default Home;
