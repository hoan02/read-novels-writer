import { Grid } from "@mui/material";
import NovelSubmissionGuidelines from "@/components/novel/NovelSubmissionGuidelines";
import NovelForm from "@/components/novel/NovelFormCreate";

const CreateNovel = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <NovelForm />
      </Grid>
      <Grid item xs={12} md={6}>
        <NovelSubmissionGuidelines />
      </Grid>
    </Grid>
  );
};

export default CreateNovel;
