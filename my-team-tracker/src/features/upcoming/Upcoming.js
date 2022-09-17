import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactInfiniteScroller from "react-infinite-scroller";
import { createStyles } from "@material-ui/core/styles";
import { ImageList } from "@material-ui/core";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ButtonBase from "@material-ui/core/ButtonBase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getUpcoming, selectUpcomingMovies, selectHasMorePages, selectPage } from "./upcomingSlice";
import axios from "axios";
import * as Config from "../../Config/index";
const APIConfig = Config.APIConfig;
const UpcomingConfig = Config.upcoming;
// import styles from './Counter.module.css';
const useStyles = createStyles((theme) => ({
  root: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  control: {
    top: "0",
    position: "sticky",
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: "#711c91",
    // backgroundColor: "#ea00d9",
    zIndex: 100,
  },
  imageList: {
    marginTop: "20px",
    width: "100%",
    zIndex: 1,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  scrollableDiv: {
    top: 0,
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    marginLeft: "0%",
    width: "100%",
    // maxHeight: "900px",
    height: "91vh",
  },
  noMoreVideos: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
  },
  loader: {
    marginLeft: "50%",
    // width: "100%",
  },
  movieTitle: {
    display: "flex",
    height: "20px",
    margin: "auto",
  },
}));

export function Upcoming() {
  const upcomingMovies = useSelector(selectUpcomingMovies);
  const hasMorePages = useSelector(selectHasMorePages);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  // const [upcomingMovies, setUpcomingMovies] = useState({});

  const classes = useStyles();

  return (
    <div>
      <ReactInfiniteScroller
        // dataLength={videos.length}
        loadMore={() => dispatch(getUpcoming({page}))}
        // loadMore={() => getUpcomingMovies()}
        // loadMore={() => this.fetchVideos()}
        // hasMore={false}
        hasMore={hasMorePages}
        // hasMore={this.state.hasMore}
        useWindow={true}
        // loader={
        //   <div className="loader" key={0}>
        //     <img
        //       src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
        //       alt="loading"
        //     />
        //   </div>
        // }
        // scrollableTarget="scrollableDiv"
      >
        <div className="image-grid" style={classes.imageList}>
          <ImageList
            // className={classes.imageList}
            rowHeight={150}
            gap={15}
            cols={5}
          >
            {upcomingMovies &&
              Object.keys(upcomingMovies).length > 0 &&
              Object.values(upcomingMovies).map((movie) => (
                <Card sx={{ width: "25%" }} key={movie.id}>
                  <Typography gutterBottom variant="h6" component="div">
                    {movie.original_title}
                  </Typography>
                  <ButtonBase
                    className={classes.clickableImage}
                    // onClick={() => props.onClickMediaCard(video)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      // image={`${PathParser.getRelativePath(video)}/${
                      //   video.thumbnail
                      // }?w=248&fit=crop&auto=format`}
                      image={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                      alt="green iguana"
                    />
                    <div
                      aria-label="play/pause"
                      // onClick={() => props.onClickMediaCard(video)}
                      style={{ position: "absolute", top: "30%", left: "40%" }}
                    >
                      <PlayArrowIcon
                        sx={{
                          height: 50,
                          width: 50,
                          color: "#fff",
                          backgroundColor: "hsl(210deg 8% 55%)",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  </ButtonBase>
                  <CardContent className={classes.CardContent}>
                    {/* <Typography variant="body2" color="text.secondary">
                      {movie.folder}
                    </Typography> */}
                    <CardActions
                      className={classes.cardActions}
                      style={{ textAlign: "end !important" }}
                    >
                      {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon
                          color={getFavoriteColor(isFavorite)}
                          onClick={() => handleOnClickFavorite(video.id)}
                        />
                      </IconButton>
                      <IconButton
                        aria-label={`info about ${video.title}`}
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        onClick={() => handleShowDetailModal(video)}
                      >
                        <InfoIcon />
                      </IconButton> */}
                    </CardActions>
                    {/* <div className={classes.categories}>
                      {categories.length > 0 &&
                        categories.map((category) => {
                          return (
                            <Chip
                              label={category.category_name}
                              className={classes.chip}
                            />
                          );
                        })}
                    </div> */}
                  </CardContent>
                </Card>
              ))}
          </ImageList>
        </div>
        {/* {!this.state.hasMore && (
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            style={classes.noMoreVideos}
          >
            End of the list.
          </Typography>
        )} */}
      </ReactInfiniteScroller>
      <div
      // className={styles.row}
      >
        {/* <input
          // className={styles.textbox}
          aria-label="Set increment amount"
          value={page}
          onChange={(e) => setIncrementAmount(e.target.value)}
        /> */}
        {/* <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button> */}
        {/* <button
          // className={styles.asyncButton}
          onClick={() => dispatch(getUpcoming())}
          // onClick={() => getUpcomingMovies()}
        >
          Add Async
        </button> */}
        {/* <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button> */}
      </div>
    </div>
  );
}
