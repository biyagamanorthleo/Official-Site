import { createClient } from '@/lib/supabase/server';
import MemberPostForm from '../MemberPostForm';

export default async function MemberNewPostPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Write a Post</h1>
        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">
          Submit for review — admin will approve before it goes live
        </p>
      </div>
      <MemberPostForm userId={user!.id} />
    </div>
  );
}
