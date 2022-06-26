import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import YouTube from "react-youtube";

const API_KEY = process.env.REACT_APP_YOUTUBE_API;
const YOUTUBE_SERACH_API_URI = "https://www.googleapis.com/youtube/v3/search?";

export const Home = () => {
  const [selectedName, setSelectedName] = useState("A");
  const [videoList, setVideoList] = useState([]);
  const options = ["A", "B", "C"];

  const handleChange = (event) => {
    return setSelectedName(event.target.outerText);
  };

  useEffect(() => {
    const params = {
      key: API_KEY,
      q: selectedName,
      type: "video",
      maxResults: "10",
      order: "viewCount",
    };
    const queryParams = new URLSearchParams(params);

    fetch(YOUTUBE_SERACH_API_URI + queryParams)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.items && result.items.length !== 0) {
            setVideoList(
              result.items.map((item) => {
                return item.id.videoId;
              })
            );
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }, [selectedName]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              KIRINUKI CHANNNEL
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Autocomplete
          disablePortal
          options={options}
          sx={{ width: 300 }}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} label="名前" />}
        />
      </Box>
      <>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {videoList.map((videoId) => {
            return (
              <ListItem>
                <YouTube videoId={videoId} />;
              </ListItem>
            );
          })}
        </List>
      </>
    </>
  );
};
