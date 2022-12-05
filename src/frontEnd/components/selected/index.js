import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TabsData } from "../../context/TabsData";
import { HistoricalChart } from "../../services/api";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DetailCoin from "./DetailCoin";
Chart.register(CategoryScale);

const SelectedCurrency = () => {
  const { coins, setLoading } = useContext(TabsData);
  const [allData, setAllData] = useState("");
  const [chart, setChart] = useState([]);
  const [days, setDays] = useState(1);

  const showSingelData = coins.filter((item) => item.name === allData);

  const id = coins
    .filter((item) => item.name === allData)
    .map((item) => item.id);

  const fetchData = async () => {
    const { data } = await HistoricalChart(id, days);
    setLoading(true);
    setChart(data.prices);
  };

  useEffect(() => {
    if (allData !== "") {
      fetchData();
    }
  }, [allData, days]);

  const chartDay = [
    {
      label: "24H",
      value: 1,
    },
    {
      label: "30 DAYS",
      value: 30,
    },
    {
      label: "3 MONTHS",
      value: 90,
    },
    {
      label: "1 YEARS",
      value: 365,
    },
  ];

  const demo = {
    "& .MuiSelect-select": {
      color: "#212121",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: "10px",
    },
    "& svg": {
      color: "#212121",
    },
  };
  const itemSelect = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  return (
    <div style={{ margin: "50px 100px" }}>
      <Grid container>
        <Grid item xs={12} lg={9} sx={{ display: { xs: "none", lg: "flex" } }}>
          {showSingelData.map((item) => (
            <DetailCoin key={item.id} coin={item} />
          ))}
        </Grid>

        <Grid item xs={12} lg={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Selected Currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Please Selected Currency"
              sx={demo}
              value={allData}
              onChange={(e) => setAllData(e.target.value)}>
              {coins.map((item) => (
                <MenuItem key={item.id} value={item.name} sx={itemSelect}>
                  <Typography variant="h5">{item.name}</Typography>
                  <img src={item.image} width="40px" alt={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          lg={9}
          sx={{ display: { xs: "flex", lg: "none" }, my: "20px" }}>
          {showSingelData.map((item) => (
            <DetailCoin key={item.id} coin={item} />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Line
            data={{
              labels: chart.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: chart.map((coin) => coin[1]),
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              plugins: {
                legend: false,
              },
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}>
            {chartDay.map((day) => (
              <Button
                variant="contained"
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                }}
                selected={day.value === days}>
                {day.label}
              </Button>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SelectedCurrency;
