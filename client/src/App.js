import logo from "./logo.svg";

import Login from "./Login";
import { Grid, Container } from "@mui/material";
import { useSelector } from "react-redux";
import Home from "./Home";

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Container style={{ margin: 24 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {token ? <Home /> : <Login />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
