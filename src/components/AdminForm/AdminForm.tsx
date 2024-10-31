import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useCallback, useEffect, useState } from "react";
import { IInfo, IInfoForm } from "../../types";
import axiosAPI from "../../axiosAPI.tsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner.tsx";

const initialForm = {
  title: "",
  content: "",
  category: "",
};

const AdminForm = () => {
  const [form, setForm] = useState<IInfoForm>(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const select = [
    { category: "about" },
    { category: "contacts" },
    { category: "partners" },
    { category: "history" },
    { category: "founder" },
  ];

  const fetchEditQuote = useCallback(async (selected: string) => {
    try {
      const response: { data: IInfo } = await axiosAPI<IInfo>(
        `pages/${selected}.json`,
      );
      if (response.data) {
        setForm({
          title: response.data.title,
          content: response.data.content,
          category: selected,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (form.category) {
      void fetchEditQuote(form.category);
    }
  }, [fetchEditQuote, form.category]);

  const changeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosAPI.put(`pages/${form.category}.json`, form);
      navigate(`/pages/${form.category}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center" }}>
            Edit pages
          </Typography>
          <Grid container spacing={2} sx={{ mx: "auto", width: "50%", mt: 4 }}>
            <Grid size={12}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-select-currency"
                name="category"
                select
                label="Select"
                value={form.category}
                onChange={changeField}
              >
                {select.map((option) => (
                  <MenuItem key={option.category} value={option.category}>
                    {option.category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Title"
                name="title"
                value={form.title}
                variant="outlined"
                onChange={changeField}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-multiline-static"
                label="Content"
                name="content"
                value={form.content}
                onChange={changeField}
                multiline
                rows={4}
              />
            </Grid>

            <Grid size={12}>
              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                edit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default AdminForm;
