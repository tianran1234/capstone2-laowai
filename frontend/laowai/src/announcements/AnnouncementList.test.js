import React from "react";
import { render } from "@testing-library/react";
import Announcements from "./AnnouncementList";

it("matches snapshot", function () {
  const { asFragment } = render(<Announcements />);
  expect(asFragment()).toMatchSnapshot();
});
