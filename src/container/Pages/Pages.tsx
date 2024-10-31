import { useCallback, useEffect, useState } from 'react';
import { IInfo, IInfoAPI } from '../../types';
import axiosAPI from '../../axiosAPI.tsx';
import ContentItem from '../../components/ContentItem/ContentItem.tsx';
import Grid from "@mui/material/Grid2";
import { useParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

const Pages = () => {
  const [content, setContent] = useState<IInfo[]>([]);
  const { contentPage } = useParams<{ contentPage: string }>();
  const [loading, setLoading] = useState<boolean>(false);



  const fetchData = useCallback(async () => {
    const url = contentPage
      ? `pages.json?orderBy="$key"&equalTo="${contentPage}"`
      : "pages.json";
    try {
      setLoading(true);
      const response: { data: IInfoAPI } = await axiosAPI<IInfoAPI>(url);
      if (response.data) {
        const contentFromAPI = Object.keys(response.data).map((contentKey) => {
          return {
            ...response.data[contentKey],
            id: contentKey,
          };
        });
        setContent(contentFromAPI);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

  }, [contentPage]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);


  return (
    <>
      {loading ? ( <Spinner/> ) : (
        <>
          {content.length === 0 ? (
            <h2>No posts</h2>
          ) : (
            <>
              <Grid container spacing={2}>
                {content.map((content) => (
                  <ContentItem key={content.id} content={content}/>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Pages;