import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import NavBar from "../components/NavBar";
import { Box } from "@mui/material";
import robot from "../assets/robot.png";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh", // This makes the Box take up the full height of the view
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 300 }} image={robot} title="robot" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Welcome
            </Typography>
            <Typography variant="body2" color="text.secondary">
              FakeEmail is the month 1 home group assignment for the ver+ tech
              fellows program. It is a simple web application that allows users
              to send emails to other users. It is built with Flask, SQLAlchemy,
              React, Material-UI, PostgresSQL using AWS RDS, and deployed on AWS
              EC2 and Fly.io
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Box>
    </>
  );
};

export default LandingPage;
