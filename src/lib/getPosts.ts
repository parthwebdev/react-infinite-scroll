import axios, { AxiosRequestConfig } from "axios";

interface Props {
  pageParam: number;
  options?: AxiosRequestConfig;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const getPosts = async ({ pageParam, options }: Props) => {
  const response = await api.get<Post[]>(`/posts?_page=${pageParam}`, options);

  return response.data;
};

export default getPosts;
