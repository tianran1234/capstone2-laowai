import React from "react";
import { render } from "@testing-library/react";
import AnnouncementCard from "./AnnouncementCard";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <AnnouncementCard
            id="1"
            username="testadmin"
            title="Panda Workshop"
            postedat="2023-08-15"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});


