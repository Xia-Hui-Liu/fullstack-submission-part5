const NewBlogForm = ({handleCreate,title,author,url,titleChange,authorChange,urlChange }) => {
    return (
        <form onSubmit={handleCreate}>
         <div>
          title:
            <input 
            type='text'
            value={title}
            name='title'
            onChange={titleChange}
            />
          </div>
          <div>
            author:
            <input 
            type='text'
            value={author}
            name='title'
            onChange={authorChange}
            />
          </div>
          <div>
            url:
            <input 
            type='url'
            value={url}
            name='url'
            onChange={urlChange}
            />
          </div>
          <button type='submit'>create</button>
        </form>
    )};

export default NewBlogForm;