import { useEffect, useState } from "react";
import { useGetYoutubeSearchMutation } from "@services/api/user_api/user_api";

export const useVideos = (
	defaultSearchTerm?: string,
): [Record<string, never>[], (term: string) => Promise<void>, boolean] => {
  const [getYoutubeSearch, {isLoading}] = useGetYoutubeSearchMutation()

	const [videos, setVideos] = useState([]);

  const search = async (defaultSearchTerm) => {
    console.log(defaultSearchTerm)
    const { data } = await getYoutubeSearch(defaultSearchTerm) as never;
    if (Array.isArray(data)){
      setVideos(data)
    }
  }

	useEffect(() => {
    search(defaultSearchTerm)
	}, [defaultSearchTerm]);

	return [videos, search, isLoading];
};
