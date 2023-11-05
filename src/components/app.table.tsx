'use client'
import Link from 'next/link'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CreateModal from './create_modal';
import UpdateModal from './update_modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  blogs: IBlog[]
}

const AppTable = (props: IProps) => {
  
  const {blogs} = props;

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const handleEdit = (blog: IBlog | null) => {
    setBlog(blog);
    setShowUpdateModal(true);
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
      headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json"
      },
    })
    .then((res) => res.json())
    .then((res) => {
        toast.success("Delete blog successfully");
        mutate("http://localhost:8000/blogs"); 
    })
    .catch((error) => {
        toast.error("Delete blog failed");
    })
  }
  
  return (
    <>
        <div className='mb-3' style={{ display: 'flex', justifyContent: "space-between" }}>
          <h3>Table Blogs</h3>
          <Button variant='secondary' onClick={() => setShowCreateModal(true)}>Add New</Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>
                    <Link className='btn btn-primary' href={`/blogs/${item.id}`}>View</Link>
                    <Button variant="warning" className='mx-3' onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <CreateModal 
        showCreateModal={showCreateModal} 
        setShowCreateModal={setShowCreateModal} 
        />

        <UpdateModal 
        blog={blog}
        setBlog={setBlog}
        showUpdateModal={showUpdateModal} 
        setShowUpdateModal={setShowUpdateModal} 
        />
    </>
  );
}

export default AppTable;
