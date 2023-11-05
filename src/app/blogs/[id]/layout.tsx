export const metadata = {
    title: 'Detail Blog Page',
    description: 'This is my Detail Blog Page',
  }
  
  export default function BlogsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
          {children}
      </>
    )
  }
  
  // Tất cả những file nào bên trong thư mục [id] đều sẽ được coi là children và được render bên trong cặp thẻ 
  // Fragment <></>
  