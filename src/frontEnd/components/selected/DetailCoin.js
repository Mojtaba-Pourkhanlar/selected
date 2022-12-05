import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const DetailCoin = ({ coin }) => {
  const {
    market_cap_rank,
    symbol,
    name,
    image,
    current_price,
  } = coin;

  return (
    <>
      <Grid container>
        <Grid item align="left" xs={12} sm={12} md={5} lg={5}>
          <Button variant="contained" color="secondary">
            #{market_cap_rank} Rank
          </Button>
          <Box display="flex" alignItems="center" mt="30px" mb="50px">
            <img src={image} alt={name} width="70px" />
            <Box mx="20px">
              <Typography variant="h4">{name}</Typography>
              <Typography variant="h5">{symbol}</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={500}>
              {name} Price in USD
            </Typography>
            <Typography variant="h4" fontWeight={600} my="50px">
              ${current_price.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailCoin;
