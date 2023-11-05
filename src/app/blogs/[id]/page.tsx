'use client'
import Link from 'next/link'
import useSWR, { Fetcher } from 'swr'
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

const Blog = ({ params } : { params: { id: string } }) => {

    const [blog, setBlog] = useState<IBlog | null>(null);

    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json());

    const {data, error, isLoading} = useSWR(
      `http://localhost:8000/blogs/${params.id}`, 
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
            <div className='my-3'>
                <Link href={"/blogs"}>Go Back</Link>
            </div>
            <Card className='my-3' style={{ width: '100%' }}>
                <Card.Header>Title: {data?.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                       Content: {data?.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>Author: {data?.author}</Card.Footer>
            </Card>
        </>
    );
}

export default Blog;
