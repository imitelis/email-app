import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const pages = ["Login", "Signup", "Invite", "Password"];

function ResponsiveAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={{ zIndex: 99, position: "relative" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              id="FakeEmail"
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FakeEmail
            </Typography>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              id="FakeEmail"
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FakeEmail
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            {pages.map((page, index) => (
              <Typography
                key={index}
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Button
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: "bold",
                  }}
                >
                  {page}
                </Button>
              </Typography>
            ))}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },

                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {pages.map((page, index) => (
                  <Button
                    key={index}
                    component={Link}
                    to={`/${page.toLowerCase()}`}
                    sx={{
                      my: 1,
                      color: "white",
                      fontWeight: "bold",
                      display: menuOpen ? "block" : "none",
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ mr: 2 }}>
                {menuOpen ? (
                  <CloseIcon
                    onClick={toggleMenu}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <MenuIcon
                    onClick={toggleMenu}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 0 }}></Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
