import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getLaunches, LIMIT_PER_REQUEST } from "../../api";
import LaunchItem from "../../components/LaunchItem/LaunchItem";
import { TabButton } from "../../style";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table, Th, Tr, Controls, Title, Logo, Filters } from "../../style";
import logo from "../../assets/SpaceX-Logo.png";
import DatePicker from "react-date-picker";

const defaultFilters = {
  status: "",
  initialDate: null,
  finalDate: null,
  upcomingLaunches: true,
};

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || []
  );

  localStorage.setItem(localStorageKey, JSON.stringify(value));

  return [value, setValue];
};

export const Launches = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useStateWithLocalStorage("favorites");
  const [filters, setFilters] = useState(defaultFilters);

  const {
    isLoading,
    data: launchesQuery,
    fetchNextPage,
  } = useInfiniteQuery(
    ["launches", filters],
    ({ pageParam = 0 }) =>
      getLaunches({
        ...filters,
        pageParam,
      }),
    {
      getNextPageParam: (lastPage, pages) => pages.length,
    }
  );

  let launches = launchesQuery ? launchesQuery.pages.flat() : [];
  const lastLaunchPage = launchesQuery?.pages[launchesQuery?.pages.length - 1];

  launches = showFavorites ? favorites : launches;

  const handleUpcomingLaunches = () => {
    setShowFavorites(false);
    setFilters({ ...filters, upcomingLaunches: true });
  };

  const handlePastLaunches = () => {
    setShowFavorites(false);
    setFilters({ ...filters, upcomingLaunches: false });
  };

  const handleFavoriteLaunches = () => {
    setShowFavorites(true);
  };

  const handleChangeLaunchType = (x) => {
    setFilters({ ...filters, status: x.target.value });
  };

  const handleToggleFavorite = (launch) => {
    const favPosition = favorites.findIndex(
      (favLaunch) => favLaunch.mission_name === launch.mission_name
    );
    if (favPosition >= 0) {
      favorites.splice(favPosition, 1);
      setFavorites([...favorites]);
    } else {
      setFavorites([...favorites, launch]);
    }
  };

  return (
    <div>
      <Controls>
        <Logo src={logo} alt="SpaceX Logo" width="250" />
        <Title>Launches</Title>
        <TabButton onClick={handleUpcomingLaunches}>Upcoming</TabButton>
        <TabButton onClick={handlePastLaunches}>Past</TabButton>
        <TabButton onClick={handleFavoriteLaunches}>Favorites</TabButton>

        <Filters>
          <div>
            Initial date
            <DatePicker
              onChange={(value) =>
                setFilters({ ...filters, initialDate: value })
              }
              value={filters.initialDate}
            />
          </div>
          <div>
            Final date
            <DatePicker
              onChange={(value) => setFilters({ ...filters, finalDate: value })}
              value={filters.finalDate}
            />
          </div>
          <input
            type="radio"
            value=""
            checked={filters.status === ""}
            onChange={handleChangeLaunchType}
            name="all"
          />{" "}
          all
          <input
            type="radio"
            value="true"
            checked={filters.status === "true"}
            onChange={handleChangeLaunchType}
            name="succeeded"
          />{" "}
          succeeded
          <input
            type="radio"
            value="false"
            checked={filters.status === "false"}
            onChange={handleChangeLaunchType}
            name="unsucceeded"
          />{" "}
          unsucceeded
        </Filters>
      </Controls>

      <h2>{filters.upcomingLaunches ? "Upcoming" : "Past"}</h2>

      {isLoading ? (
        <p>Show Loading...</p>
      ) : (
        <>
          {!launches.length ? (
            <p>Empty</p>
          ) : (
            <InfiniteScroll
              dataLength={launches.length}
              next={() => fetchNextPage()}
              hasMore={
                !showFavorites && lastLaunchPage.length === LIMIT_PER_REQUEST
              }
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Table>
                <thead>
                  <Tr>
                    <Th>Badge</Th>
                    <Th>Mission</Th>
                    <Th>Rocket</Th>
                    <Th>Number</Th>
                    <Th>Success</Th>
                    <Th>Favorite</Th>
                  </Tr>
                </thead>
                <tbody>
                  {launches.map((launch) => (
                    <LaunchItem
                      launch={launch}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={
                        favorites.findIndex(
                          (favLaunch) =>
                            favLaunch.mission_name === launch.mission_name
                        ) >= 0
                      }
                      key={launch.mission_name}
                    />
                  ))}
                </tbody>
              </Table>
            </InfiniteScroll>
          )}
        </>
      )}
    </div>
  );
};

export default Launches;
