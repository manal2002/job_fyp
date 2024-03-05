import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function ClickableLinkChips({ skills }) {
  return (
    <Stack direction="row" spacing={1}>
      {skills.map((skill) => (
        <Chip label={skill} component="a" href="#basic-chip" clickable />
      ))}
    </Stack>
  );
}
