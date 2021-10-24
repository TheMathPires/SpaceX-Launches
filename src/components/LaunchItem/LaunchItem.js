import React from "react";
import { Td, Tr, Button } from "../../style";

const LaunchItem = ({ launch, onToggleFavorite, isFavorite }) => (
  <Tr className={`${isFavorite ? "favorite" : ""}`}>
    <Td>
      <img
        src={
          launch.links.mission_patch_small
            ? launch.links.mission_patch_small
            : "https://via.placeholder.com/100/000/fff?text=No+Badge"
        }
        width="100"
        alt={launch.mission_name}
      />
    </Td>
    <Td>
      <span>
        {launch.mission_name} ({launch.launch_year})
      </span>
    </Td>
    <Td>{launch.rocket.rocket_name}</Td>
    <Td>{launch.flight_number}</Td>
    <Td>
      {launch.launch_success ? launch.launch_success.toString() : "unknown"}
    </Td>
    <Td>
      <Button onClick={() => onToggleFavorite(launch)}>
        {isFavorite ? "Remove" : "Add"}
      </Button>
    </Td>
  </Tr>
);

export default LaunchItem;
