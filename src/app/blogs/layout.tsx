export const metadata = {
  title: 'Blogs Page',
  description: 'This is my Blogs Page',
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

// Tất cả những file nào bên trong thư mục blogs đều sẽ được coi là children và được render bên trong cặp thẻ 
// Fragment <></>
