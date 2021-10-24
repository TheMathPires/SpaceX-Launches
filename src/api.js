import axios from "axios";

const api = axios.create({
  baseURL: "https://api.spacexdata.com/v3",
});

// To add in a .env file
export const LIMIT_PER_REQUEST = 4;

export const getLaunches = async ({
  status,
  initialDate,
  finalDate,
  upcomingLaunches,
  pageParam,
}) => {
  const periodLaunches = upcomingLaunches ? "upcoming" : "past";

  let params = {
    limit: LIMIT_PER_REQUEST,
    offset: pageParam * LIMIT_PER_REQUEST,
    //Min date possible
    start: new Date(-8640000000000000),
    //Max date possible
    end: new Date(253402300799999),
  };

  if (status) {
    params = { ...params, launch_success: status === "true" };
  }

  if (initialDate) {
    params = {
      ...params,
      start: initialDate,
    };
  }

  if (finalDate) {
    params = {
      ...params,
      end: finalDate,
    };
  }

  const { data } = await api.get(`/launches/${periodLaunches}`, {
    params,
  });
  return data;
};

export default api;
