import { Box, Typography } from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";

type AdditionalProps = {
  activeStep: number;
  totalSteps: number;
};

export function CircularProgressWithLabel(
  props: CircularProgressProps & AdditionalProps
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={64}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#A879FF" : "#A879FF",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
        }}
        size={64}
        thickness={4}
        value={((props.activeStep + 1) / props.totalSteps) * 100}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontSize: 16, color: "#A879FF", fontWeight: 600 }}
        >{`${props.activeStep + 1} of ${props.totalSteps}`}</Typography>
      </Box>
    </Box>
  );
}
