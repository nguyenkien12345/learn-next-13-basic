'use client'
import useSWR from 'swr'
import AppTable from '@/components/app.table'

const Blogs = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const {data, error, isLoading} = useSWR(
      "http://localhost:8000/blogs", 
      fetcher,
      {
        // Các options này đảm bảo mỗi khi chúng ta redirect về trang chủ thì sẽ không gọi lại api http://localhost:8000/blogs (Caching data)
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );
  
    if(isLoading) {
      return <div>Loading...</div>
    }
    if(error) {
      return <div>Failed To Load Data</div>
    }

    return ( 
        <>
            <AppTable blogs={data?.sort((a: any, b: any) => b.id - a.id)}/>
        </>
    );
}

export default Blogs;
