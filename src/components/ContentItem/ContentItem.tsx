import { IInfo } from "../../types";
import * as React from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

interface Props {
  content: IInfo;
}

const ContentItem: React.FC<Props> = ({ content }) => {
  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography gutterBottom sx={{ fontSize: 20 }}>
            {content.title}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "column" }}>
          <Typography gutterBottom sx={{ fontSize: 20 }}>
            {content.content}
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default ContentItem;
