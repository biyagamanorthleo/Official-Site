import BlogPostForm from '../BlogPostForm';

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">New Post</h1>
        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Write a new blog post</p>
      </div>
      <BlogPostForm />
    </div>
  );
}
